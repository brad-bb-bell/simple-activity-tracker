<template>
  <section class="dropdown-wrapper">
    <div @click="isVisible = !isVisible" class="selected-item">
      <span>Select Activity</span>
      <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
      </svg>
    </div>
    <div v-if="isVisible" class="dropdown-popover">
      <input v-model="searchQuery" type="text" placeholder="Search Activity" />
      <div class="options">
        <ul>
          <li v-for="activity in filteredActivity" :key="activity.id">
            {{ activity.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "dropdown-search",
  props: {
    activities: Array,
  },
  data() {
    return {
      searchQuery: "",
      selectedItem: null,
      isVisible: false,
    };
  },
  computed: {
    filteredActivity() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.activities;
      }
      return this.activities.filter((activity) => {
        return Object.values(activity).some((word) => String(word).toLowerCase().includes(query));
      });
    },
  },
};
</script>

<style scoped>
.dropdown-wrapper {
  max-width: 350px;
  position: relative;
  margin: 0 auto;
}
.selected-item {
  height: 40px;
  border: 2px solid lightgray;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
}
.dropdown-popover {
  position: absolute;
  border: 2px solid lightgray;
  top: 46px;
  left: 0;
  right: 0;
  background-color: #fff;
  max-width: 100%;
  padding: 20px;
}
input {
  width: 95%;
  height: 40px;
  border: 2px solid lightgray;
  margin: 8px;
  font-size: 16px;
  padding-left: 5px;
}
.options {
  width: 100%;
}
ul {
  list-style: none;
  text-align: left;
  padding-left: 8px;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
li {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  background-color: #f1f1f1;
  cursor: pointer;
  font-size: 16px;
}
li:hover {
  background: #70878a;
  color: #fff;
  font-weight: bold;
}
</style>
