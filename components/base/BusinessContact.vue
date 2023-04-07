<template>
  <v-theme-provider :dark="dark">
    <div>
      <BaseInfoCard :title="title" align="left" color="primary" :level="2">
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
export default {
  props: {
    dark: Boolean,
    dense: { type: Boolean, default: true },
    title: { type: String, default: null },
  },
  async setup() {
    const [{ data: phone }, { data: socials }, { data: contact }] =
      await Promise.all([
        useAsyncData(
          'team-damien-robinson',
          () => queryContent('team', 'damien-robinson').find(),
          {
            transform(data) {
              const {
                basics: { phone },
              } = data;
              return phone;
            },
          },
        ),
        useAsyncData('socials', () => queryContent('socials').find()),
        useAsyncData('contact', () => queryContent('contact').find()),
      ]);
    const items = [...contact.value, ...socials.value];
    return { items, phone };
  },
  data: () => ({
    mdiOpenInNew,
  }),
  fetchKey: 'business-contact',
};
</script>
