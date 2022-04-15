<template>
  <BaseSection id="about" itemtype="https://schema.org/LocalBusiness" itemscope>
    <BaseSectionHeading title="About">
      <span itemprop="name">{{ name }}</span> is a
      <span>{{ typeDisplay }}</span>
      building <span itemprop="description">{{ description }}</span>
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
                        v-bind="{ city, region, postcode, country }"
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

<script>
import countries from 'i18n-iso-countries';
import englishCountries from 'i18n-iso-countries/langs/en.json';
countries.registerLocale(englishCountries);
export default {
  data() {
    return {
      name: 'Daim',
      typeDisplay: 'Digital Agency',
      description:
        'high quality bespoke landing pages and websites built by professionals. Handcrafted marketing websites are our specialty. Hit us up today for a quote on a slick new digital presence today.',
      // priceRange: '$$',
      priceRange: undefined,
      url: 'https://daim.dev/',
      email: 'contact@daim.dev',
      phone: undefined,
      city: undefined,
      region: undefined,
      postcode: undefined,
      country: undefined,
    };
  },
  async fetch() {
    const {
      basics: {
        profiles,
        firstname,
        lastname,
        label,
        // email,
        phone,
        location: { city, region, countryCode, postalcode: postcode },
        summary,
      },
    } = await this.$content('resume').fetch();

    const locale = 'en';
    const country = countries.getName(countryCode, locale);
    const data = {
      profiles,
      firstname,
      lastname,
      // email,
      phone,
      label,
      country,
      region,
      city,
      postcode,
      summary,
    };
    Object.assign(this.$data, data);
  },
};
</script>
