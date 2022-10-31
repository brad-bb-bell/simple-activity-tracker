<template>
  <div>
    <h3>{{ this.didIt.name }} on {{ dateFormat(this.didIt.date) }}</h3>
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
      const displayDate = new Date(date);
      const options = { weekday: "long", month: "short", day: "numeric" };
      return displayDate.toLocaleDateString(undefined, options);
    },
  },
};
</script>
