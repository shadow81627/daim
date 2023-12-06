<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/team.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.slug"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          class="d-flex flex-column"
          style="max-width: 360px"
        >
          <Feature v-bind="item"> </Feature>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Feature from '~/components/feature';
export default {
  components: {
    Feature,
  },
  async setup() {
    const { data: items } = await useAsyncData(
      'team',
      () => queryContent('team').find(),
      {
        transform(data) {
          return data.map((item) => {
            const slug = item._path.replace('/team/', '');
            const firstname = item.basics.firstname;
            const lastname = item.basics.lastname;
            const name = `${firstname} ${lastname}`;
            const description = item.basics.summary;
            const image = `/img/team/${slug}.png`;
            const url = `/people/${slug}`;
            const subheading = item.basics.label;
            return {
              name,
              description,
              image,
              url,
              subheading,
              imageWidth: 360,
            };
          });
        },
      },
    );
    return { items };
  },
  data() {
    return {
      heading: 'Team',
      description:
        'Meet the awesome team working building better software for the world.',
    };
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
