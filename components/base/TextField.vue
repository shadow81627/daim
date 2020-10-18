<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-text-field
      outlined
      dense
      single-line
      v-bind="{ ...$attrs, rules: undefined }"
      :error-messages="errors"
      :success="valid"
      v-on="$listeners"
    >
      <slot slot="append-outer" name="append-outer" />
    </v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
export default {
  name: 'BaseTextField',
  components: { ValidationProvider },
  props: {
    rules: {
      type: [Object, String],
      default: '',
    },
  },
};
</script>
