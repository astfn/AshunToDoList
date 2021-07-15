<template>
  <div id="HomeContent">
    <home-tab-control @ChangeCindex="ChangeCindex" />
    <article v-if="currentData.length > 0">
      <event-list :list="currentData" />
    </article>
    <empty v-else />
  </div>
</template>
<script>
import HomeTabControl from "./HomeTabControl";
import EventList from "components/content/EventList/EventList.vue";
import Empty from "components/content/Empty.vue";

export default {
  name: "HomeContent",
  data() {
    return {
      category: ["all", "notFinish", "finish"],
      Cindex: 0,
      currentData: []
    };
  },
  components: {
    EventList,
    HomeTabControl,
    Empty
  },
  watch: {
    "$store.state.EventStore.notFinish"() {
      //赋予初始值。且每次数据改变，都更新currentData
      /*
        这里之所以监听notFinish，判断数据变更
        是因为无论怎么操作数据，都会影响notFinish
        1. 添加新todo，会push进notFinish
        2. 完成事件，会从notFinish进行pop
        2. 取消完成事件，也会push进notFinish
        这样的好处：
        1.减少了组件数目，不用一个tabbar选项对应一个content进行展示，
            而是使用一个content，当数据发生改变时，结合Cindex更新数据。
        2.提高组件灵活性，无论tabControl有多少个选项，都使用一个content，而不用再新增/减少的组件
      */
      this.ChangeCindex(this.Cindex);
    }
  },
  methods: {
    ChangeCindex(index) {
      this.Cindex = index;
      let category = this.category[this.Cindex];
      switch (category) {
        case "all":
          {
            this.currentData = this.$store.getters.getAllEvent;
          }
          break;
        case "finish":
          {
            this.currentData = this.$store.getters.getFinishEvent;
          }
          break;
        case "notFinish":
          {
            this.currentData = this.$store.getters.getNotFinishEvent;
          }
          break;
      }
    }
  }
};
</script>
<style scoped>
#HomeContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0px 8px;
  /* 使用flex布局，内容超出时，不会展示，需要设置overflow */
  overflow-y: auto;
}
#HomeContent::-webkit-scrollbar {
  width: 0%; /*隐藏此滚动条*/
}
article {
  flex: 1;
  margin-bottom: 20px;
  overflow: hidden;
}
#HomeContent >>> .EventListCPN {
  width: 100%;
  height: 100%;
  overflow: auto;
}
#HomeContent >>> .EmptyCPN {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
}
#HomeContent >>> .EmptyCPN > h1 {
  transform: translateY(-100%);
}
</style>
