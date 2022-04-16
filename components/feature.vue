<template>
  <v-card class="flex d-flex flex-column justify-between" min-width="240">
    <v-img
      v-if="image"
      class="flex-grow-0"
      height="300"
      :lazy-src="$img(image, { width: 10, quality: 70 })"
      :src="$img(image, { quality: 70, height: 300 })"
      :srcset="_srcset.srcset"
      :sizes="_srcset.size"
    ></v-img>
    <v-card-title>
      <span class="h3 text-break">
        <font-awesome-icon v-if="icon" :icon="icon" class="grey--text" />
        {{ title }}
        <template v-if="acronym">
          (<abbr :title="title">{{ acronym }}</abbr
          >)</template
        >
      </span>
    </v-card-title>

    <v-card-subtitle v-if="subheading">{{
      titleCase(subheading)
    }}</v-card-subtitle>

    <div class="flex-grow-1">
      <v-card-text v-if="description" class="text--primary body-1 pt-0">
        {{ description }}
      </v-card-text>
      <v-card-text v-if="list" class="text--primary body-1 pt-0">
        <ul>
          <li v-for="item in list" :key="item">{{ item }}</li>
        </ul>
      </v-card-text>
      <v-card-text class="text--primary body-1 pt-0">
        <slot></slot>
      </v-card-text>
    </div>

    <v-card-actions>
      <!-- add hidden content to set height to prevent page jank -->
      <v-btn style="visibility: hidden" aria-hidden="true" icon>
        <v-icon />
        &nbsp;
      </v-btn>

      <v-spacer></v-spacer>
      <BaseTooltipButton
        v-if="href"
        v-bind="{
          link: href,
          tooltip: `Learn more about ${title}`,
          size: 'small',
        }"
      ></BaseTooltipButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import titleCase from '@/utils/title-case';
export default {
  props: {
    acronym: { type: String, default: undefined },
    image: { type: String, default: undefined },
    href: { type: String, default: undefined },
    icon: { type: [String, Object], default: () => undefined },
    title: { type: String, default: undefined },
    subheading: { type: String, default: undefined },
    description: { type: String, default: undefined },
    list: { type: Array, default: undefined },
  },
  computed: {
    _srcset() {
      return this.$img.getSizes(this.image, {
        sizes: 'xs:100vw sm:50vw md:33vw lg:33vw xl:33vw',
        modifiers: {
          format: 'webp',
          quality: 70,
          height: 300,
        },
      });
    },
  },
  methods: {
    titleCase,
  },
};
</script>
