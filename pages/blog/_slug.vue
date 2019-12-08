<template>
  <section class="util__container">
    <div v-editable="story.content" class="blog">
      <h1>{{ story.content.name }}</h1>
      <richtext class="blog__body" :text="story.content.body"></richtext>
    </div>
  </section>
</template>

<script>
import Richtext from '@/components/richtext.vue';
import storyblokLivePreview from '@/mixins/storyblokLivePreview';

export default {
  components: {
    Richtext,
  },
  mixins: [storyblokLivePreview],
  asyncData(context) {
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';
    const endpoint = `cdn/stories/blog/${context.params.slug}`;

    return context.app.$storyapi
      .get(endpoint, {
        version,
        // cv: context.store.state.cacheVersion,
      })
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data,
        });
      });
  },
  data() {
    return { story: { content: { body: '' } } };
  },
};
</script>

<style lang="scss">
.blog {
  padding: 0 20px;
  max-width: 600px;
  margin: 40px auto 100px;

  img {
    width: 100%;
    height: auto;
  }
}

.blog__body {
  line-height: 1.6;
}
</style>
