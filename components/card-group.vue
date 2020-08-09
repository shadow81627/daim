<template>
  <b-card-group v-editable="blok" v-bind="groupAttars">
    <component
      :is="card.component"
      v-for="card in blok.cards"
      :key="card._uid"
      :blok="card"
    ></component>
  </b-card-group>
</template>

<script>
export default {
  props: { blok: { type: Object, required: true } },
  computed: {
    groupAttars() {
      const raw = this.blok;
      const allowed = ['columns', 'deck', 'class'];

      const filtered = Object.keys(raw)
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = raw[key];
          return obj;
        }, {});

      return filtered;
    },
  },
};
</script>
