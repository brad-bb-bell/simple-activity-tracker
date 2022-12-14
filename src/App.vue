<template>
  <div class="login-container">
    <div id="nav">
      <ul>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Signup</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="isLoggedIn" class="login-left">
          <h1>{{ user.name }}</h1>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
    </div>
  </div>
  <router-view />

  <div v-if="!isLoggedIn">
    <div class="container">
      <Header title="Simple Activity Tracker 🤸 🏋️ 🧘" />
      <div class="container">
        <h3 class="message">Please log in or sign up</h3>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="body">
      <div class="container">
        <Header title="Simple Activity Tracker 🤸 🏋️ 🧘" />
        <Activities @toggle-select="toggleActivity" @delete-activity="deleteActivity" :activities="activities" />
        <AddActivity @add-activity="addActivity" />
        <Datepicker
          v-model="calendarDate"
          placeholder="Select Date"
          :format="format"
          :enableTimePicker="false"
          @update:modelValue="calendarDate"
          autoApply
          dark
        />
        <div class="center">
          <Button @did-it="didIt" class="btn" text="Did It" color="green" />
        </div>
      </div>

      <div class="container">
        <Section title="Favorite activity" />
        <Favorite
          :name="highestActivity"
          :count="highestCount"
          :streak="currentStreak"
          :longest="longestStreak"
          :total="totalDays"
          :since="firstDidItDate"
        />
        <DisplayActivities :activities="activities" :favorites="favorites" />
      </div>

      <div class="container">
        <Section title="Recent activities" />
        <DidIts @delete-didIt="deleteDidIt" :didIts="didIts" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";
import Section from "./components/Section.vue";
import Button from "./components/Button.vue";
import Activities from "./components/Activities.vue";
import DidIts from "./components/DidIts.vue";
import AddActivity from "./components/AddActivity.vue";
import Favorite from "./components/Favorite.vue";
import Datepicker from "@vuepic/vue-datepicker";
import DisplayActivities from "./components/DisplayActivities.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    Datepicker,
    Header,
    Section,
    Button,
    Activities,
    AddActivity,
    DidIts,
    Favorite,
    DisplayActivities,
  },
  data() {
    return {
      user: {},
      activities: [],
      selectedId: [],
      didIts: [],
      fullDidIts: [],
      calendarDate: "",
      favorites: {},
      highestActivity: "Favorite Activity",
      highestCount: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalDays: 0,
      showNumber: 10,
      firstDidItDate: "",
      isLoggedIn: true,
      newSessionParams: {},
    };
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
  methods: {
    addActivity(activity) {
      axios.post("/activities.json", activity).then((response) => {
        console.log("Successfully added new activity", response.data);
        this.activities.push(response.data);
      });
    },
    deleteActivity(activity) {
      if (confirm("Are you sure you want to permanently remove this activity and all associated Did Its?")) {
        var deleteName = activity.name;
        var deleteActivityId = activity.id;
        console.log("didIts length", this.fullDidIts.length);
        this.fullDidIts.forEach(
          (didIt) => {
            console.log("forEach");
            if (didIt.name === deleteName) {
              console.log("delete me", didIt);
              var deleteId = didIt.id;
              axios.delete("/did_its/" + deleteId + ".json").then((response) => {
                console.log("Success,", response.data);
                this.didIts = this.didIts.filter((didIt) => didIt.id != deleteId);
              });
            }
          },
          axios.delete("/activities/" + deleteActivityId + ".json").then((response) => {
            console.log("Success,", response.data);
            this.activities = this.activities.filter((activity) => activity.id != deleteActivityId);
          })
        );
      }
    },
    deleteDidIt(id) {
      console.log("delete didIt", id);
      axios.delete("/did_its/" + id + ".json").then((response) => {
        console.log("Success,", response.data);
        this.didIts = this.didIts.filter((didIt) => didIt.id != id);
      });
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
    didIt() {
      this.activities.forEach((activity) => {
        if (activity.selected === true) {
          this.selectedId.push(activity.id);
        }
      });
      if (!this.calendarDate) {
        alert("Please select a date.");
        return;
      }
      if (this.selectedId.length === 0) {
        alert("Please select an activity.");
        return;
      }
      for (let index = 0; index < this.selectedId.length; index++) {
        axios
          .post("/did_its.json", {
            user_id: this.user.id,
            activity_id: this.selectedId[index],
            date: this.calendarDate,
          })
          .then((response) => {
            console.log("Successfully recorded activity", response.data);
            this.didIts.push(response.data);
            if (this.highestActivity === response.data.name) {
              let temp = this.favorites.get(response.data.name) + 1;
              this.favorites.set(response.data.name, temp);
              this.highestCount = this.favorites.get(response.data.name);
            }
            this.didIts.sort(function (a, b) {
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c - d;
            });
            this.didIts = this.didIts.reverse().slice(0, this.showNumber);
            this.getStreak();
            let count = this.favorites.get(response.data.name) + 1;
            this.favorites.set(response.data.name, count);
          });
      }
      this.selectedId = [];
      this.calendarDate = "";
    },
    showDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      this.calendarDate = `${year}-${month}-${day}`;
    },
    changeNumber(number) {
      console.log("changeNumber function");
      this.showNumber = number;
      this.didIts = this.didIts.reverse().slice(0, this.showNumber);
    },
    getFavorites() {
      this.activities.forEach((activity) => {
        this.favorites.set(activity.name, 0);
      });
      this.didIts.forEach((didIt) => {
        let count = this.favorites.get(didIt.name) + 1;
        this.favorites.set(didIt.name, count);
      });
      this.highestCount = 0;
      this.highestActivity = "";
      this.activities.forEach((activity) => {
        if (this.favorites.get(activity.name) > this.highestCount) {
          this.highestCount = this.favorites.get(activity.name);
          this.highestActivity = activity.name;
        }
      });
      this.favorites.display();
    },
    getStreak() {
      this.currentStreak = 0;
      for (let index = 0; index < this.didIts.length - 1; index++) {
        if (new Date(this.didIts[index].date) - new Date(this.didIts[index + 1].date) === 0) {
          console.log("The two didIts with the same date have index", index, "and", index + 1);
        }
      }
      this.didIts.forEach((didIt, index) => {
        if (new Date(this.firstDidItDate) - new Date(didIt.date) === index * 86400000) this.currentStreak++;
      });
      if (this.currentStreak > this.user.streak) {
        axios
          .patch("/users/" + this.user.id + ".json", {
            streak: this.currentStreak,
          })
          .then((response) => {
            console.log("New longest streak", response.data.streak);
            this.longestStreak = this.currentStreak;
          });
      }
    },
    logout() {
      console.log("logout");
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_id");
      this.isLoggedIn = false;
      this.user = {};
      console.log("logged out");
    },
    login(params) {
      console.log("login method");
      console.log(params);
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.isLoggedIn = true;
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
      console.log("logged in");
    },
  },
  created() {
    console.log("isLoggedIn", this.isLoggedIn);
    if (this.isLoggedIn) {
      axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
        this.user = response.data;
        this.isLoggedIn = true;
        this.longestStreak = response.data.streak;
        this.activities = response.data.activities;
        this.didIts = response.data.did_its;
        this.fullDidIts = response.data.did_its;
        this.getFavorites();
        this.didIts.sort(function (a, b) {
          var c = new Date(a.date);
          var d = new Date(b.date);
          return c - d;
        });
        this.firstDidItDate = this.didIts[0].date;
        let startDate = new Date(this.didIts[this.didIts.length - 1].date);
        let endDate = new Date(this.didIts[0].date);
        this.totalDays = (startDate - endDate) / 86400000;
        this.didIts = this.didIts.reverse().slice(0, this.showNumber);
        console.log("Current user", response.data);
        this.getStreak();
      });
    }
    class HashTable {
      constructor() {
        this.table = new Array(127);
        this.size = 0;
      }

      _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
          hash += key.charCodeAt(i);
        }
        return hash % this.table.length;
      }

      set(key, value) {
        const index = this._hash(key);
        if (this.table[index]) {
          for (let i = 0; i < this.table[index].length; i++) {
            // Find the key/value pair in the chain
            if (this.table[index][i][0] === key) {
              this.table[index][i][1] = value;
              return;
            }
          }
          // not found, push a new key/value pair
          this.table[index].push([key, value]);
        } else {
          this.table[index] = [];
          this.table[index].push([key, value]);
        }
        this.size++;
      }

      get(key) {
        const target = this._hash(key);
        if (this.table[target]) {
          for (let i = 0; i < this.table.length; i++) {
            if (this.table[target][i][0] === key) {
              return this.table[target][i][1];
            }
          }
        }
        return undefined;
      }

      remove(key) {
        const index = this._hash(key);

        if (this.table[index] && this.table[index].length) {
          for (let i = 0; i < this.table.length; i++) {
            if (this.table[index][i][0] === key) {
              this.table[index].splice(i, 1);
              this.size--;
              return true;
            }
          }
        } else {
          return false;
        }
      }

      display() {
        this.table.forEach((values, index) => {
          const chainedValues = values.map(([key, value]) => `[ ${key}: ${value} ]`);
          console.log(`${index}: ${chainedValues}`);
        });
      }
    }
    this.favorites = new HashTable();
  },
  setup() {
    const date = ref(new Date());

    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
    };

    return {
      date,
      format,
    };
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
.login-container {
  display: block;
  text-align: right;
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 50px;
  border: 1px solid steelblue;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 5px;
}
#nav ul {
  list-style-type: none;
}
.login-left {
  float: left;
}
#nav li a {
  float: right;
  display: block;
  color: black;
  background-color: #f4f4f4;
  text-align: center;
  padding: 4px;
  text-decoration: none;
  margin: 6px;
  border-style: solid;
  border-color: steelblue;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 30px 30px;
  margin-top: 10px;
  margin-left: 3px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
  font-family: inherit;
  width: 100%;
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
  --dp-primary-color: green;
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
  --dp-highlight-color: rgba(0, 178, 3, 0.2);
}
.dp__theme_dark input {
  width: 99%;
  height: 45px;
  font-size: 17px;
  display: flex;
  margin-left: 3px;
  align-items: left;
  justify-content: space-between;
}
.message {
  text-align: center;
  vertical-align: middle;
  line-height: 250px;
}
</style>
