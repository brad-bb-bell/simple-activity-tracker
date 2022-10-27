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
    <AddActivity @add-activity="addActivity" />
    <Datepicker v-model="date" placeholder="Select Date" :enableTimePicker="false" position="left" autoApply dark />
  </div>
  <div class="container">
    <Section title="Activities you've done" />
    <DidIts :didIts="didIts" />
  </div>
  <!-- <Dropdown :activities="activities" /> -->
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";
import Section from "./components/Section.vue";
import Activities from "./components/Activities.vue";
import AddActivity from "./components/AddActivity.vue";
import DidIts from "./components/DidIts.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import Dropdown from "./components/Dropdown.vue";

export default {
  name: "App",
  components: {
    Datepicker,
    Header,
    Section,
    Activities,
    AddActivity,
    DidIts,
    // Dropdown,
  },
  data() {
    return {
      user: {},
      activities: [],
      isSelected: [],
      didIts: [],
      date: null,
    };
  },
  methods: {
    addActivity(activity) {
      axios.post("/activities.json", activity).then((response) => {
        console.log("Successfully added new activity", response.data);
        this.activities.push(response.data);
      });
    },
    deleteActivity(id) {
      if (confirm("Are you sure you want to permanently remove this activity?")) {
        axios.delete("/activities/" + id + ".json").then((response) => {
          console.log("Success,", response.data);
          this.activities = this.activities.filter((activity) => activity.id != id);
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
          .then((this.activities[this.activities.findIndex((element) => element.id === id)].selected = false));
      } else {
        axios
          .patch("/activities/" + id + ".json", {
            selected: "true",
          })
          .then((this.activities[this.activities.findIndex((element) => element.id === id)].selected = true));
      }
    },
  },
  created() {
    axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
      this.user = response.data;
      this.activities = response.data.activities;
      this.didIts = response.data.did_its;
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
  font-size: 13px;
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
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
.dp__theme_dark input {
  width: 40%;
  height: 40px;
  font-size: 17px;
  display: flex;
  margin-left: 4px;
  align-items: center;
  justify-content: space-between;
}
</style>
