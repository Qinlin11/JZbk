<template>
  <div class="sec">
    <div class="sec-div">
      <ul>
        <li v-for="(item, index) in prepareForm" :key="index">
          {{ item.name }}
          <div class="sec-row">
            <el-input
              v-model="item.value"
              placeholder="请输入"
              size="mini"
              clearable
              @change="toInfo"
            ></el-input>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'Sec',
    props:['detailInfo'],
    created() {
      if (this.detailInfo) {
      this.prepareForm[0].value = this.detailInfo.saim;
      this.prepareForm[1].value = this.detailInfo.sdifficult;
      this.prepareForm[2].value = this.detailInfo.sresources;
      this.prepareForm[3].value = this.detailInfo.explore;
      this.prepareForm[4].value = this.detailInfo.link;
      this.prepareForm[5].value = this.detailInfo.introduce;
      this.prepareForm[6].value = this.detailInfo.sprocess;
    }
    },
  data() {
    return {
      prepareForm: [
        {
          name: "学习目标",
          value: "",
        },
        {
          name: "重难点预测",
          value: "",
        },
        {
          name: "预习资源",
          value: "",
        },
        {
          name: "互动探究",
          value: "",
        },
        {
          name: "知识链接",
          value: "",
        },
        {
          name: "学法指导",
          value: "",
        },
        {
          name: "学习过程",
          value: "",
        },
      ],
    };
  },
  methods:{
    toInfo(){
      this.$bus.$emit('getInfo1',this.prepareForm)  
    }
  }
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
    .sec {
      height: 91%;
      display: flex;
      overflow: auto;
      justify-content: center;
      align-items: center;
      .sec-div {
        width: 90%;
        height: 90%;
        li {
            margin-top: 5px;
            font-size: 12px;
          .sec-row {
            margin-top: 5px;
            display: flex;
          }
        }
      }
    }
</style>