<template>
  <div>
    <h3>{{ this.didIt.name }} on {{ this.didIt.date }}</h3>
  </div>
</template>

<script>
export default {
  name: "didIt-single",
  props: {
    didIt: Object,
  },
};
</script>
