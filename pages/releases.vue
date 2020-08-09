<template>
  <div class="container bg-light">
    <!-- eslint-disable-next-line -->
    <div class="markdown-body" v-html="content()" />
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css';

import content from '@/CHANGELOG.md';

export default {
  methods: {
    content() {
      return content;
    },
  },
};
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;

  /* color: inherit; */
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
