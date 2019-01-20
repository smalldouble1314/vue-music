<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <!-- 轮播点 -->
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{active:currentPageIndex===index}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass } from "_a/js/dom";
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
    window.addEventListener("resize", () => {
      if (!this.slider) {  //判断如果当前的slider已经初始化了下面的就不在执行
        return;
      }
      this._setSliderWidth(true); //如果没有初识化就是将,标识位isresize判断是不是resize回来的
      //如果是resize回来的重新计算宽高
      this.slider.refresh() //重新刷新页面
    });
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children; //所有的子元素,所取得的是一个伪数组,挂载当前的组件上上
      let width = 0; //
      let sliderWidth = this.$refs.slider.clientWidth; //slider元素的视口
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i];
        addClass(child, "slider-item"); //模块化开发的思想,抽离js的代码逻辑
        child.style.width = sliderWidth + "px"; //给为每个子元素都添加 视口的宽度
        width += sliderWidth; //定义所有子元素加在一起的总长度
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });
      this.slider.on("scrollEnd", () => {
        //在轮播结束的时候触发这个事件
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          //在录播结束的时候如果当前还是属于自动录播状态就清理定时器
          clearTimeout(this.timer); //开启第二次轮播
          this._play();
        }
      });
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
};
</script>

<style lang="scss" scoped>
@import "_a/scss/const.scss";
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>