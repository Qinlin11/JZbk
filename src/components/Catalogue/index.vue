<template>
  <div style="width:100%;height: 100%;">
    <div class="aside-mulu">
      课程目录<img src="../../assets/images/plan/planedit/3.png" alt="" />
    </div>
    <div class="demo-diy">
      <div @click="getIndex(index,item)" class="diy" v-for="(item,index) in list" :key="index" :class="{active:currentIndex === index}">{{item}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:['第一单元','第二单元','第三单元','第四单元','第五单元','第六单元'],
      currentIndex:0,
    }
  },
  methods: {
    getIndex(index,item){
      this.currentIndex = index;
      this.$bus.$emit('changeUnit',item)
    }
  },
};
</script>

<style lang="less" scoped>

.demo-diy {
    box-sizing: border-box;
    padding: 15px 10px;
    padding-bottom: 50px;
    display: flex;
    height: 60%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .diy {
      font-weight: 600;
      cursor: pointer;
      width: 80%;
      border-radius: 10px;
      height: 15%;
      background-color: #b8edac;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #8f8f8f;
      &:hover {
        background-color: #ffd680;
      }
    }
  }
  .active{
    background-color: #ff922e !important;
    color: #ffffff !important;
  }
  .aside-mulu {
    width: 100%;
    background-color: #008c4e;
    height: 7%;
    color: #fff;
    display: flex;
    box-sizing: border-box;
    padding-left: 20px;
    align-items: center;
    border-radius: 5px;
    > img {
      margin-left: 5px;
      width: 12px;
      height: 15px;
    }
  }
</style>