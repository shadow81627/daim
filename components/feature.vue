<template>
  <v-card
    class="flex d-flex flex-column justify-between flex-grow-1"
    min-width="240"
  >
    <LazyNuxtPicture
      v-if="image"
      :src="image"
      :width="imageWidth"
      :height="imageHeight"
      class="flex-grow-0 max-w-full h-auto"
      crossorigin="anonymous"
      itemprop="image"
      :fit="imageFit"
      loading="lazy"
      sizes="xs:100vw sm:50vw md:33vw lg:33vw xl:33vw"
      :img-attrs="{
        style: {
          'object-fit': 'cover',
          'max-width': '100%',
          height: 'auto',
          backgroundColor: _imageBackgroundColor,
          backgroundImage,
        },
      }"
    ></LazyNuxtPicture>
    <v-card-title>
      <span class="h3 text-break">
        <template v-if="icon">
          <BaseIcon
            :color="iconColor"
            :icon="icon"
            style="font-size: 1em"
            :inline="true"
          ></BaseIcon>
        </template>
        {{ name }}
        <template v-if="acronym">
          (<abbr :title="name">{{ acronym }}</abbr
          >)</template
        >
      </span>
    </v-card-title>

    <v-card-subtitle v-if="subheading">{{
      titleCase(subheading)
    }}</v-card-subtitle>

    <div class="flex-grow-1">
      <v-card-text v-if="description" class="text--primary text-body-1 pt-0">
        {{ description }}
      </v-card-text>
      <v-card-text v-if="list" class="text--primary text-body-1 pt-0">
        <ul class="list-inside">
          <li v-for="item in list.slice(0, 4)" :key="item">{{ item }}</li>
        </ul>
      </v-card-text>
      <v-card-text class="text--primary text-body-1 pt-0">
        <PriceRange :items="plans"></PriceRange>
        <time v-if="startDate" :datetime="new Date(startDate).toISOString()"
          >{{ formatDate(startDate) }}
        </time>
        <span v-if="startDate && endDate"> to </span>
        <time v-if="endDate" :datetime="new Date(endDate).toISOString()">{{
          formatDate(endDate)
        }}</time>
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
      <LocationButton
        v-if="
          location &&
          (location.postcode ||
            location.city ||
            location.region ||
            location.country)
        "
        button-class="ml-2"
        v-bind="location"
      ></LocationButton>
      <BaseTooltipButton
        v-if="url"
        button-class="ml-2"
        v-bind="{
          link: url,
          tooltip: `Learn more about ${name}`,
        }"
      ></BaseTooltipButton>
      <BaseTooltipButton
        v-for="link in links"
        v-bind="link"
        :key="link"
        button-class="ml-2"
      ></BaseTooltipButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import dayjs from 'dayjs';
import titleCase from '@/utils/title-case';
export default {
  inheritAttrs: false,
  props: {
    location: { type: Object, default: null },
    dark: { type: Boolean, default: false },
    acronym: { type: String, default: undefined },
    image: { type: String, default: undefined },
    url: { type: String, default: undefined },
    icon: { type: [String, Object], default: () => undefined },
    name: { type: String, default: undefined },
    subheading: { type: String, default: undefined },
    description: { type: String, default: undefined },
    list: { type: Array, default: undefined },
    links: { type: Array, default: undefined },
    plans: { type: [Array, Object], default: undefined },
    startDate: { type: String, default: undefined },
    endDate: { type: String, default: undefined },
    imageHeight: { type: Number, default: 360 },
    imageWidth: { type: Number, default: 640 },
    imageQuality: { type: Number, default: 100 },
    imageColor: { type: String, default: '#fff' },
    imageBackgroundColor: { type: String, default: null },
    backgroundImage: { type: String, default: undefined },
    imageFit: {
      type: String,
      default: 'inside',
      validator: (val) =>
        ['cover', 'contain', 'inside', 'outside'].includes(val),
    },
    iconColor: { type: String, default: 'grey' },
  },
  computed: {
    _imageBackgroundColor() {
      return this.imageBackgroundColor ?? this.imageColor;
    },
  },
  methods: {
    titleCase,
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY');
    },
  },
};
</script>
