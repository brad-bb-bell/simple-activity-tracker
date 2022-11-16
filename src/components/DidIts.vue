<template>
  <div class="didIt-list">
    <div class="didIt" :key="didIt.id" v-for="didIt in didIts">
      <DidIt @delete-didIt="$emit('delete-didIt', didIt.id)" :didIt="didIt" />
    </div>
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
  emits: ["delete-didIt"],
};
</script>
<style scoped>
.didIt {
  background: #f4f4f4;
  margin: 2px;
  padding: 2px 5px;
  cursor: pointer;
}
</style>
