<template>
  <div class="mid-right-detail-main">
    <div class="mid-right-detail-main-div">
      <div class="detail-main-top">
        <span>教学准备</span>
        <ul>
          <li v-for="(item, index) in moduleList" :key="index">
            {{ item.name }}
            <div>
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
      <div class="detail-main-bottom">
        <span>教学设计</span>
        <ul>
          <li v-for="(item, index) in moduleList1" :key="index">
            {{ item.name }}
            <div>
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
  </div>
</template>

<script>
export default {
  name: "Prepare",
  props: ["detailInfo"],
  data() {
    return {
      active: true,
      moduleList: [
        {
          name: "学情分析",
          value: "",
        },
        {
          name: "教学工具",
          value: "",
        },
        {
          name: "教学资源",
          value: "",
        },
      ],
      moduleList1: [
        {
          name: "教学目的",
          value: "",
        },
        {
          name: "教学方法",
          value: "",
        },
        {
          name: "教学重难点",
          value: "",
        },
        {
          name: "教学过程",
          value: "",
        },
      ],
    };
  },
  created() {
    if (this.detailInfo) {
      this.moduleList[0].value = this.detailInfo.analysis;
      this.moduleList[1].value = this.detailInfo.tool;
      this.moduleList[2].value = this.detailInfo.resources;
      this.moduleList1[0].value = this.detailInfo.aim;
      this.moduleList1[1].value = this.detailInfo.method;
      this.moduleList1[2].value = this.detailInfo.difficult;
      this.moduleList1[3].value = this.detailInfo.process;
    }
  },
  methods: {
    toInfo() {
      let form = [];
      this.$bus.$emit(
        "getInfo",
        (form = [...this.moduleList, ...this.moduleList1])
      );
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  display: none;
}
.mid-right-detail-main {
  height: 91%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 17px;
  .mid-right-detail-main-div {
    width: 90%;
    height: 95%;
    display: flex;
    flex-direction: column;
    > div {
      width: 100%;
      span {
        font-size: 14px;
        font-weight: 600;
      }
      ul {
        height: 99%;
        font-size: 10px;
        div {
          box-sizing: border-box;
          margin-top: 3px;
          display: flex;
        }
      }
    }
    .detail-main-top {
      flex: 3;
    }
    .detail-main-bottom {
      flex: 4;
    }
  }
}
</style>