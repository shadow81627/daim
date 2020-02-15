<template>
  <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const segments = this.$route.path.split('/').slice(1);
      const breadcrumbs = [{ text: 'Home', to: '/' }];

      segments.forEach((segment, index) => {
        const text =
          segment.charAt(0).toUpperCase() + segment.substr(1).toLowerCase();
        const to = '/' + segments.slice(0, index + 1).join('/');
        breadcrumbs.push({ text, to });
      });

      return breadcrumbs;
    },
  },
};
</script>
