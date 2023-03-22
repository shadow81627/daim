import { addCollection } from '@iconify/vue';
import iconSet from 'assets/icons.json';

export default defineNuxtPlugin(() => {
  addCollection(iconSet, 'custom');
});
