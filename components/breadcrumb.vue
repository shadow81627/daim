<template>
  <v-toolbar flat height="32" color="transparent" :absolute="absolute">
    <ul
      v-if="breadcrumbs.length > 1"
      class="list-none flex"
      itemprop="breadcrumb"
      itemtype="https://schema.org/BreadcrumbList"
      itemscope="itemscope"
    >
      <template v-for="(item, key) of breadcrumbs" :key="key">
        <li itemprop="itemListElement">
          <NuxtLink
            :to="item.to"
            class="text-decoration-none text-sm"
            :class="{
              'color-white': key !== breadcrumbs.length - 1,
              'color-gray': key === breadcrumbs.length - 1,
            }"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
        <li
          v-if="key !== breadcrumbs.length - 1"
          class="opacity-50 color-white px-3"
        >
          /
        </li>
      </template>
    </ul>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    absolute: { type: Boolean, default: false },
  },
  setup() {
    const breadcrumbs = useBreadcrumbs();
    // const schemaBreadcrumbs = computed(() =>
    //   breadcrumbs.value.map((breadcrumb) => breadcrumb.schema),
    // );

    // useSchemaOrg([
    //   defineBreadcrumb({
    //     itemListElement: schemaBreadcrumbs,
    //   }),
    // ]);
    return { breadcrumbs };
  },
};
</script>
