<template>
  <v-footer class="footer">
    <v-container>
      <v-row class="py-0 py-md-7">
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat tile color="transparent">
            <v-card-title class="headline">Contact</v-card-title>
          </v-card>
          <v-card flat tile color="transparent">
            <div>
              <mailgo v-if="email" :href="`mailto:${email}`"></mailgo>
            </div>
            <div>
              <mailgo v-if="phone" :href="`tel:${phone}`"></mailgo>
            </div>
          </v-card>
          <v-card
            flat
            tile
            color="transparent"
            :href="`https://www.google.com.au/maps/search/?api=1&query=${encodeURIComponent(
              `${location.companyName} ${location.streetAddress || ''} ${
                location.city || ''
              } ${location.region || ''} ${location.postcode || ''} ${
                location.country || ''
              }`,
            )}`"
            target="_blank"
            rel="noreferrer"
            itemprop="address"
            itemscope
            itemtype="https://schema.org/PostalAddress"
          >
            <v-card-text class="py-2">
              <span class="text--primary body-1 pt-0">
                <font-awesome-icon
                  :icon="faMapMarker"
                  title="location"
                  fixed-width
                />
                Address
              </span>
              <div>
                <span v-if="location.companyName">
                  {{ location.companyName }},
                </span>
                <span v-if="location.placeName">
                  {{ location.placeName }}
                </span>
              </div>
              <div v-if="location.streetAddress" itemprop="streetAddress">
                {{ location.streetAddress }}
              </div>
              <span v-if="location.city" itemprop="addressLocality">{{
                location.city
              }}</span>
              <span v-show="!location.city" itemprop="addressRegion">{{
                location.region
              }}</span>
              <span v-if="location.postcode" itemprop="postalCode">{{
                location.postcode
              }}</span
              ><span
                v-if="
                  (location.country || location.countryCode) &&
                  (location.postcode || location.city || location.region)
                "
                >,</span
              >
              <span itemprop="addressCountry">{{
                location.country || location.countryCode
              }}</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat tile color="transparent">
            <v-card-title class="headline">Pages</v-card-title>
          </v-card>
          <v-list dense flat tile color="transparent">
            <v-list-item
              v-for="item in nav1"
              :key="item.name"
              :to="localePath(item.route ? item.route : {})"
              nuxt
              class="text-decoration-none"
            >
              <v-list-item-action>
                <BaseIcon :icon="item.icon"></BaseIcon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat tile color="transparent">
            <v-card-title class="headline">&nbsp;</v-card-title>
          </v-card>
          <v-list dense flat tile color="transparent">
            <v-list-item
              v-for="item in nav2"
              :key="item.name"
              :to="localePath(item.route ? item.route : {})"
              nuxt
              class="text-decoration-none"
            >
              <v-list-item-action>
                <BaseIcon :icon="item.icon"></BaseIcon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat tile color="transparent">
            <v-card-title class="headline">Social</v-card-title>
          </v-card>
          <v-list dense flat tile color="transparent">
            <v-list-item
              v-for="item in socials"
              :key="item.href"
              :href="item.href"
              rel="noopener"
              target="_blank"
              class="text-decoration-none"
            >
              <v-list-item-action>
                <BaseIcon :icon="item.icon"></BaseIcon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <div class="footer-bottom-bar font-14">
        <div class="d-block d-md-flex align-center">
          <v-card flat color="transparent">
            <v-card-text>
              <span>All Rights Reserved by Daim Digital</span>
              <!-- <span>
                <a href="/" class="link px-4">Terms of Use</a>
                <a href="/" class="link px-4">Legal Disclaimer</a>
                <a href="/" class="link px-4">Privacy Policy</a>
              </span> -->
            </v-card-text>
          </v-card>
          <div class="ml-auto">
            <v-card flat color="transparent">
              <v-card-text>
                <span>{{ $config.VERSION }}</span>
                <span v-if="$config.COMMIT">{{
                  shortHash($config.COMMIT)
                }}</span>
                <nuxt-link :to="localePath('releases')" class="link px-4">
                  <span>Changelog</span>
                </nuxt-link>
                <a
                  href="https://stats.uptimerobot.com/X7JPPc4pLz"
                  target="_blank"
                  rel="noopener"
                  class="link px-4"
                  >Status</a
                >
                <last-modified v-bind="{ utc }" class="link px-4" />
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
import { sortBy } from 'lodash-es';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import lastModified from './last-modified';
import fractionToDecimal from '~/utils/fraction-to-decimal';
export default {
  components: {
    lastModified,
  },
  data: () => ({
    utc: false,
    faMapMarker,
    email: 'contact@daim.dev',
    phone: undefined,
    socials: [],
    nav1: [],
    nav2: [],
    location: {
      personName: 'Damien Robinson',
      companyName: 'Daim Digital',
      placeName: 'Salt Space',
      streetAddress: '1/888 Brunswick Street',
      city: 'New Farm',
      countryCode: 'AU',
      country: 'Australia',
      postcode: '4005',
      region: 'Queensland',
    },
  }),
  async fetch() {
    const {
      basics: { phone },
    } = await this.$content('team', 'damien-robinson').fetch();

    const socials = await this.$content('socials').fetch();
    const navData = (
      await this.$content('pages').where({ show_tab: true }).fetch()
    ).map((item) => ({
      ...item,
      pos: fractionToDecimal(item.pos),
    }));
    const nav = sortBy(navData, ['show_tab', 'pos']);
    const navHalf = Math.ceil(nav.length / 2);
    const nav1 = nav.slice(0, navHalf);
    const nav2 = nav.slice(-navHalf);

    const data = {
      socials,
      phone,
      nav1,
      nav2,
    };
    Object.assign(this.$data, data);
  },
  fetchKey: 'layout/footer',
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
};
</script>
