<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "add-activity-button",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      console.log("click");
    },
  },
};
</script>
