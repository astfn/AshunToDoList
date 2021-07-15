<template>
  <div class="EventItemCPN" @dblclick="changeOpen" :class="OpenClass">
    <div class="left" @dblclick.stop="" @click.stop="changeState($event)">
      <div :class="getState"></div>
    </div>
    <div class="right">
      <div class="contentBox">
        <p class="content" :class="{ delete: isSelect }">
          {{ item.content }}
        </p>
      </div>
      <p class="date">{{ date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventItemCPN",
  data() {
    return { isSelect: Boolean, isOpen: false, switchOpenAnimate: false };
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    //保持与store的同步
    this.isSelect = this.item.isFinish;
  },
  watch: {
    "$store.state.EventStore.preset.isAdmin"() {
      //退出管理者模式，将选中效果与原状态同步
      if (!this.$store.getters.getIsAdmin) {
        this.isSelect = this.item.isFinish;
      } else {
        //是管理者模式，先将已完成选项放入待删除区
        this.isSelect && this.$store.commit("deleteBufferAdd", this.item);
      }
    }
  },
  methods: {
    changeState(event) {
      this.isSelect = !this.isSelect;
      //根据不同模式，做不同处理
      if (this.$store.getters.getIsAdmin) {
        //Admin模式
        //根据不同的状态，执行添加/删除
        if (this.isSelect) {
          this.$store.commit("deleteBufferAdd", this.item);
        } else {
          this.$store.commit("deleteBufferSub", this.item);
        }
      } else {
        //User模式
        this.$store.dispatch("changeState", this.item);
      }
    },
    changeOpen() {
      this.isOpen = !this.isOpen;
      this.switchOpenAnimate = true;
    }
  },
  computed: {
    getState() {
      return this.isSelect ? "active" : "btn";
    },
    date() {
      let time = new Date(Number(this.item.id));
      let YYYY = time
        .getFullYear()
        .toString()
        .slice(2, 4);
      let MM = time.getMonth() + 1;
      let DD = time.getDate();
      let HH = time.getHours();
      let mm = time.getMinutes();
      let first = [YYYY, MM, DD];
      let second = [HH, mm];
      return `${first.join("-")} ${second.join(":")}`;
    },
    OpenClass() {
      //switchOpenAnimate，双击item特效的开关，只有当双击时（让其为true）才执行相关特效
      //否则就不会返回"Open"、"notOpen"类名，就会执行默认的defaultAnimate动效
      if (this.switchOpenAnimate) {
        return this.isOpen ? "Open" : "notOpen";
      }
    }
  }
};
</script>
<style scoped>
.EventItemCPN {
  width: 0;
  height: 0;
  opacity: 0;
  margin-bottom: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 6px;
  animation: defaultAnimate 0.5s forwards;
  overflow: hidden;
}
@keyframes defaultAnimate {
  60% {
    transform: rotateX(360deg);
    transform: rotateZ(360deg);
  }
  to {
    width: 100%;
    height: 45px;
    opacity: 1;
    transform: rotateX(360deg);
    transform: rotateZ(360deg);
  }
}
.notOpen {
  width: 100%;
  animation: notOpen 0.5s forwards;
}
@keyframes notOpen {
  to {
    height: 45px;
    opacity: 1;
  }
}
.Open {
  width: 100%;
  height: 45px;
  animation: OpenAnimate 0.5s forwards;
}

@keyframes OpenAnimate {
  to {
    opacity: 1;
    height: auto;
  }
}

.Open .contentBox {
  width: calc(100% - 3px);
  /* 限定最大高度，从而能够overflow */
  max-height: 350px;
  overflow-y: auto;
}
.Open .content {
  min-width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  padding: 10px 10px 0px 0px;
  text-overflow: unset;
  white-space: normal;
}

.left {
  max-width: 100px;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.right {
  flex: 1;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}
.contentBox {
  flex: 1;
  width: 100%;
}
.content {
  width: 90%;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*滚动条样式设置*/
.contentBox::-webkit-scrollbar {
  width: 6px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条轨道样式*/
.contentBox::-webkit-scrollbar-track {
  background-color: #ecf0f1;
  border-radius: 5px;
}

/*定义滑块样式*/
.contentBox::-webkit-scrollbar-thumb {
  border-radius: 7px;
  /* border: 6px dotted var(--color-background); */
  background-image: linear-gradient(
    to bottom,
    transparent,
    var(--color-background)
  );
}
/*定义两端按钮的样式*/
/* .Open::-webkit-scrollbar-button {} */

/*定义右下角汇合处的样式*/
/* .Open::-webkit-scrollbar-corner {} */

.btn,
.active {
  border-radius: 50%;
  border: 2px solid var(--color-tint);
  position: relative;
}
.btn {
  width: 23px;
  height: 23px;
}
.active {
  width: 0;
  height: 0;
}
.active::after {
  content: "✔";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background-color: var(--color-tint);
  color: white;
  font-weight: bold;
  animation: scalebtn 0.3s forwards;
}
@keyframes scalebtn {
  to {
    width: 23px;
    height: 23px;
  }
}

.date {
  transform: translateX(-30%);
  align-self: flex-end;
  font-size: 13px;
  color: var(--color-tint);
}
.delete {
  text-decoration: line-through;
  font-style: italic;
}
</style>
