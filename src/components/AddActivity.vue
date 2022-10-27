<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <input type="text" v-model="name" name="text" placeholder="Add Activity" />
    </div>
  </form>
</template>

<script>
export default {
  name: "AddActivity",
  props: {
    user: Object,
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (!this.name) {
        alert("Please add a new activity");
        return;
      }

      const newActivity = {
        user_id: localStorage.user_id,
        name: this.name,
      };

      this.$emit("add-activity", newActivity);

      this.name = "";
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-bottom: 20px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 98%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
