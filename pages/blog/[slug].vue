<template>
  <div itemscope itemtype="https://schema.org/BlogPosting">
    <BlogHero
      :title="item.name"
      :summary="item.description"
      :src="item.image"
      :credit="item.image && item.credit ? item.credit : {}"
    ></BlogHero>
    <v-container>
      <v-row>
        <v-col>
          <ContentDoc
            :path="path"
            class="prose mx-auto text-base prose-truegray xl:text-xl"
            itemprop="articleBody"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex flex-column justify-center">
          <span class="font-italic"
            >Published
            <time :datetime="item.date" itemprop="datePublished">{{
              formatDate(item.date)
            }}</time></span
          ><span v-if="item.modified"
            >Modified
            <time :datetime="item.modified" itemprop="dateModified">{{
              formatDate(item.modified)
            }}</time></span
          >
        </v-col>
        <v-col sm="auto" cols="12">
          <v-tooltip
            v-for="{ icon, network, url } in networks"
            :key="network"
            location="bottom"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                icon
                variant="text"
                color="#757575"
                target="_blank"
                rel="noopener"
                :href="url"
                v-on="on"
              >
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </template>
            Share on {{ network }}
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import { mdiFacebook, mdiTwitter, mdiLinkedin } from '@mdi/js';
// import { withoutTrailingSlash } from 'ufo';
import BlogHero from '~/components/sections/BlogHero';
export default {
  components: { BlogHero },
  async setup() {
    const route = useRoute();
    const path = 'blog/' + route.params.slug;
    const config = useRuntimeConfig();
    try {
      const { data: item } = await useAsyncData(path, () =>
        queryContent('blog', route.params.slug).findOne(),
      );
      // useSchemaOrg([
      //   defineArticle({
      //     image: `${config.public.BASE_URL}/${withoutTrailingSlash(
      //       path,
      //     )}/__og_image__/og.png`,
      //     datePublished: item.value.date,
      //     dateModified: item.value.date,
      //   }),
      // ]);
      const networks = [
        {
          icon: mdiTwitter,
          network: 'Twitter',
          url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            item.value.name,
          )}%0A%0A${encodeURIComponent(item.value.description)}&url=${
            config.public.BASE_URL
          }${route.path}`,
        },
        {
          icon: mdiLinkedin,
          network: 'Linkedin',
          url: `https://www.linkedin.com/sharing/share-offsite/?url=${config.public.BASE_URL}${route.path}`,
        },
        {
          icon: mdiFacebook,
          network: 'Facebook',
          url: `https://www.facebook.com/sharer/sharer.php?u=${config.public.BASE_URL}${route.path}&display=page`,
        },
      ];
      return { item, path, networks };
    } catch (error) {
      console.error('failed to fetch blog content: ', error);
      createError({ statusCode: 404 });
    }
    return { item: {}, path, networks: [] };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMMM D, YYYY');
    },
  },
};
</script>
