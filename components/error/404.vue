<template>
  <div>
    <img
      class="error__img img-fluid"
      src="https://res.cloudinary.com/pocketpasta/image/upload/c_fit,dpr_auto,g_auto,w_auto,f_auto,q_auto:low/v1575402067/anna-pascale-GoqEgxAgQw0-unsplash_qq2jte.jpg"
    />
    <div id="message" class="card bg-light card-body">
      <h2>404</h2>
      <h1>{{ $t('error.404.heading') }}</h1>
      <p>
        {{ $t('error.404.description') }}
      </p>
      <nuxt-link :to="localePath('index')" class="btn btn-primary">{{
        $t('layout.navigation.home')
      }}</nuxt-link>
    </div>
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
      title: this.$t('error.404.heading'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('error.404.description'),
        },
      ],
    };
  },
};
</script>

<style media="screen" scoped>
.error__img {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
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
