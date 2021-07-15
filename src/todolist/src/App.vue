<template>
  <div id="app">
    <h2 class="title">ASHUNTEFANNAO</h2>
    <home></home>
  </div>
</template>

<script>
import Home from "views/home/Home.vue";

export default {
  name: "App",
  components: { Home }
};
</script>

<style>
@import "~assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
h2.title {
  color: rgba(255, 255, 255, 0.2);
}
</style>
