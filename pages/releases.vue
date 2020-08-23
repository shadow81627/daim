<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- eslint-disable-next-line -->
        <v-card class="markdown-body pt-0" v-html="content()"></v-card>
      </v-col>
    </v-row>
  </v-container>
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
