<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/about.jpg"
      :credit="{}"
    ></BlogHero>
    <About></About>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data: () => ({
    heading: 'About',
    description: null,
  }),
  async fetch() {
    const { description } = await this.$content('pages', 'about').fetch();
    this.description = description;
  },
  fetchKey: 'page/about',
  head() {
    return {
      title: this.heading,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    };
  },
};
</script>
