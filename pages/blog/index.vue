<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <!-- <section class="util__container">
      <div
        v-for="blogPost in data.stories"
        :key="blogPost.content._uid"
        class="blog__overview"
      >
        <h2>
          <nuxt-link class="blog__detail-link" :to="'/' + blogPost.full_slug">
            {{ blogPost.content.name }}
          </nuxt-link>
        </h2>
        <small>
          {{ blogPost.published_at }}
        </small>
        <p>
          {{ blogPost.content.intro }}
        </p>
      </div>
    </section> -->
    <li v-for="{ slug, title } of items" :key="slug">
      <NuxtLink :to="slug">{{ title }}</NuxtLink>
    </li>
  </div>
</template>

<script>
import Breadcrumb from '@/components/layout/breadcrumb';
export default {
  components: { Breadcrumb },
  async asyncData({ $content }) {
    const items = await $content('blog').fetch();

    return {
      items,
    };
  },
  data() {
    return { total: 0, items: [] };
  },
};
</script>
