<template>
  <div id="HomeAddBarCPN">
    <div class="content">
      <add-bar />
    </div>
  </div>
</template>
<script>
import addBar from "components/content/AddBar.vue";
export default {
  name: "HomeAddBarCPN",
  data() {
    return {};
  },
  components: { addBar },
  props: {}
};
</script>
<style scoped>
#HomeAddBarCPN {
  height: 50px;
  margin: 10px 8px;
  padding: 0px 18px;
  /* background-color: #ddd; */
  position: relative;
}
.content {
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 0px 6px #7f8c8d;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
