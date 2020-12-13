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
          description: title,
          links,
          image,
          startDate,
          endDate,
        } in items"
        :key="name"
        class="d-flex flex-column"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="flex d-flex flex-column" tile>
          <v-img
            v-if="image"
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
            {{ title }}
          </v-card-text>
          <v-card-text v-if="startDate || endDate">
            <time v-if="startDate" :datetime="new Date(startDate).toISOString()"
              >{{ formatDate(startDate) }}
            </time>
            <span v-if="startDate && endDate">to</span>
            <time v-if="endDate" :datetime="new Date(endDate).toISOString()">{{
              formatDate(endDate)
            }}</time>
          </v-card-text>
          <v-card-actions class="mt-auto">
            <v-spacer></v-spacer>
            <v-tooltip v-for="{ link, icon, tooltip } in links" :key="link" top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  :href="link"
                  target="_blank"
                  rel="noopener"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>{{ icons[icon] }}</v-icon>
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
  async asyncData({ $content }) {
    const items = await $content('projects')
      .sortBy('startDate', 'desc')
      .fetch();

    // Move placeholder to start
    const first = 'placeholder';
    items.sort(function (x, y) {
      return x.slug === first ? -1 : y.slug === first ? 1 : 0;
    });

    return {
      items,
    };
  },
  data: () => ({
    heading: 'Portfolio',
    description: 'Explore demos and code for my projects.',
    icons: { mdiWeb, mdiGithub, mdiOpenInNew },
  }),
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
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
    backgroundColor: require.context(
      '~/assets/img/portfolio?lqip-colors',
      false,
      /\.(png|jpe?g).*$/,
    ),
    src: require.context(
      `~/assets/img/portfolio?resize&sizes[]=320&sizes[]=600&sizes[]=900&sizes[]=1785&placeholder&format=webp`,
      false,
      /\.(png|jpe?g).*$/,
    ),
  },
};
</script>
