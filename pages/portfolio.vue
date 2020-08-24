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
        v-for="{ name, description, links } in projects"
        :key="name"
        class="d-flex flex-column"
        cols="12"
        sm="6"
      >
        <v-card class="flex d-flex flex-column">
          <v-card-title class="text-break">
            <h2>
              {{ name }}
            </h2>
          </v-card-title>
          <v-card-subtitle class="body-1">
            {{ description }}
          </v-card-subtitle>
          <v-card-actions class="mt-auto">
            <v-tooltip
              v-for="{ link, icon, tooltip } in links"
              :key="link"
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  :href="link"
                  target="_blank"
                  v-bind="attrs"
                  large
                  v-on="on"
                >
                  <v-icon large>{{ icon }}</v-icon>
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
import { mdiWeb, mdiGithub } from '@mdi/js';
export default {
  data: () => ({
    heading: 'Portfolio',
    description: 'Explore demos and code for my projects.',
    projects: [
      {
        name: 'PocketPasta',
        description: 'Household planner for recipes and shopping.',
        image: '',
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
        name: 'Brisbane City Council Free Native Plant Gallery',
        description:
          'Govhack project that combines several creative commons datasets to detail care requirements for Brisbane City Councils Free Native Plant Program.',
        image: '',
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
    ],
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
};
</script>
