<template>
  <div>
    <h3>{{ name }}: {{ count }}x</h3>
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
  },
};
</script>
