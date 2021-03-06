export default {
  methods: {
    _srcset(src) {
      return this.$img.getSizes(src, {
        sizes: 'xs:100vw sm:100vw',
        modifiers: {
          format: 'webp',
          quality: 70,
          width: 600,
        },
      });
    },
  },
};
