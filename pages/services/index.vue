<template>
  <div>
    <BlogHero
      :title="heading"
      :summary="description"
      src="/img/banners/services.jpg"
      :credit="{}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <h2>Retainer Services</h2>
          <div>
            <p>
              We prefer to quote projects with full scope and understanding of
              the work. This allows us to provide a more tailored quote so that
              we can give you a fixed price for a project. The quote is
              estimated using our base hourly rate. Planning ahead allows us to
              allocate time to prioritise your project rather than jumping
              between ad hoc tasks. We can offer discounted hourly rates when
              committing to a large project.
            </p>
            <p>
              We can work on ad hoc tasks for our
              <strong>base hourly rate at $98 per hour</strong>. This price
              covers the compensation for developers, designers, and other
              staff.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.slug"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          class="d-flex flex-column"
        >
          <Feature
            v-bind="{
              ...item,
              url: item.offers ? `/services/${item.slug}` : item.url,
              image: `/img/services/${item.slug}.png`,
              imageColor: item.color,
              iconColor: item.iconColor,
              icon: item.icon,
            }"
          >
            <PriceRange v-if="item.plans" :items="item.plans"></PriceRange>
          </Feature>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { sortBy, maxBy } from 'lodash-es';
import Feature from '~/components/feature';
import PriceRange from '~/components/price-range';
import textLength from '~/utils/feature-text-length';
import fractionToDecimal from '~/utils/fraction-to-decimal';
export default {
  components: {
    Feature,
    PriceRange,
  },
  async setup() {
    const { data: items } = await useAsyncData(
      'services',
      () => queryContent('services').find(),
      {
        transform(data) {
          const items = sortBy(
            data
              .filter((item) => !item.deleted_at)
              .map((item) => ({
                ...item,
                pos: fractionToDecimal(item.pos),
              })),
            [
              'pos',
              /**
               * Sort by largest price
               * @param {*} o item to sort
               */
              function (o) {
                const plans = sortBy(
                  o?.plans ?? { free: { price: 0 } },
                  'price',
                );
                const max = maxBy(plans, 'price');
                return max.price;
              },
              textLength,
              'slug',
            ],
          ).reverse();
          return items;
        },
      },
    );

    return { items };
  },
  data() {
    return {
      heading: 'Services',
      description:
        'We offer a range of services to help you get the most out of your website.',
      defaultPlan: { unset: { price: 0 } },
    };
  },
};
</script>
