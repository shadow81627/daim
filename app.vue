<template>
  <NuxtLayout>
    <NuxtPwaAssets />
    <!-- <OgImageStatic /> -->
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
    class: 'font-sans',
  },
  link: [...(i18nHead.value.link ?? [])],
  meta: [...(i18nHead.value.meta ?? [])],
});
</script>
