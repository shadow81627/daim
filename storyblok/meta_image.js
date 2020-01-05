module.exports = {
  name: 'meta_image',
  display_name: 'Image',
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
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Image',
  component_group_uuid: null,
};
