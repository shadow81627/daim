<template>
  <div class="xcontainer">
    <hero
      :blok="{
        headline: 'Daim',
        desciption: 'Innovative Marketing Technology Automation',
      }"
    ></hero>
  </div>
</template>

<script>
import Hero from '~/components/hero.vue';

export default {
  components: {
    Hero,
  },
};
</script>
