<template>
  <div :key="didIt.id" v-for="didIt in didIts">
    <DidIt :didIt="didIt" />
  </div>
</template>
<script>
import DidIt from "./DidIt.vue";
export default {
  name: "didIts-list",
  props: {
    didIts: Array,
  },
  components: {
    DidIt,
  },
};
</script>
