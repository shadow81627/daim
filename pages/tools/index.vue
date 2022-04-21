<template>
  <div>
    <!-- Photo by <a href="https://unsplash.com/@hnhmarketing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Hunter Haley</a> on <a href="https://unsplash.com/s/photos/tools?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> -->
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/tools.jpg"
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
          {{ tool.deleted_at }}
          <Feature
            v-bind="{
              ...tool,
              title: tool.heading,
              href: tool.offers ? `/tools/${tool.slug}` : tool.href,
              image: `/img/tools/${tool.slug}.png`,
              icon: icons[tool.icon] || tool.icon,
            }"
          >
            <PriceRange :items="tool.plans"></PriceRange>
          </Feature>
        </v-col>
      </v-row>
    </v-container>
    <BaseSection>
      <v-responsive class="mx-auto" max-width="1350">
        <v-container fluid>
          <v-row>
            <v-col cols="12" align="center">
              <h2>Total for all services</h2>
              <div class="h3">{{ price(totalCost() * 2) }} per month</div>
            </v-col>
          </v-row>
        </v-container>
      </v-responsive>
    </BaseSection>
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
  faSearch,
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
import ImageSources from '@/mixins/srcset';
import { sortBy, maxBy, minBy } from 'lodash-es';
import Feature from '~/components/feature';
import PriceRange from '~/components/price-range';
import price from '~/utils/price';
export default {
  components: {
    Feature,
    PriceRange,
  },
  mixins: [ImageSources],
  async asyncData({ $content }) {
    const tools = sortBy(
      (await $content('tools').fetch()).filter((tool) => !tool.deleted_at),
      [
        /**
         * Sort by largest price
         * @param {*} o item to sort
         */
        function (o) {
          const plans = sortBy(o?.plans ?? { free: { price: 0 } }, 'price');
          const max = maxBy(plans, 'price');
          return max.price;
        },
        'slug',
      ],
    ).reverse();
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
        faSearch,
      },
      defaultPlan: { unset: { price: 0 } },
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
  methods: {
    price,
    plans(plans) {
      return sortBy(plans ?? this.defaultPlan, 'price');
    },
    priceMin(plans) {
      return minBy(plans, 'price') ?? this.defaultPlan.unset;
    },
    priceMax(plans) {
      return maxBy(plans, 'price') ?? this.defaultPlan.unset;
    },
    priceSame(plans) {
      const min = this.priceMin(plans);
      const max = this.priceMax(plans);
      return min.price === max.price;
    },
    priceUnset(plans) {
      const min = this.priceMin(plans);
      const same = this.priceSame(plans);
      return same && min === this.defaultPlan.unset;
    },
    priceRange(tool) {
      const plans = this.plans(tool?.plans);
      const max = this.priceMax(plans);
      const min = this.priceMin(plans);
      const same = this.priceSame(plans);
      const unset = this.priceUnset(plans);
      return !unset
        ? `${min.price === 0 ? 'Free' : price(min.price)}${
            !same ? ' up to ' : ''
          }${!same ? price(max.price) : ''} ${min.currency ?? ''} ${
            max.interval ? '/' : ''
          } ${max.interval ?? ''}`
        : '';
    },
    totalCost(min = false) {
      return this.tools.reduce((acc, tool) => {
        const plans = this.plans(tool?.plans);
        const price = min
          ? this.priceMin(plans).price
          : this.priceMax(plans).price;
        return acc + price;
      }, 0);
    },
  },
};
</script>
