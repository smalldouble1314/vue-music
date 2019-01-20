<template>
  <div id="app">
    <my-header/>
    <my-tab/>
    <!-- 缓存dom,不用再次发送二次请求 -->
    <keep-alive> 
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from "_c/myheader/myheader";
import MyTab from "_c/mytab/mytab";
export default {
  components: {
    MyHeader,
    MyTab
  }
};
</script>

<style lang="scss" scoped>
// @import "_a/scss/const.scss";
// #app {
//   color: $color-theme;
// }
</style>
