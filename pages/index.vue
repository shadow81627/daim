<template>
  <section class="util__container">
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    ></component>
  </section>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview';

export default {
  mixins: [storyblokLivePreview],
  asyncData(context) {
    // Check if we are in the editor mode
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published';

    // Load the JSON from the API
    return context.app.$storyapi
      .get('cdn/stories/home', {
        version,
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
    return { story: { content: {} } };
  },
  mounted() {
    const vm = this;
    // Check if we are in the editor mode
    if (this.$route.query._storyblok) {
      // Load the JSON from the API
      this.$storyapi
        .get('cdn/stories/home', {
          version: 'draft',
        })
        .then((res) => {
          Object.assign(vm.data.story, res.data.story);
        })
        .catch((res) => {
          this.error({
            statusCode: res.response.status,
            message: res.response.data,
          });
        });
    }
  },
};
</script>
