<template>
  <div class="body">
    <h1>{{ name }}</h1>
    <button @click="$emit('logout')" class="btn-logout">Log Out</button>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
  },
  emits: ["logout"],
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
  padding: 5px 5px;
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
