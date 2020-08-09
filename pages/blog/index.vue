<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <section class="util__container">
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
    </section>
  </div>
</template>

<script>
import Breadcrumb from '@/components/layout/breadcrumb';
export default {
  components: { Breadcrumb },
  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';

    return context.app.$storyapi
      .get('cdn/stories', {
        version,
        starts_with: 'blog',
        // cv: context.store.state.cacheVersion,
      })
      .then((res) => {
        return res;
      })
      .catch((res) => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data,
        });
      });
  },
  data() {
    return { total: 0, data: { stories: [] } };
  },
};
</script>

<style lang="scss">
.blog__overview {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 60px;

  p {
    line-height: 1.6;
  }
}

.blog__detail-link {
  color: #000;
}
</style>
