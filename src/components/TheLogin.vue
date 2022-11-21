<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <button @click="logout()" class="btn-logout">Log Out</button>
  </div>
  <div v-if="!user">
    <button>Sign Up</button>
    <button>Log In</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    user: Object,
  },
  methods: {
    logout() {
      console.log("click");
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_id");
      console.log("Successfully logged out");
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
