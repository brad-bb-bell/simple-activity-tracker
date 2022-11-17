<template>
  <div v-if="user">
    {{ user.name }}
    <Button text="Log Out" />
  </div>
</template>
<script>
import Button from "./Button.vue";
export default { props: { user: Object } };
</script>
