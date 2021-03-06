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
              :lazy-src="$img(image, { width: 10, quality: 70 })"
              :src="$img(image, { quality: 70, width: 600 })"
              :srcset="_srcset(image).srcset"
              :aspect-ratio="16 / 9"
              :sizes="_srcset.size"
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
              <time
                v-if="startDate"
                :datetime="new Date(startDate).toISOString()"
                >{{ formatDate(startDate) }}
              </time>
              <span v-if="startDate && endDate">to</span>
              <time
                v-if="endDate"
                :datetime="new Date(endDate).toISOString()"
                >{{ formatDate(endDate) }}</time
              >
            </v-card-text>
            <v-card-actions class="mt-auto">
              <!-- add hidden content to set height to prevent page jank -->
              <v-btn style="visibility: hidden" aria-hidden="true" icon>
                <v-icon />
                &nbsp;
              </v-btn>

              <v-spacer></v-spacer>
              <BaseTooltipButton
                v-for="{ link, icon, tooltip } in links"
                v-bind="{ link, icon, tooltip }"
                :key="link"
              ></BaseTooltipButton>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiWeb, mdiGithub, mdiOpenInNew } from '@mdi/js';
import * as dayjs from 'dayjs';
import ImageSources from '@/mixins/srcset';
export default {
  mixins: [ImageSources],
  async asyncData({ $content }) {
    const items = await $content('projects')
      .sortBy('startDate', 'desc')
      .fetch();

    // Move placeholder to start
    const last = 'placeholder';
    items.sort(function (x, y) {
      return x.slug === last ? 1 : y.slug === last ? -1 : 0;
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
  },
};
</script>
