<template>
  <div>
    <div v-html="richtext"></div>
  </div>
</template>

<script>
export default {
  props: { text: { type: String, default: null } },
  computed: {
    richtext() {
      return this.text ? this.$storyapi.richTextResolver.render(this.text) : '';
    },
  },
};
</script>
