const metaImage = require('./meta_image');

module.exports = {
  display_name: 'Article',
  is_nestable: false,
  is_root: true,
  migrations: [
    // Replace `headline` field with new `title` field.
    ({ content }) => {
      // If the `headline` field was already delted
      // earlier, don't run this migration again.
      if (!content.headline) return;

      content.title = content.headline;
      delete content.headline;
    },
  ],
  name: 'article',
  schema: {
    title: {
      pos: 0,
      type: 'text',
    },
    image: {
      component_whitelist: [metaImage.name],
      maximum: 1,
      pos: 10,
      restrict_components: true,
      type: 'bloks',
    },
  },
};
