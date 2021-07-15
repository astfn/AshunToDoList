<template>
  <div class="EventListCPN" v-if="list.length > 0">
    <event-item v-for="item in list" :item="item" :key="item.id + random" />
  </div>
</template>

<script>
import EventItem from "./EventItem.vue";
import EventDetail from "./EventDetail.vue";
export default {
  name: "EventListCPN",
  data() {
    return {
      random: Date.now()
        .toString()
        .slice(-3, -1)
    };
  },
  components: {
    EventItem,
    EventDetail
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
};
</script>
<style scoped>
.EventListCPN {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
}
/*滚动条样式设置*/
.EventListCPN::-webkit-scrollbar {
  width: 8px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条轨道样式*/
.EventListCPN::-webkit-scrollbar-track {
  background-color: var(--color-background);
  border-radius: 3px;
}

/*定义滑块样式*/
.EventListCPN::-webkit-scrollbar-thumb {
  border-radius: 7px;
  background-image: linear-gradient(
    to top,
    transparent,
    rgba(156, 136, 255, 0.6)
  );
}
</style>
