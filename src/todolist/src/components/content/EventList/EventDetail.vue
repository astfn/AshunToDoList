<template>
  <div class="EventDetailCPN"></div>
</template>

<script>
export default {
  name: "EventDetailCPN",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style scoped>
.EventDetailCPN {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}
</style>
