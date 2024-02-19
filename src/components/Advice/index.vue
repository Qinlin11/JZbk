<template>
      <div class="four">
          <div class="four-div">
            <span>教学反思</span>
            <el-input
            rows="12"
              v-model="textarea"
              placeholder="请输入"
              size="normal"
              clearable
              @change="toInfo"
              type="textarea"
            >
        </el-input>
          </div>
        </div>
</template>

<script>
    export default {
      props:['detailInfo'],
        data() {
            return {
                textarea:'',
            }
        },
        created() {
          this.textarea=this.detailInfo.reflect;
        },
        methods: {
          toInfo(){
            this.$bus.$emit('getInfo2',this.textarea)
          }
        },
    }
</script>

<style lang="less" scoped>
    .four {
      height: 91%;
      display: flex;
      justify-content: center;
      align-items: center;
      .four-div{
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        position: relative;
        flex-direction: column;
        span{
            font-weight: 600;
        }
      }
    }

</style>