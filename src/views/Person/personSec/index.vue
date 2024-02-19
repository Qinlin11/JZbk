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
    <PDF></PDF>
  </div>
</template>

<script>
    export default {
      props:['detailInfo'],
      data() {
            return {
                active:true,
            }
        },
    }
</script>

<style lang="less" scoped>
.main-mid-right {
  flex: 6.5;
  height: 100%;
  display: flex;
  .main-mid-right-detail {
    height: 100%;
    flex: 3;
    .mid-right-detail-top {
      height: 9%;
      display: flex;
      box-sizing: border-box;
      border-bottom: 2px solid #0caa7f;
      > div {
        height: 100%;
        width: 199.33px;
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