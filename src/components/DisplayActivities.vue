<template>
  <br />
  <h2>All activities</h2>
  <div class="activity-count" :key="activity.id" v-for="activity in activities">
    {{ activity.name }}: {{ favorites.get(activity.name) }}x
  </div>
</template>
<script>
export default {
  name: "display-activities",
  props: {
    activities: Array,
    favorites: Object,
  },
};
</script>
<style scoped>
.activity-count {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
}
</style>
