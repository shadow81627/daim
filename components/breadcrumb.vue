<template>
  <v-toolbar flat height="65" color="transparent" :absolute="absolute">
    <Breadcrumbs>
      <template #breadcrumb="{ to, title }">
        <NuxtLink :to="to">
          {{ title }}
        </NuxtLink>
      </template>
    </Breadcrumbs>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    absolute: { type: Boolean, default: false },
  },
};
</script>

<style>
.v-application .v-breadcrumbs__item {
  color: white;
}
</style>
