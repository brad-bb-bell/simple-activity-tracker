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
    />
  </div>
  <div class="container">
    <Section title="Recent activities" />
    <DidIts :didIts="didIts" />
  </div>
  <!-- <Dropdown :activities="activities" /> -->
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
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
// import Dropdown from "./components/Dropdown.vue";

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
    // Dropdown,
  },
  data() {
    return {
      user: {},
      activities: [],
      selectedId: [],
      didIts: [],
      calendarDate: "",
      favorites: [],
      highestActivity: "Favorite Activity",
      highestCount: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalDays: 0,
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
            this.didIts = this.didIts.reverse().slice(0, 10);
            this.getStreak();
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
      this.firstDidItDate = this.didIts[0].date;
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
            console.log(response.data);
            this.longestStreak = this.currentStreak;
          });
      }
    },
  },
  created() {
    axios.get("/users/" + localStorage.user_id + ".json").then((response) => {
      this.user = response.data;
      this.activities = response.data.activities;
      this.didIts = response.data.did_its;
      this.getFavorites();
      this.didIts.sort(function (a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c - d;
      });
      let startDate = new Date(this.didIts[this.didIts.length - 1].date);
      let endDate = new Date(this.didIts[0].date);
      this.totalDays = (startDate - endDate) / 86400000;
      console.log("total days", this.totalDays);
      this.didIts = this.didIts.reverse().slice(0, 10);
      console.log("Current user", response.data);
      this.getStreak();
    });
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
</style>
