<template>
  <p>error</p>
</template>

<script>
export default {
  mounted() {
    throw new Error('test error');
  },
};
</script>
