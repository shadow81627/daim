<template>
  <div v-if="!priceUnset">
    <div>Price range</div>

    {{ price(priceMax.price) }}
    {{ priceMax.currency || 'USD' }}

    <template v-if="priceMax.interval && priceMin.price === 0"
      >/ {{ priceMax.interval }}</template
    >

    <template v-if="!priceSame"> - </template>

    <template v-if="!priceSame">
      <strong v-if="priceMin.price === 0"> Free option available</strong>
      <template v-else
        >{{ price(priceMin.price) }} {{ priceMax.currency || 'USD' }}</template
      >
    </template>

    <template v-if="priceMax.interval && !priceSame && priceMin.price !== 0">
      / {{ priceMax.interval }}</template
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
  computed: {
    priceSame() {
      const min = this.priceMin;
      const max = this.priceMax;
      return min.price === max.price;
    },
    priceUnset() {
      const min = this.priceMin;
      const same = this.priceSame;
      return same && min === this.defaultPlan.unset;
    },
    priceMax() {
      const plans = this.plans(this.items);
      return maxBy(plans, 'price') ?? this.defaultPlan.unset;
    },
    priceMin() {
      const plans = this.plans(this.items);
      return minBy(plans, 'price') ?? this.defaultPlan.unset;
    },
  },
  methods: {
    price(cost) {
      return _price({ cost, margin: this.margin });
    },
    plans(plans) {
      return sortBy(plans ?? this.defaultPlan, 'price');
    },
    priceRange(tool) {
      const max = this.priceMax;
      const min = this.priceMin;
      const same = this.priceSame;
      const unset = this.priceUnset;
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
