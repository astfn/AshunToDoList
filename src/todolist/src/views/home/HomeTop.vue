<template>
  <div id="HomeTopCPN">
    <h2 class="headTitle">{{ title }}</h2>
  </div>
</template>
<script>
export default {
  name: "HomeTopCPN",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "Hellow!"
    }
  }
};
</script>
<style scoped>
#HomeTopCPN {
  height: 80px;
  margin: 10px 8px;
  padding: 0px 18px;
  display: flex;
  align-items: center;
  /* background-color: #ddd; */
}

.headTitle {
  text-align: left;
}
</style>
