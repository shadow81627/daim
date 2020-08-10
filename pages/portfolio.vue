<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ heading }}</h1>
        <p>{{ description }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    heading: 'Portfolio',
    description: 'Projects I have worked on.',
  }),
  head() {
    return {
      title: this.heading,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    };
  },
};
</script>
