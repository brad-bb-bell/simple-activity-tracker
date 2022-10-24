<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/signup">Signup</router-link>
    |
    <router-link to="/login">Login</router-link>
    |
    <router-link to="/logout">Logout</router-link>
  </div>
  <router-view /> -->

  <div class="container">
    <Header title="Simple Activity Tracker" />
    <Activities @toggle-select="toggleActivity" @delete-activity="deleteActivity" :activities="activities" />
    <AddActivity />
  </div>
  <Dropdown :activities="activities" />
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";
import Activities from "./components/Activities.vue";
import Dropdown from "./components/Dropdown.vue";
import AddActivity from "./components/AddActivity.vue";

export default {
  name: "App",
  components: {
    Header,
    Activities,
    Dropdown,
    AddActivity,
  },
  data() {
    return {
      user: {},
      activities: [],
      isSelected: [],
    };
  },
  methods: {
    deleteActivity(id) {
      if (confirm("Are you sure you want to permanently remove this activity?")) {
        axios.delete("/activities/" + id + ".json").then((response) => {
          console.log("Success,", response.data);
        });
      }
    },
    toggleActivity(id) {
      var activity = this.activities.find((element) => element.id === id);
      if (activity.selected === true) {
        axios
          .patch("/activities/" + id + ".json", {
            selected: "false",
          })
          .then((response) => {
            console.log("Activity unselected", response.data);
          });
      } else {
        axios
          .patch("/activities/" + id + ".json", {
            selected: "true",
          })
          .then((response) => {
            console.log("Activity selected", response.data);
          });
      }
    },
  },
  created() {
    axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
      this.user = response.data;
      this.activities = response.data.activities;
      console.log("Current user", response.data);
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
