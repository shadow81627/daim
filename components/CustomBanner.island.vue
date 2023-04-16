<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Daim',
  },
  description: {
    type: String,
    default: null,
  },
  background: {
    type: String,
    default: '#343a40',
  },
  backgroundImage: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'white',
  },
  padding: {
    type: String,
    default: '0 32px',
  },
  titleFontSize: {
    type: String,
    default: '64px',
  },
  descriptionFontSize: {
    type: String,
    default: '26px',
  },
  gradient: {
    type: String,
    default: 'rgba(0, 0, 0, 0.6)',
  },
});

const containerAttrs = computed(() => {
  const isBackgroundTw = props.background?.startsWith('bg-');
  const isColorTw = props.color?.startsWith('text-');

  const classes = ['w-full', 'h-full', 'flex', 'items-start', 'justify-end'];
  const styles: Record<string, any> = {
    padding: props.padding,
  };

  if (isBackgroundTw) classes.push(props.background);
  else if (props.background) styles.background = props.background;

  if (isColorTw) classes.push(props.color);
  else styles.color = props.color;
  return { class: classes, style: styles };
});

const titleAttrs = computed(() => {
  const style = {
    fontWeight: 'bold',
    marginBottom: '16px',
    fontSize: props.titleFontSize,
  };
  return { class: ['uppercase'], style };
});

const descriptionAttrs = computed(() => {
  const styles = {
    fontSize: props.descriptionFontSize,
  };
  return { style: styles };
});
</script>

<template>
  <div v-bind="containerAttrs">
    <img
      :src="backgroundImage"
      crossorigin="anonymous"
      style="
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
      "
    />
    <div
      style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vw;
        background-color: rgba(0, 0, 0, 0.6);
      "
    ></div>
    <div class="flex flex-col w-full mb-4">
      <div v-bind="titleAttrs">
        {{ title || 'Daim' }}
      </div>
      <div v-if="description" v-bind="descriptionAttrs">
        {{ description }}
      </div>
    </div>
  </div>
</template>
