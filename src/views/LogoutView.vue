<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("localStorage.user_id");
    this.$router.push("/");
    this.isLoggedIn = false;
    console.log("logged out");
  },
};
</script>

<template>
  <div class="logout"></div>
</template>
