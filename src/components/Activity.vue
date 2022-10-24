<template>
  <div @dblclick="$emit('toggle-select', activity.id)" :class="[activity.selected ? 'select' : '', 'activity']">
    <h3>
      {{ activity.name }}
      <i @click="$emit('delete-activity', activity.id)" class="fas fa-times"></i>
    </h3>
  </div>
</template>

<script>
export default {
  name: ["activity-single", "toggle-select"],
  props: {
    activity: Object,
  },
};
</script>

<style>
.fas {
  color: red;
}
.activity {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.activity.select {
  border: 2px solid green;
}
.activity h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
