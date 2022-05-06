<template>
  <v-card class="flex d-flex flex-column justify-between" min-width="240">
    <v-img
      v-if="image"
      class="flex-grow-0"
      :lazy-src="lazy"
      :src="img"
      :srcset="_srcset.srcset"
      :sizes="_srcset.size"
      cover
      :aspect-ratio="imageWidth / imageHeight"
      :style="`background-color: ${_imageBackgroundColor}`"
    ></v-img>
    <v-card-title>
      <span class="h3 text-break">
        <template v-if="icon">
          <font-awesome-icon
            v-if="typeof icon === 'object'"
            :icon="icon"
            class="grey--text"
          />
          <BaseIcon
            v-else
            :color="iconColor"
            :icon="icon"
            style="font-size: 1em"
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
      <v-card-text v-if="description" class="text--primary body-1 pt-0">
        {{ description }}
      </v-card-text>
      <v-card-text v-if="list" class="text--primary body-1 pt-0">
        <ul>
          <li v-for="item in list.slice(0, 4)" :key="item">{{ item }}</li>
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
      <LocationButton
        v-if="
          location &&
          (location.postcode ||
            location.city ||
            location.region ||
            location.country)
        "
        v-bind="location"
      ></LocationButton>
      <BaseTooltipButton
        v-if="url"
        v-bind="{
          link: url,
          tooltip: `Learn more about ${name}`,
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
    imageHeight: { type: Number, default: 360 },
    imageWidth: { type: Number, default: 640 },
    imageQuality: { type: Number, default: 100 },
    imageColor: { type: String, default: '#fff' },
    imageBackgroundColor: { type: String, default: null },
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
    lazy() {
      const svg = Buffer.from(
        `<svg xmlns='http://www.w3.org/2000/svg'
      viewBox='00512512'>
      <rect width="100%" height="100%" fill="${this._imageBackgroundColor}"/>
      </svg>`,
      ).toString('base64');
      return `data:image/svg+xml;base64,${svg}`;
    },
    img() {
      return this.$img(this.image, {
        quality: this.imageQuality,
        width: this.imageWidth,
        height: this.imageHeight,
        enlarge: undefined,
        fit: this.imageFit,
        trim: undefined,
        position: 'center',
        format: 'png',
        background: this.imageColor,
      });
    },
    _srcset() {
      return this.$img.getSizes(this.image, {
        sizes: 'xs:100vw sm:50vw md:33vw lg:33vw xl:33vw',
        modifiers: {
          format: 'webp',
          quality: this.imageQuality,
          width: this.imageWidth,
          height: this.imageHeight,
          enlarge: undefined,
          fit: this.imageFit,
          trim: undefined,
          position: 'center',
        },
      });
    },
  },
  methods: {
    titleCase,
  },
};
</script>
