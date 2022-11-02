<template>
  <div>
    <h3>{{ name }}: {{ count }}x</h3>
    <h3>Average: {{ showAverage(count, total) }} days/week</h3>
    <br />
    <h3>Current streak: {{ streak }} days</h3>
    <h3>Longest streak: {{ longest }} days</h3>
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
  },
  methods: {
    showAverage(count, total) {
      let weeks = total / 7;
      let num = count / weeks;
      return (Math.round(num * 100) / 100).toFixed(1);
    },
  },
};
</script>
