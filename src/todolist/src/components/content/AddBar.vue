<template>
  <div class="addBarCPN">
    <div class="form">
      <label class="addContent">
        <input type="text" @keyup.enter="addEvent" v-model="content" />
      </label>
      <button type="button" class="addBtn" @click="addEvent" ref="btn">
        {{ btnContent }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "addBarCPN",
  data() {
    return {
      content: ""
    };
  },
  props: {
    btnContent: {
      type: String,
      default: "＋"
    }
  },
  methods: {
    addEvent() {
      if (this.content.trim().length) {
        let content = this.content;
        let isFinish = false;
        //时间戳设置id
        let id = Date.now().toString();
        this.$store.commit("addNotFinish", { id, isFinish, content });

        this.$store.commit("updateStore");
      } else {
        confirm("😀不能添加空事件哦~");
      }
      //btn特效
      this.$refs["btn"].classList.add("addBtnDown");
      this.$refs["btn"].addEventListener("animationend", event => {
        event.target.classList.remove("addBtnDown");
        this.content = "";
      });
    }
  }
};
</script>
<style scoped>
.addBarCPN {
  height: 100%;
  width: 100%;
}
.form {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.addContent {
  display: block;
  flex: 1;
  padding-left: 10px;
  overflow: hidden;
  border-radius: 30px;
  background-color: #fff;
}
.addContent > input {
  width: 100%;
  height: 100%;
  min-height: 30px;
  outline: none;
  border: none;
}
.addBtn {
  box-shadow: 3px 3px 3px var(--color-background);
  font-size: 24px;
  min-width: 43px;
  min-height: 43px;
  border-radius: 50%;
  outline: none;
  border: none;
  background-image: linear-gradient(
    to right bottom,
    var(--color-background) 30%,
    var(--color-tint)
  );
  color: white;
}
.addBtnDown {
  animation: BtnDown 0.4s;
}
@keyframes BtnDown {
  30% {
    transform: scale(1.2);
    border-radius: 35%;
  }
  70% {
    transform: scale(0.7);
    border-radius: 40%;
  }
}
</style>
