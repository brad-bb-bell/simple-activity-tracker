<template>
  <br />
  <h3>All activities</h3>
  <div class="display-activities" :key="activity.id" v-for="activity in activities">
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
<style></style>
