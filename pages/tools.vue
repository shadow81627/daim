<template>
  <div>
    <!-- Photo by <a href="https://unsplash.com/@hnhmarketing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hunter Haley</a> on <a href="https://unsplash.com/s/photos/tools?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> -->
    <BlogHero
      :title="heading"
      :summary="description"
      src="./banners/tools.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col
          v-for="tool in tools"
          :key="tool.slug"
          cols="12"
          sm="6"
          md="4"
          class="d-flex flex-column"
        >
          <Feature :blok="{ ...tool, icon: icons[tool.icon] }"></Feature>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {
  faMountain,
  faLightbulb,
  faMobileAlt,
  faImages,
  faDog,
  faShapes,
  faServer,
  faCheckDouble,
  faPaintRoller,
  faCubes,
  faCode,
  faFileCode,
  faBug,
  faAlignLeft,
  faDatabase,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import {
  faVuejs,
  faBootstrap,
  faGithub,
  faDocker,
  faFontAwesome,
  faLaravel,
  faCloudflare,
  faAlgolia,
} from '@fortawesome/free-brands-svg-icons';
import Feature from '~/components/feature';
export default {
  components: {
    Feature,
  },
  async asyncData({ $content }) {
    const tools = await $content('tools').sortBy('slug').fetch();
    return { tools };
  },
  data() {
    return {
      heading: 'Tools',
      description: 'Check out what we use to create awesome web apps.',
      tools: [],
      icons: {
        faMountain,
        faLightbulb,
        faMobileAlt,
        faImages,
        faDog,
        faShapes,
        faServer,
        faCheckDouble,
        faPaintRoller,
        faCubes,
        faCode,
        faFileCode,
        faBug,
        faAlignLeft,
        faDatabase,
        faRocket,
        faVuejs,
        faBootstrap,
        faGithub,
        faDocker,
        faFontAwesome,
        faLaravel,
        faCloudflare,
        faAlgolia,
      },
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
