<template>
  <div>
    <hero heading="Damien Robinson" subheading="Web Development"></hero>
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
