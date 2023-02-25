<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/lean-canvas.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <LeanCanvas></LeanCanvas>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LeanCanvas from '~/components/sections/lean-canvas.vue';
export default {
  components: { LeanCanvas },
  data() {
    return {
      slug: 'lean-canvas',
      heading: 'Lean Canvas',
      description: null,
    };
  },
  async fetch() {
    const { description, name } = await queryContent(
      'pages/' + this.slug,
    ).find();
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
