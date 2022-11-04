<template>
  <div class="didIt-list">
    <div :key="didIt.id" v-for="didIt in didIts">
      <DidIt :didIt="didIt" />
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
};
</script>
<style scoped>
.didIt-list {
  margin: 20px 0;
}
.didIt-list label {
  display: block;
}
.didIt-list input {
  width: 13%;
  height: 30px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.didIt-list-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.didIt-list-check label {
  flex: 1;
}
.didIt-list-check input {
  flex: 2;
  height: 20px;
}
</style>
