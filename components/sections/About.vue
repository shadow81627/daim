<template>
  <BaseSection id="about" itemtype="https://schema.org/LocalBusiness" itemscope>
    <BaseSectionHeading title="About">
      <span itemprop="name">{{ name }}</span> is a
      <span>{{ typeDisplay }}</span> with {{ experience }} years of experience.
      <span itemprop="description">{{ description }}</span>
    </BaseSectionHeading>
    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col cols="12" class="mb-4 text-center">
                  <div v-if="priceRange" itemprop="priceRange">
                    {{ priceRange }}
                  </div>
                  <a
                    v-if="url"
                    itemprop="url"
                    :href="url"
                    style="display: none"
                    >{{ url }}</a
                  >
                  <div>
                    <mailgo v-if="email" :href="`mailto:${email}`"></mailgo>
                    <mailgo v-if="phone" :href="`tel:${phone}`"></mailgo>
                    <span itemprop="areaServed">
                      <LocationButton
                        v-if="city || region || postcode || country"
                        v-bind="{
                          city,
                          region,
                          postcode,
                          country,
                          streetAddress,
                        }"
                      ></LocationButton>
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </BaseSection>
</template>

<script lang="ts">
export default {
  async setup() {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const { data } = await useAsyncData(
      'team/damien-robinson',
      () => queryContent('team', 'damien-robinson').findOne(),
      {
        default() {
          return { basics: { location: {} } };
        },
      },
    );

    const {
      basics: {
        profiles,
        firstname,
        lastname,
        label,
        // email,
        phone,
        location: {
          streetAddress,
          city,
          region,
          countryCode,
          postalcode: postcode,
        },
        summary,
      },
    } = data.value;
    const country = regionNames.of(countryCode);
    return {
      profiles,
      firstname,
      lastname,
      // email,
      phone,
      label,
      country,
      region,
      city,
      streetAddress,
      postcode,
      summary,
    };
  },
  data() {
    return {
      name: 'Damien',
      typeDisplay: 'Digital Consultant',
      experience: '5+',
      description:
        'He specialises in handcrafted, bespoke websites, with an interest in open source, marketing and ecommerce. Reach out about your fresh new digital presence today.',
      // priceRange: '$$',
      priceRange: undefined,
      url: 'https://daim.dev/',
      email: 'contact@daim.dev',
    };
  },
};
</script>
