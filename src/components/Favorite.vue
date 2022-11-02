<template>
  <div>
    <h3>{{ name }}: {{ count }}x</h3>
  </div>
</template>

<script>
export default {
  name: "favorte-display",
  props: {
    name: String,
    count: Number,
  },
};
</script>
