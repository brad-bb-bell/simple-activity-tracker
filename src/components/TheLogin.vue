<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <!-- <form @submit="$emit('login', newSessionParams)"> -->
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newSessionParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Login" />
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  props: {},
  methods: {
    submit: function () {
      console.log("yes");
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          console.log(response);
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log("before setting variable", this.isLoggedIn);
          this.isLoggedIn = true;
          console.log("after setting variable", this.isLoggedIn);
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
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>
<style>
h1 {
  display: inline-block;
  margin: 0;
}
.btn-logout {
  float: right;
  background: rgb(224, 49, 49);
  color: #fff;
  border: none;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-family: inherit;
  width: 25%;
}
.btn-logout:focus {
  outline: none;
}
.btn-logout:active {
  transform: scale(0.98);
}
.btn-logout-block {
  display: block;
  width: 100%;
}
</style>
