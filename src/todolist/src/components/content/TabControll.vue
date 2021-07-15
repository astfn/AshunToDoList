<template>
  <div class="TabControllCPN" v-if="list.length">
    <ul class="list">
      <li v-for="(item, index) in list" class="item" @click="setActive(index)">
        <span :class="getActive(index)">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "TabControllCPN",
  data() {
    return { Cindex: 0 };
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultClass: {
      type: String,
      default: "deactive"
    },
    activeClass: {
      type: String,
      default: "active"
    }
  },
  methods: {
    setActive(index) {
      this.Cindex = index;
      this.$emit("ChangeCindex", index);
    },
    getActive(index) {
      return index === this.Cindex ? this.activeClass : this.defaultClass;
    }
  },
  computed: {}
};
</script>
<style scoped>
.TabControllCPN {
  height: 100%;
  width: 100%;
}
.list {
  list-style: none;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.item {
  flex: 1;
}
.item > span {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: all 0.1s;
}
.active {
  color: var(--color-high-text);
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid var(--color-tint);
}
.deactive {
  color: rgb(200, 201, 207);
}
</style>
