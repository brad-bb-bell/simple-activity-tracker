<template>
  <header>
    <h1>{{ title }}</h1>
    <Button text="Add Activity" color="green" />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "main-header",
  props: {
    title: String,
  },
  components: {
    Button,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
