<template>
  <div>
    <Hero subheading="Digital Consultant">
      <template #heading>
        <img
          :src="logo"
          :height="192"
          :width="480"
          alt="Daim"
          style="max-width: 100%"
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
import logo from '~/assets/img/logo.svg?url';
export default {
  name: 'HomePage',
  data: () => ({
    logo,
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
