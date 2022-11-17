<template>
  <div :key="activity.id" v-for="activity in activities">
    <Activity
      @toggle-select="$emit('toggle-select', activity.id)"
      @delete-activity="$emit('delete-activity', activity)"
      :activity="activity"
    />
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
  emits: ["delete-activity", "toggle-select"],
};
</script>
