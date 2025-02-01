module.exports = {
  settings: {
    listItemIndent: 1,
    bullet: '-',
    listStyle: '-'
  },
  plugins: [
    'remark-lint-frontmatter-schema',
    'remark-frontmatter',
    'remark-preset-lint-consistent',
    'remark-preset-lint-recommended',
    ['lint-list-item-indent', 'space'],
    ['lint-unordered-list-marker-style', '-']
  ]
}
