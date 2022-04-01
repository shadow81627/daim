<template>
  <div>
    <Hero subheading="Digital Agency">
      <template #heading>
        <img
          :src="require('~/assets/img/logo.svg?inline')"
          :height="192"
          :width="480"
          alt="Daim"
        />
      </template>
    </Hero>
    <About></About>
    <Features></Features>
    <Services></Services>
    <ContactUs></ContactUs>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    description:
      'Get a high quality custom landing page or microsite built by professionals.',
  }),
  head() {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    };
  },
};
</script>
