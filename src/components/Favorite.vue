<template>
  <div>
    {{ name }}: {{ count }}x
    <br />
    Average: {{ showAverage(count, total) }} days/week
    <br />
    <br />
    Since: {{ dateFormat(since) }}
    <br />
    Total days: {{ total }}
    <br />
    <br />
    Current streak: {{ streak }} days
    <br />
    Longest streak: {{ longest }} days
  </div>
</template>

<script>
export default {
  name: "favorte-display",
  props: {
    name: String,
    count: Number,
    streak: Number,
    longest: Number,
    total: Number,
    since: String,
  },
  methods: {
    showAverage(count, total) {
      let weeks = total / 7;
      let num = count / weeks;
      return (Math.round(num * 100) / 100).toFixed(1);
    },
    dateFormat(date) {
      const displayDate = new Date(date.replace(/-/g, "/"));
      const options = { month: "long", day: "numeric" };
      return displayDate.toLocaleDateString("en-US", options);
    },
  },
};
</script>
