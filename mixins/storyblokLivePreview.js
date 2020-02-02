export default {
  mounted() {
    console.log(this.$storybridge);
    this.$storybridge.load(
      () => {
        console.log(this.$storybridge);
        if (this.$storybridge.proxy) {
          console.log('storyblok');
          this.$storybridge.proxy.pingEditor(function() {
            if (this.$storybridge.proxy.inEditor) {
              this.$storybridge.proxy.enterEditmode();
            }
          });
        }
      },
      () => {
        console.log('storyblok error');
        console.log(this.$storybridge);
        if (this.$storybridge.proxy) {
          console.log('storyblok');
          this.$storybridge.proxy.pingEditor(function() {
            if (this.$storybridge.proxy.inEditor) {
              this.$storybridge.proxy.enterEditmode();
            }
          });
        }
      },
    );

    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content;
        }
      } else {
        window.location.reload();
      }
    });
  },
};
