<template>
  <div id="message" class="card bg-light card-body">
    <h2 v-if="error.statusCode">{{ error.statusCode }}</h2>
    <!-- <h1>{{ $t('error.500.heading') }}</h1> -->
    <p>
      <!-- {{ $t('error.500.description') }} -->
    </p>
    <video
      autoplay
      width="640"
      data-alt="Baboon pounding on laptop keyboard"
      src="https://media.gettyimages.com/videos/medium-shot-baboon-pounding-on-laptop-keyboard-video-id712-54"
      muted
      loop
    />

    <a href="javascript:location.reload();" class="btn btn-primary btn-block"
      >Try again</a
    >
    <!-- <nuxt-link
      :to="localePath('index')"
      class="btn btn-primary btn-block"
      exact
      >{{ $t('layout.navigation.home') }}</nuxt-link
    > -->
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      // title: this.$t('error.500.heading'),
      meta: [
        // {
        //   hid: 'description',
        //   name: 'description',
        //   content: this.$t('error.500.description'),
        // },
      ],
    };
  },
};
</script>

<style media="screen" scoped>
#message video {
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}

#message {
  max-width: 360px;
  margin: 100px auto 16px;
  padding: 32px 24px 16px;
  border-radius: 3px;
}
#message h3 {
  font-weight: normal;
  font-size: 16px;
  margin: 16px 0 12px;
}
#message h2 {
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 8px;
}
#message h1 {
  font-size: 22px;
  font-weight: 300;
  margin: 0 0 16px;
}
#message p {
  line-height: 140%;
  margin: 16px 0 24px;
  font-size: 14px;
}
#message a {
  display: block;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px;
  border-radius: 4px;
}
#message,
#message a {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
#load {
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-size: 13px;
}
</style>
