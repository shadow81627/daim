module.exports = {
  migrations: [
    // Replace `name` field with new `heading` field.
    ({ content }) => {
      if (!content.name) return;

      content.heading = content.name;
      delete content.name;
    },
  ],
  name: 'feature',
  display_name: null,
  schema: {
    heading: {
      type: 'text',
    },
    icon: {
      type: 'text',
    },
    href: {
      type: 'text',
    },
    subheading: {
      type: 'text',
    },
    text: {
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
  real_name: 'feature',
  component_group_uuid: null,
};
