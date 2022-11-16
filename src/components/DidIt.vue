<template>
  <div class="didIt">
    {{ this.didIt.name }} on {{ dateFormat(this.didIt.date) }}
    <i @click="$emit('delete-didIt', didIt.id)" class="fas fa-times"></i>
  </div>
</template>

<script>
export default {
  name: "didIt-single",
  props: {
    didIt: Object,
  },
  methods: {
    dateFormat(date) {
      const displayDate = new Date(date.replace(/-/g, "/"));
      const options = { weekday: "long", month: "short", day: "numeric" };
      return displayDate.toLocaleDateString("en-US", options);
    },
  },
};
</script>
<style scoped>
.didIt {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
