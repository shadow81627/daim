<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_blank',
    required: false,
  },
  rel: {
    type: String,
    default: 'noopener',
    required: false,
  },
});
</script>

<template>
  <NuxtLink :href="href" :target="target" :rel="rel">
    <slot />
  </NuxtLink>
</template>
