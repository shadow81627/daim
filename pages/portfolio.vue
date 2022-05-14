<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/portfolio/scuber.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <DataIterator
            :items="items"
            :loading="$fetchState.pending"
          ></DataIterator>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    heading: 'Portfolio',
    description: 'Explore demos and code for my projects.',
    items: [],
  }),
  async fetch() {
    const draft = this.$route?.query?.draft;
    const data = (
      await this.$content('projects').sortBy('startDate', 'desc').fetch()
    ).filter((item) => {
      return !item.deletedAt && (item.startDate || draft);
    });

    const slug = 'portfolio';
    const items = data.map((item) => ({
      ...item,
      id: item.slug,
      url: item.offers ? `/${slug}/${item.slug}` : item.url,
      image: `/img/${slug}/${item.slug}.png`,
      imageColor: item.color,
      links: item.links.reverse(),
    }));

    // Move placeholder to start
    const last = 'placeholder';
    items.sort(function (x, y) {
      return x.slug === last ? 1 : y.slug === last ? -1 : 0;
    });

    this.items = items;
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
