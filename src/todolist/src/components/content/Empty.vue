<template>
  <div class="EmptyCPN">
    <slot
      ><h1 style="color:#ddd">{{ msg }}</h1></slot
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "NULL"
    };
  }
};
</script>
<style scoped>
#EmptyCPN {
  width: 100%;
  height: 100%;
  background-color: #ddd;
}
</style>
