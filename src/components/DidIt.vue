<template>
  <div>{{ this.didIt.name }} on {{ dateFormat(this.didIt.date) }}</div>
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
