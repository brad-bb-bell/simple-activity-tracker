<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="login-container">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name: &nbsp;</label>
        <input type="text" v-model="newUserParams.name" size="30" />
      </div>
      <div>
        <label>Email: &nbsp;</label>
        <input type="email" v-model="newUserParams.email" size="30" />
      </div>
      <div>
        <label>Password: &nbsp;</label>
        <input type="password" v-model="newUserParams.password" size="30" />
      </div>
      <div>
        <label>Password confirmation: &nbsp;</label>
        <input type="password" v-model="newUserParams.password_confirmation" size="30" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
