<template>
  <v-theme-provider :dark="dark">
    <div>
      <BaseInfoCard :title="title" color="primary" :level="2">
        <slot></slot>
      </BaseInfoCard>

      <BaseLinks :items="items">
        <template #default="{ item }">
          <v-list-item-subtitle v-if="item.subtitle">{{
            item.subtitle
          }}</v-list-item-subtitle>
          <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
            item.title
          }}</v-list-item-title>
        </template>
      </BaseLinks>
    </div>
  </v-theme-provider>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default {
  props: {
    dark: Boolean,
    dense: { type: Boolean, default: true },
    title: { type: String, default: null },
  },
  data: () => ({
    faArrowRight,
    mdiOpenInNew,
    items: [],
  }),
  async fetch() {
    const {
      basics: { phone },
    } = await queryContent('team', 'damien-robinson').find();

    const socials = await queryContent('socials').find();
    const contact = await queryContent('contact').find();

    const data = {
      items: [...contact, ...socials],
      phone,
    };
    Object.assign(this.$data, data);
  },
  fetchKey: 'business-contact',
};
</script>
