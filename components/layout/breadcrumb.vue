<template>
  <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      // console.log(this.$route);

      const here = this.$route.path.split('/').slice(1);

      const parts = [{ text: 'Home', to: '/' }];

      for (let i = 0; i < here.length; i++) {
        const part = here[i];
        const text =
          part.charAt(0).toUpperCase() + part.substr(1).toLowerCase();
        const to = '/' + here.slice(0, i + 1).join('/');
        parts.push({ text, to });
      }
      return parts;
    },
  },
};
</script>

<style></style>
