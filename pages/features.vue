<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/features.jpg"
      :credit="{}"
    ></BlogHero>
    <Features></Features>
  </div>
</template>

<script>
export default {
  name: 'FeaturesPage',
  data: () => ({
    slug: 'features',
    heading: 'Features',
    description: null,
  }),
  async fetch() {
    const { description, name } = await this.$content(
      'pages',
      this.slug,
    ).fetch();
    this.heading = name;
    this.description = description;
  },
  fetchKey() {
    return `page/${this.slug}`;
  },
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
