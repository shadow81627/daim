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
              v-bind="card"
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
import {
  faKeyboard,
  faSearch,
  faPaperPlane,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons';
export default {
  data: () => ({
    cards: [
      {
        icon: faKeyboard,
        title: 'Web Development',
        text: 'Rapid prototyping of bespoke designs into fast, feature rich websites.',
      },
      {
        icon: faSearch,
        title: 'SEO',
        text: 'Organically raise high quality content to the top of search results.',
      },
      {
        icon: faPaperPlane,
        title: 'Messaging',
        text: 'Keep the conversation going with multi-channel messaging automation.',
      },
      {
        icon: faPuzzlePiece,
        title: 'Support',
        text: 'Dedication to maintaining quality websites means we are always reachable.',
      },
    ],
  }),
};
</script>
