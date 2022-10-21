<template>
  <section class="dropdown-wrapper">
    <div class="selected-item">
      <span>Select Activity</span>
    </div>
    <div class="dropdown-popover">
      <input v-model="searchQuery" type="text" placeholder="Search Activity" />
      <div class="options">
        <ul>
          <li>Yoga</li>
          <li>Hike</li>
          <li>Bike</li>
          <li>Ski</li>
          <li>Climb</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "dropdown-search",
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
  font-weight: 500;
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
  width: 90%;
  height: 30px;
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
