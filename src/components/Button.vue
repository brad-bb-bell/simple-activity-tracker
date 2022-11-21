<template>
  <button @click="$emit('did-it')" :style="{ background: color }" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: "did-it-button",
  props: {
    text: String,
    color: String,
  },
};
</script>
