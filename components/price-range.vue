<template>
  <div v-if="!priceUnset(plans(items))">
    <div>Price range</div>

    {{ price(priceMax(plans(items)).price) }}
    {{ priceMax(plans(items)).currency || 'USD' }}

    <template
      v-if="priceMax(plans(items)).interval && priceMin(items).price === 0"
      >/{{ priceMax(plans(items)).interval }}</template
    >

    <template v-if="!priceSame(plans(items))"> - </template>

    <strong v-if="!priceSame(plans(items))">
      <template v-if="priceMin(items).price === 0">
        Free option available</template
      >
      <template v-else>{{ price(priceMin(items)) }}</template>
    </strong>

    <template
      v-if="priceMax(plans(items)).interval && priceMin(items).price !== 0"
    >
      / {{ priceMax(plans(items)).interval }}</template
    >
  </div>
  <div v-else>
    <div>Price range</div>
    <strong>Free</strong>
  </div>
</template>

<script>
import { sortBy, maxBy, minBy } from 'lodash-es';
import _price from '~/utils/price';
export default {
  props: {
    items: {
      type: Object,
      default: () => ({}),
    },
    margin: {
      type: Number,
      default: 0.5,
    },
    defaultPlan: {
      type: Object,
      default: () => ({
        unset: {
          price: 0,
          currency: 'USD',
          interval: '',
        },
      }),
    },
  },
  methods: {
    price(cost) {
      return _price({ cost, margin: this.margin });
    },
    plans(plans) {
      return sortBy(plans ?? this.defaultPlan, 'price');
    },
    priceMin(plans) {
      return minBy(plans, 'price') ?? this.defaultPlan.unset;
    },
    priceMax(plans) {
      return maxBy(plans, 'price') ?? this.defaultPlan.unset;
    },
    priceSame(plans) {
      const min = this.priceMin(plans);
      const max = this.priceMax(plans);
      return min.price === max.price;
    },
    priceUnset(plans) {
      const min = this.priceMin(plans);
      const same = this.priceSame(plans);
      return same && min === this.defaultPlan.unset;
    },
    priceRange(tool) {
      const plans = this.plans(tool?.plans);
      const max = this.priceMax(plans);
      const min = this.priceMin(plans);
      const same = this.priceSame(plans);
      const unset = this.priceUnset(plans);
      return !unset
        ? `${min.price === 0 ? 'Free' : this.price(min.price)}${
            !same ? ' up to ' : ''
          }${!same ? this.price(max.price) : ''} ${min.currency ?? ''} ${
            max.interval ? '/' : ''
          } ${max.interval ?? ''}`
        : '';
    },
  },
};
</script>
