module.exports = {
  name: 'article',
  display_name: 'Article',
  schema: {
    title: {
      pos: 0,
      type: 'text',
    },
    image: {
      component_whitelist: ['meta_image'],
      maximum: 1,
      pos: 10,
      restrict_components: true,
      type: 'bloks',
    },
  },
  image: null,
  preview_field: null,
  is_root: true,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'Article',
  component_group_uuid: null,
};
