<template>
  <div id="HomeTabControl">
    <div class="left">
      <tab-controll
        :list="list"
        @ChangeCindex="ChangeCindex"
        :activeClass="activeClass"
      />
    </div>
    <div class="right" @click="changeMode">
      <p :class="{ Admin: isAdmin }" class="adminTxt">管理</p>
    </div>
  </div>
</template>
<script>
import TabControll from "components/content/TabControll.vue";
export default {
  name: "HomeTabControl",
  data() {
    return {
      list: ["全部", "未完成", "已完成"],
      activeClass: "active",
      // defaultClass: "default"
      isAdmin: false,
      existSelect: false
    };
  },
  //组件创建完毕后，先获取一下存储在local storage中的数据
  created() {
    this.ChangeCindex(0);
  },
  components: { TabControll },
  props: {},
  methods: {
    ChangeCindex(index) {
      this.$emit("ChangeCindex", index);
    },
    changeMode() {
      this.isAdmin = !this.isAdmin;
      this.$store.commit("changeMode", this.isAdmin);
      //退出管理者模式，让用户抉择是否删除
      if (!this.isAdmin) {
        //判断删除缓存区中是否存在元素，若存在执行delete
        let existDeleteOption = this.$store.getters.getDeleteBufferArr.length;
        if (existDeleteOption > 0) {
          let isDelete = confirm("您确定要删除所选项嘛?");
          isDelete && this.$store.commit("deleteSelect");
        }
      }
    }
  }
};
</script>
<style scoped>
#HomeTabControl {
  height: 30px;
  margin: 10px 8px;
  /* background-color: #fff; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 200px;
  height: 100%;
}
.right {
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.adminTxt {
  margin-right: 18px;
  color: rgb(200, 201, 207);
  transition: all 0.1s;
}
.Admin {
  color: var(--color-high-text);
  font-weight: bold;
  font-size: 18px;
}

/* #HomeTabControl >>> .default {
  color: red;
} */
</style>
