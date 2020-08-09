<template>
  <section>
    <component
      :is="story.content.component"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
    ></component>
  </section>
</template>
<script>
export default {
  asyncData(context) {
    // Check if we are in the editor mode
    const version =
      context.query._storyblok || context.isDev ? 'draft' : 'published'

    // Load the JSON from the API
    return context.app.$storyapi
      .get(`cdn/stories/${context.params.slug}`, {
        version,
      })
      .then((res) => {
        return res.data
      })
      .catch((res) => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data,
        })
      })
  },
  data() {
    return { story: { content: {} } }
  },
  mounted() {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  },
  validate({ params, query, store }) {
    const routeBlacklist = ['404.html']
    return !(params.slug in routeBlacklist)
  },
}
</script>
