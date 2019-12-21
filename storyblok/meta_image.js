module.exports = {
  display_name: 'Image',
  is_nestable: true,
  is_root: false,
  migrations: [
    // Replace `url` field with new `src` field.
    ({ content }) => {
      if (!content.url) return;

      content.src = content.url;
      delete content.url;
    },
  ],
  name: 'meta_image',
  schema: {
    src: {
      maximum: 1,
      pos: 0,
      type: 'image',
    },
    alt: {
      pos: 10,
      type: 'text',
    },
  },
};
