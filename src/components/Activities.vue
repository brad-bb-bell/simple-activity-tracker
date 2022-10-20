<template>
  <div :key="activity.id" v-for="activity in activities">
    <Activity @delete-activity="$emit('delete-activity', activity.id)" :activity="activity" />
  </div>
</template>

<script>
import Activity from "./Activity.vue";
export default {
  name: "activities-list",
  props: {
    activities: Array,
  },
  components: {
    Activity,
  },
  emits: ["delete-activity"],
};
</script>
