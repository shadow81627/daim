<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Tools</h1>
      </v-col>
    </v-row>
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
};
</script>
