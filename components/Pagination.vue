<template>
  <div
    v-if="pages > 1"
    className="flex justify-center gap-6 pb-16 items-center w-full"
  >
    <Component
      :is="page <= 1 ? 'div' : 'nuxt-link'"
      :custom="page <= 1"
      :to="page > 1 ? { query: { page: page - 1 } } : undefined"
      :aria-label="page > 1 ? 'Previous page' : undefined"
      class="relative mr-2 no-underline w-12 h-12 flex items-center m-1 group justify-center text-black"
      :class="[page <= 1 ? 'opacity-30' : 'hover:-translate-x-1']"
    >
      <div
        class="absolute inset-0 opacity-0 !group-hover:opacity-5 bg-current pointer-events-none rounded"
      ></div>
      <Icon name="material-symbols:chevron-left" class="w-6 h-6" />
    </Component>
    <NuxtLink
      v-for="n in pages"
      :key="n"
      :to="{ query: { page: n } }"
      class="relative no-underline w-12 h-12 flex items-center justify-center group m-1 text-black"
      :class="{
        'opacity-30 !hover:opacity-100': page !== n,
      }"
    >
      <div
        class="absolute inset-0 opacity-0 !group-hover:opacity-5 bg-current pointer-events-none rounded"
      ></div>
      {{ n }}
      <hr
        v-if="page === n"
        className="absolute bottom-3 left-1/2 w-6 -translate-x-1/2 transform"
      />
    </NuxtLink>
    <Component
      :is="page >= pages ? 'div' : 'nuxt-link'"
      :custom="page >= pages"
      :to="page <= pages ? { query: { page: page + 1 } } : undefined"
      :aria-label="page <= pages ? 'Next page' : undefined"
      class="relative ml-2 no-underline w-12 h-12 flex items-center group m-1 justify-center text-black"
      :class="[page >= pages ? 'opacity-30' : 'hover:translate-x-1']"
    >
      <div
        class="absolute inset-0 opacity-0 !group-hover:opacity-5 bg-current pointer-events-none rounded"
      ></div>
      <Icon name="material-symbols:chevron-right" class="w-6 h-6" />
    </Component>
  </div>
</template>

<script setup lang="ts">
const { page, pages } = defineProps({
  pages: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 0,
  },
});
</script>
