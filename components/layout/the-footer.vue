<template>
  <v-footer class="footer">
    <v-container>
      <v-row class="py-0 py-md-7">
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat rounded="0" color="transparent">
            <v-card-title class="text-h5">Contact</v-card-title>
          </v-card>
          <v-card flat rounded="0" color="transparent">
            <BaseLinks :items="contact">
              <template #default="{ item }">
                <v-list-item-subtitle
                  v-if="item.subtitle"
                  class="!opacity-90"
                  >{{ item.subtitle }}</v-list-item-subtitle
                >
                <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
                  item.title
                }}</v-list-item-title>
              </template>
            </BaseLinks>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat rounded="0" color="transparent">
            <v-card-title class="text-h5">Pages</v-card-title>
          </v-card>
          <v-list dense variant="flat" :role="undefined">
            <v-list-item
              v-for="item in nav1"
              :key="item.name"
              :to="localePath(item.route)"
              :active="false"
              class="text-decoration-none"
            >
              <template #prepend>
                <v-list-item-action style="margin-right: 32px">
                  <BaseIcon :icon="item.icon"></BaseIcon>
                </v-list-item-action>
              </template>
              <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
                item.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat rounded="0" color="transparent">
            <v-card-title class="text-h5">&nbsp;</v-card-title>
          </v-card>
          <v-list dense variant="flat" :role="undefined">
            <v-list-item
              v-for="item in nav2"
              :key="item.name"
              :to="localePath(item.route)"
              :active="false"
              class="text-decoration-none"
            >
              <template #prepend>
                <v-list-item-action style="margin-right: 32px">
                  <BaseIcon :icon="item.icon"></BaseIcon>
                </v-list-item-action>
              </template>
              <v-list-item-title style="font-size: 16px; line-height: 1.4">{{
                item.name
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3" class="px-xs-0">
          <v-card flat rounded="0" color="transparent">
            <v-card-title class="text-h5">Socials</v-card-title>
          </v-card>
          <BaseLinks :items="socials"></BaseLinks>
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
                <span>{{ version }}</span>
                <span v-if="commit">{{ shortHash(commit) }}</span>
                <a
                  href="https://github.com/shadow81627/daim/releases"
                  class="link px-4"
                >
                  <span>Changelog</span>
                </a>
                <a
                  href="https://stats.uptimerobot.com/X7JPPc4pLz"
                  target="_blank"
                  rel="noopener"
                  class="link px-4"
                  >Status</a
                >
                <LastModified v-bind="{ utc }" class="link px-4"></LastModified>
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
import LastModified from './last-modified';
import fractionToDecimal from '~/utils/fraction-to-decimal';
export default {
  components: {
    LastModified,
  },
  async setup() {
    const localePath = useLocalePath();
    const config = useRuntimeConfig();
    const [{ data: socials }, { data: contact }, { data: nav }] =
      await Promise.all([
        useAsyncData('footer-socials', () => queryContent('socials').find()),
        useAsyncData('footer-contact', () => queryContent('contact').find()),
        useAsyncData(
          'footer-pages',
          () => queryContent('pages').where({ show_footer: true }).find(),
          {
            transform(data) {
              const navData = data.map((item) => ({
                ...item,
                pos: fractionToDecimal(item.pos),
              }));
              const nav = sortBy(navData, ['show_tab', 'pos']);
              const navHalf = Math.ceil(nav.length / 2);
              const nav1 = nav.slice(0, navHalf);
              const nav2 = nav.slice(-navHalf);
              return { nav1, nav2 };
            },
          },
        ),
      ]);

    const nav1 = nav?.value?.nav1 ?? [];
    const nav2 = nav?.value?.nav2 ?? [];

    const version = config.public.VERSION;
    const commit = config.public.COMMIT;

    return {
      utc: false,
      contact,
      socials,
      nav1,
      nav2,
      version,
      commit,
      localePath,
    };
  },
  methods: {
    shortHash: (value) => (value ? value.substring(0, 7) : null),
  },
};
</script>
