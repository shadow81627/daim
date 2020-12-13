<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />
    <validation-observer ref="obs" v-slot="{ handleSubmit }">
      <form
        method="POST"
        :action="action"
        novalidate
        @submit.prevent="handleSubmit(submit)"
      >
        <div class="hpot d-none" style="display: none">
          <label>Leave this field empty: <input name="_gotcha" /></label>
        </div>

        <base-text-field
          v-model="form.name"
          label="Name"
          name="name"
          rules="required|max:255"
        />

        <base-text-field
          v-model="form._replyto"
          label="Email"
          name="_replyto"
          rules="required|email"
        />

        <base-text-field
          v-model="form._subject"
          label="Subject"
          name="_subject"
          rules="required|max:255"
        />

        <base-textarea
          v-model="form.message"
          class="mb-6"
          label="Message"
          rules="required|max:255"
        />

        <base-btn
          :color="!theme.isDark ? 'accent' : 'white'"
          outlined
          type="submit"
        >
          Send message
        </base-btn>
      </form>
    </validation-observer>
    <v-snackbar v-model="error" top right fixed :timeout="-1" color="red">
      There was an issue submitting your message
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="error = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="success" bottom right fixed color="green">
      Thanks for getting in contact. We will contact you soon!
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="success = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { ValidationObserver, extend } from 'vee-validate';
import { messages } from 'vee-validate/dist/locale/en.json';
import { required, email, max } from 'vee-validate/dist/rules';
const rules = { required, email, max };
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
    message: messages[rule],
  });
}

export default {
  name: 'BaseContactForm',
  components: {
    ValidationObserver,
  },

  // Injected from the Vuetify Themeable mixin
  inject: ['theme'],

  props: {
    subtitle: { type: String, default: null },
    title: {
      type: String,
      default: 'EMAIL ME YOUR MESSAGE',
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
    async submit() {
      this.submitting = true;
      try {
        await this.$axios.$post(this.action, this.form);
        this.error = false;
        this.success = true;
        this.form = {};
        requestAnimationFrame(() => {
          this.$refs.obs.reset();
        });
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
