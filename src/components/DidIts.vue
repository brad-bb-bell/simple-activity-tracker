<template>
  <form @change="onSubmit" class="number-form">
    <div class="form-control">
      <h3>
        Display last
        <input type="number" min="1" v-model="number" />
      </h3>
    </div>
  </form>
  <div :key="didIt.id" v-for="didIt in didIts">
    <DidIt :didIt="didIt" />
  </div>
</template>
<script>
import DidIt from "./DidIt.vue";
export default {
  name: "didIts-list",
  props: {
    didIts: Array,
    showNumber: Number,
  },
  components: {
    DidIt,
  },
  data() {
    return {
      number: 10,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (!this.number) {
        alert("Please enter a valid number");
        return;
      }

      console.log(this.number);

      this.$emit("change-number", this.number);
    },
  },
};
</script>
<style scoped>
.number-form {
  margin-bottom: 20px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 13%;
  height: 30px;
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
