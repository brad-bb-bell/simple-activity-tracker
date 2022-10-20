<template>
  <div class="activity">
    <h3>
      {{ activity }}
      <i @click="onDelete(activity)" class="fas fa-times"></i>
    </h3>
  </div>
</template>

<script>
export default {
  name: "activity-single",
  props: {
    activity: String,
  },
  methods: {
    onDelete(activity) {
      this.$emit("delete-activity", activity);
    },
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
.activity.reminder {
  border-left: 5px solid green;
}
.activity h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
