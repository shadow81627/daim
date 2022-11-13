import iconSet from 'assets/icons.json';
import { addCollection } from '@iconify/vue2';

export default function () {
  addCollection(iconSet, 'custom');
}
