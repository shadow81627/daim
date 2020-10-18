<template>
  <div>
    <Hero v-bind="{ heading, src: './contact.jpg' }">
      <v-row class="fill-height mx-0 pa-4" no-gutters>
        <v-col
          class="d-flex text-left align-end justify-start"
          cols="12"
          sm="auto"
        >
          <v-card color="transparent" flat>
            <v-card-title class="text-break">
              <h1 class="mb-0">{{ heading }}</h1>
            </v-card-title>
            <v-card-subtitle>{{ description }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </Hero>
    <KeepInTouch></KeepInTouch>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data: () => ({
    heading: 'Contact',
    description: 'Want to get in touch? Check out my details below.',
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
