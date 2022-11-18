import { sortBy, maxBy } from 'lodash-es';
/**
 * Sort by largest price
 * @param {*} o item to sort
 */
export default function (o) {
  const plans = sortBy(o?.plans ?? { free: { price: 0 } }, 'price');
  const max = maxBy(plans, 'price');
  return max.price;
}
