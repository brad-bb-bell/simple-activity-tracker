<script>
import axios from "axios";

export default {
  data() {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="login-container">
    <div class="login">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Email: &nbsp;</label>
          <input type="email" v-model="newSessionParams.email" size="30" />
        </div>
        <div>
          <label>Password: &nbsp;</label>
          <input type="password" v-model="newSessionParams.password" size="30" />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  </div>
</template>
