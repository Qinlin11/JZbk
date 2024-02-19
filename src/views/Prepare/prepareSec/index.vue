<template>
  <div class="main-mid-right">
    <div class="main-mid-right-detail">
      <div class="mid-right-detail-top">
        <div @click="active = true" :class="{ active: active }">教学准备</div>
      </div>
      <transition
        :duration="1000"
        mode="out-in"
        enter-active-class="animate__animated animate__lightSpeedInRight"
        leave-active-class="animate__animated animate__lightSpeedOutRight"
      >
      <Sec :detailInfo="detailInfo"></Sec>
      </transition>
    </div>
    <Comment v-show="active"></Comment>
  </div>
</template>

<script>
export default {
  props:['detailInfo'],
  data() {
    return {
      active: true,
      // prepareForm: [
      //   {
      //     name:'学习目标',
      //     value:''
      //   },
      //   {
      //     name:'重难点预测',
      //     value:''
      //   },
      //   {
      //     name:'预习资源',
      //     value:''
      //   },
      //   {
      //     name:'互动探究',
      //     value:''
      //   },
      //   {
      //     name:'知识链接',
      //     value:''
      //   },
      //   {
      //     name:'学法指导',
      //     value:''
      //   },
      //   {
      //     name:'学习过程',
      //     value:''
      //   },
      // ],
    };
  },
};
</script>

<style lang="less" scoped>
.main-mid-right {
  flex: 6.5;
  height: 100%;
  display: flex;
  .main-mid-right-detail {
    height: 100%;
    flex: 3;
    // .sec {
    //   height: 91%;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   .sec-div {
    //     width: 90%;
    //     height: 90%;
    //     li {
    //         margin-top: 5px;
    //         font-size: 12px;
    //       .sec-row {
    //         margin-top: 5px;
    //         display: flex;
    //       }
    //     }
    //   }
    // }
    .mid-right-detail-top {
      height: 9%;
      display: flex;
      box-sizing: border-box;
      border-bottom: 2px solid #0caa7f;
      > div {
        height: 100%;
        width: 25%;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 12.5px 8px 12.5px;
          border-color: transparent transparent #ffffff transparent;
        }
      }
      .active {
        background-color: #0caa7f;
        color: #ffffff;
      }
    }
  }
}
</style>