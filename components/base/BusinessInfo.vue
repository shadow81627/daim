<template>
  <v-theme-provider :dark="dark">
    <base-business-contact title="Get in Touch" pace="6">
      Please feel free to reach out to me with your questions and comments.
    </base-business-contact>
  </v-theme-provider>
</template>

<script>
export default {
  props: { dark: Boolean },
};
</script>
