<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-textarea
      outlined
      dense
      single-line
      v-bind="{
        rows: 6,
        ...$attrs,
        rules: undefined,
      }"
      :error-messages="errors"
      :success="valid"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
export default {
  name: 'BaseTextarea',
  components: { ValidationProvider },
  props: {
    rules: {
      type: [Object, String],
      default: '',
    },
  },
};
</script>
