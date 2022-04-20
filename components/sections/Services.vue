<template>
  <BaseSection id="services" class="secondary">
    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row itemscope itemtype="https://schema.org/OfferCatalog">
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="6"
            md="3"
            itemscope
            itemtype="https://schema.org/Offer"
          >
            <BaseInfoCard
              align="center"
              dark
              :icon="card.icon"
              :title="card.name"
              :text="card.description"
              itemscope
              itemtype="https://schema.org/Service"
              title-itemprop="name"
              body-itemprop="description"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </BaseSection>
</template>

<script>
export default {
  data: () => ({
    cards: [],
  }),
  async fetch() {
    this.cards = await this.$content('services').fetch();
  },
};
</script>
