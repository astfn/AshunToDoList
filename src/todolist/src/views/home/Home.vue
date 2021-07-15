<template>
  <div id="HomeCPN">
    <home-top :title="title" />
    <home-add-bar />
    <home-content />
  </div>
</template>
<script>
import HomeTop from "./HomeTop.vue";
import HomeContent from "./HomeContent";
import HomeAddBar from "./HomeAddBar.vue";

export default {
  name: "HomeCPN",
  data() {
    return {
      title: "欢迎使用 Ashun 待办事项！"
    };
  },
  components: { HomeTop, HomeContent, HomeAddBar }
};
</script>
<style scoped>
#HomeCPN {
  /* 尺寸 */
  width: 80%;
  height: 83%;
  max-width: 800px;
  max-height: 800px;
  min-width: 300px;
  min-height: 450px;

  /* 布局 */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(100%, 100%) skewX(60deg);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* 样式 */
  border-radius: 20px;
  background-color: rgb(244, 246, 250);
  box-shadow: -10px -10px 10px rgb(223, 227, 245),
    inset -10px -10px 10px rgb(181, 186, 212), 0px 0px 0px #eee;

  /* 动画 */
  transition: 0.6s;
  animation: enter 1s 1 forwards;
}
#HomeCPN:focus-within {
  /* 阴影加深，向上浮动 */
  top: 49%;
  /* 由于已经使用了animation-fill-mode:forwards,将动画定格在了最后一帧
     因此，如果获取焦点时，继续改变translate，则没有效果，因为帧动画应用了translate
     所以可以通过改变top来实现向上浮动的效果
  */
  box-shadow: -10px -10px 10px rgb(223, 227, 245),
    inset -10px -10px 10px rgb(181, 186, 212),
    0px 0px 10px 100px var(--color-background);
}

@keyframes enter {
  to {
    transform: translate(-50%, -55%) skewX(0deg);
  }
}
</style>
