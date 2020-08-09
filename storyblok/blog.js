module.exports = {
  name: 'blog',
  display_name: null,
  schema: {
    name: {
      type: 'text',
      pos: 0,
    },
    intro: {
      type: 'textarea',
      pos: 1,
    },
    body: {
      type: 'richtext',
      pos: 2,
    },
  },
  image: null,
  preview_field: null,
  is_root: true,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'blog',
  component_group_uuid: null,
}
