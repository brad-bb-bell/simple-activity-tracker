<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    this.isLoggedIn = false;
    this.user = {};
    this.activities = [];
    this.$router.push("/");
  },
};
</script>

<template>
  <div class="login-container">
    <h2>Please log in or sign up</h2>
  </div>
</template>
