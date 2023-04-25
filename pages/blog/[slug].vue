<template>
  <div itemscope itemtype="https://schema.org/BlogPosting">
    <BlogHero
      :title="name"
      :summary="description"
      :src="image"
      :credit="image && credit ? credit : {}"
      :attributions="attributions"
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
            <time :datetime="date" itemprop="datePublished">{{
              formatDate(date)
            }}</time></span
          ><span v-if="modified"
            >Modified
            <time :datetime="modified" itemprop="dateModified">{{
              formatDate(modified)
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
                :aria-label="`Share on ${network}`"
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
<script setup>
import dayjs from 'dayjs';
import { mdiFacebook, mdiTwitter, mdiLinkedin } from '@mdi/js';
// import { withoutTrailingSlash } from 'ufo';

function formatDate(date) {
  return dayjs(date).format('MMMM D, YYYY');
}
const route = useRoute();
const path = 'blog/' + route.params.slug;
const config = useRuntimeConfig();
const { data } = await useAsyncData(path, () =>
  queryContent('blog', route.params.slug)
    .only([
      'name',
      'description',
      'image',
      'credit',
      'date',
      'modified',
      'attributions',
    ])
    .findOne(),
);
const { name, description, image, credit, date, modified, attributions } =
  data.value;
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
      name,
    )}%0A%0A${encodeURIComponent(description)}&url=${config.public.BASE_URL}${
      route.path
    }`,
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
</script>
