<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <h1>{{ heading }}</h1>
        <p>{{ description }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="{
          name,
          description,
          links,
          image,
          startDate,
          endDate,
        } in projects"
        :key="name"
        class="d-flex flex-column"
        cols="12"
        sm="6"
      >
        <v-card class="flex d-flex flex-column" tile>
          <v-img
            v-if="image"
            alt=""
            :lazy-src="src(image).placeholder"
            :src="src(image).src"
            :srcset="src(image).srcSet"
            :aspect-ratio="16 / 9"
            :style="{
              backgroundColor: backgroundColor(image)[0],
            }"
            sizes="(max-width: 600px) 100vw, 50vw"
            class="flex-grow-0"
          ></v-img>
          <v-card-title class="text-break">
            <h2>
              {{ name }}
            </h2>
          </v-card-title>
          <v-card-text class="body-1 text--primary flex-grow-1">
            {{ description }}
          </v-card-text>
          <v-card-text v-if="startDate || endDate">
            <span v-if="startDate">{{ formatDate(startDate) }} </span>
            <span v-if="startDate && endDate">to</span>
            <span v-if="endDate">{{ formatDate(endDate) }}</span>
          </v-card-text>
          <v-card-actions class="mt-auto">
            <v-spacer></v-spacer>
            <v-tooltip v-for="{ link, icon, tooltip } in links" :key="link" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :href="link"
                  target="_blank"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>{{ icon }}</v-icon>
                  <span class="d-sr-only-focusable">{{ link }}</span>
                </v-btn>
              </template>
              <span>{{ tooltip }}</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiWeb, mdiGithub, mdiOpenInNew } from '@mdi/js';
import * as dayjs from 'dayjs';
export default {
  data: () => ({
    heading: 'Portfolio',
    description: 'Explore demos and code for my projects.',
    projects: [
      {
        image: './pocketpasta.com_recipes.png',
        name: 'PocketPasta',
        description: 'Household planner for recipes and shopping.',
        links: [
          { link: 'https://pocketpasta.com', icon: mdiWeb, tooltip: 'Website' },
          {
            link: 'https://github.com/shadow81627/pocketpasta',
            icon: mdiGithub,
            tooltip: 'Github',
          },
        ],
      },
      {
        image:
          './brisbane-city-council-free-native-plants.daim.dev_species.png',
        startDate: '2020-08-07T01:08:52Z',
        name: 'Brisbane City Council Free Native Plant Gallery',
        description:
          'Govhack project that combines several creative commons datasets to detail care requirements for Brisbane City Councils Free Native Plant Program.',
        links: [
          {
            link: 'https://brisbane-city-council-free-native-plants.daim.dev',
            icon: mdiWeb,
            tooltip: 'Website',
          },
          {
            link:
              'https://github.com/shadow81627/brisbane-city-council-free-native-plants',
            icon: mdiGithub,
            tooltip: 'Github',
          },
        ],
      },
      {
        startDate: '2019-05-07T06:17:22Z',
        endDate: '2019-07-03T03:58:42Z',
        image: './scuber.jpg',
        name: 'scUber',
        client: 'Tourism and Events Queensland',
        description: `XCOM designed and developed the scUber campaign microsite to intoduce this world's first on the Great Barrier Reef. Uber and Queensland, Australia, gave riders the opportunity to explore the Great Barrier Reef in the world's first rideshare submarine, scUber.`,
        links: [
          {
            link: 'https://www.xcommedia.com.au/case-study-scUber.php',
            icon: mdiOpenInNew,
            tooltip: 'Case Study',
          },
        ],
        sources: [
          'https://www.xcommedia.com.au/case-study-scUber.php',
          'https://teq.queensland.com/industry-resources/the-great-barrier-reef/scuber',
        ],
      },
    ],
  }),
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
    backgroundColor: require.context(
      '~/assets/img/portfolio?lqip-colors',
      false,
      /\.(png|jpe?g|svg).*$/,
    ),
    src: require.context(
      `~/assets/img/portfolio?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&placeholder&format=webp`,
      false,
      /\.(png|jpe?g|svg).*$/,
    ),
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
