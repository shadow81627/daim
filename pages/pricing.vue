<template>
  <div>
    <BaseSection
      v-for="{ features, title, description } of services"
      :key="title"
    >
      <BaseSectionHeading :title="title">{{ description }}</BaseSectionHeading>
      <v-responsive class="mx-auto" max-width="1350">
        <v-container fluid>
          <v-row>
            <v-col cols="12" align="center">
              <v-data-table
                :headers="headers"
                :items="features"
                :items-per-page="-1"
                hide-default-footer
              >
                <template #[`item.cost`]="{ item }">
                  ${{
                    (item.cost || 0) * (item.cost_period === 'month' ? 12 : 1)
                  }}
                  per year
                  <!-- {{ item.cost_period || 'month' }} -->
                </template>
                <template #[`item.price`]="{ item }">
                  ${{
                    (item.cost || 0) *
                    (item.cost_period === 'month' ? 12 : 1) *
                    2
                  }}
                  per year
                  <!-- {{ item.cost_period || 'month' }} -->
                </template>
                <template #[`body.append`]="{ items }">
                  Total cost: ${{ totalCost(items) }} per year
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-responsive>
    </BaseSection>
    <BaseSection>
      <v-responsive class="mx-auto" max-width="1350">
        <v-container fluid>
          <v-row>
            <v-col cols="12" align="center">
              <div>Total for all services:</div>
              <div>Cost: ${{ recursiveTotal() }} per year</div>
              <div>Price: ${{ recursiveTotal() * 2 }} per year</div>
              <div>Profit: ${{ (recursiveTotal() * 2) / 2 }} per year</div>
            </v-col>
          </v-row>
        </v-container>
      </v-responsive>
    </BaseSection>
  </div>
</template>

<script>
const PERIODS = { MONTH: 'month', YEAR: 'year' };
export default {
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'title',
        },
        {
          text: 'Provider',
          value: 'provider',
        },
        {
          text: 'Cost',
          value: 'cost',
        },
        {
          text: 'Price',
          value: 'price',
        },
      ],
      services: [
        {
          title: 'Websites',
          description:
            'Rapid prototyping of bespoke designs into fast, feature rich websites.',
          features: [
            {
              title: 'Domain name',
              provider: 'Namecheap',
              cost: 20,
              cost_period: PERIODS.YEAR,
            },
            {
              title: 'Analytics',
              provider: 'Matomo',
              cost: 31,
              cost_period: PERIODS.MONTH,
            },
            {
              title: 'Analytics',
              provider: 'Plausible',
              cost: 9,
              cost_period: PERIODS.MONTH,
            },
          ],
        },
        {
          title: 'Hosting',
          features: [
            {
              title: 'Server',
              provider: 'Digital Ocean',
              cost: 20,
              cost_period: PERIODS.MONTH,
            },
            {
              title: 'Database',
              provider: 'Digital Ocean',
              cost: 15,
              cost_period: PERIODS.MONTH,
            },
            {
              title: 'Serverless Functions',
              provider: 'Vercel',
              cost: 20,
              cost_period: PERIODS.MONTH,
            },
            {
              title: 'Cloud Storage',
              provider: 'Wasabi',
              cost: 5,
              cost_period: PERIODS.MONTH,
            },
            {
              title: 'SSL',
              provider: 'Cloudflare',
              cost: 0, // Coverted by Hosting, required setup
            },
            {
              title: 'CDN',
              provider: 'Cloudflare',
              cost: 0, // Coverted by Hosting, required setup
            },
            {
              title: 'DNS',
              provider: 'Cloudflare',
              cost: 0, // Coverted by Hosting, required setup
            },
            {
              title: 'DDoS Protection',
              provider: 'Cloudflare',
              cost: 0, // Coverted by Hosting, required setup
            },
            {
              title: 'Web Application Firewall (WAF)',
              provider: 'Cloudflare',
              cost: 20,
              cost_period: PERIODS.MONTH,
            },
          ],
        },
        {
          title: 'SEO',
          description:
            'Organically raise high quality content to the top of search results.',
          // Consider sub contracting or out sourcing SEO
          features: [
            {
              title: 'Social media',
            },
            {
              title: 'Copywriting',
            },
            {
              title: 'Content management',
            },
            {
              title: 'Photography',
            },
          ],
        },
        {
          title: 'Messaging',
          description:
            'Keep the conversation going with multi-channel messaging automation.',
          features: [
            {
              title: 'Email',
              provider: 'Sendgrid',
              cost: 15,
              cost_period: PERIODS.MONTH,
            },
          ],
        },
        {
          title: 'Support',
          description:
            'Dedication to maintaining quality websites means we are always reachable.',
          features: [
            {
              title: 'Maintenance',
            },
            {
              title: 'Monitoring',
              provider: 'Sentry',
              cost: 26,
              cost_period: PERIODS.MONTH,
            },
          ],
        },
      ],
    };
  },
  methods: {
    recursiveTotal() {
      return this.services.reduce((acc, service) => {
        return acc + this.totalCost(service.features);
      }, 0);
    },
    totalCost(features) {
      return features.reduce((total, { cost = 0, cost_period: period }) => {
        if (period === PERIODS.MONTH) {
          return cost * 12 + total;
        }
        return total + cost;
      }, 0);
    },
  },
};
</script>
