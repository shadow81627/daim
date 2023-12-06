<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
      :level="2"
      align="left"
    />
    <FormKit
      type="form"
      method="POST"
      :action="action"
      novalidate
      class="mx-auto"
      submit-label="Send Message"
      :submit-attrs="{
        'input-class': 'bg-primary font-weight-bold',
      }"
      @submit="submit"
    >
      <div class="hpot d-none" style="display: none">
        <label>Leave this field empty: <input name="_gotcha" /></label>
      </div>

      <FormKit
        id="name"
        type="text"
        name="name"
        validation="required|length:1,255"
        label="Name"
      />

      <FormKit
        id="email"
        type="email"
        name="_replyto"
        validation="required|email"
        label="Email"
      />

      <FormKit
        id="subject"
        type="text"
        name="_subject"
        validation="required|length:1,255"
        label="Subject"
      />

      <FormKit
        id="message"
        type="textarea"
        name="message"
        class="mb-6"
        validation="required|length:1,255"
        label="Message"
      ></FormKit>
    </FormKit>
    <v-snackbar
      v-model="error"
      location="right"
      fixed
      :timeout="-1"
      color="red"
    >
      There was an issue submitting your message
      <template #action="{ attrs }">
        <v-btn variant="text" v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="success" location="right" fixed color="green">
      Thanks for getting in contact. We will contact you soon!
      <template #action="{ attrs }">
        <v-btn variant="text" v-bind="attrs" @click="success = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'BaseContactForm',

  props: {
    subtitle: { type: String, default: null },
    title: {
      type: String,
      default: 'EMAIL US YOUR MESSAGE',
    },
  },
  data: () => ({
    action: 'https://formspree.io/f/mjvpyzne',
    form: {
      name: null,
      _replyto: null,
      _subject: null,
      message: '',
    },
    submitting: null,
    error: null,
    success: null,
  }),
  methods: {
    async submit(data) {
      this.submitting = true;
      try {
        await $fetch(this.action, { method: 'POST', body: data });
        this.error = false;
        this.success = true;
        this.form = {};
      } catch (error) {
        this.error = true;
        this.$sentry.captureException(error);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
