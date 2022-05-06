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
      heading: 'Lean Canvas',
      description:
        'Lean Canvas replaces long and boring business plans with a 1-page business model that takes 20 minutes to create and gets read.',
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
