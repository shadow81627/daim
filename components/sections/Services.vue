<template>
  <BaseSection id="services" class="bg-secondary">
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
import { sortBy } from 'lodash-es';
import fractionToDecimal from '~/utils/fraction-to-decimal';
export default {
  async setup() {
    const { data: cards } = await useAsyncData(
      'services-section',
      () => queryContent('services').find(),
      {
        transform(data) {
          const items = data.map((item) => ({
            ...item,
            pos: fractionToDecimal(item.pos),
          }));
          return sortBy(items, ['pos']).reverse().slice(0, 4);
        },
      },
    );
    return { cards };
  },
};
</script>
