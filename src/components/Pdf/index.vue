<template>
    <div class="pdf">
      <div class="pdf-refer">参考其他备课</div>
      <div class="pdf-list">
        <div>
          <div class="pdf-list-div">
            <div class="pdf-img">
              <img src="../../assets/images/prepare/PPT.png" alt="" />
            </div>
            <div class="pdf-text">
              <div>语文第三章.ppt</div>
              <div>8.0MB</div>
            </div>
            <div class="pdf-icon">
              <el-button style="height:20px;display: flex;justify-content: center;align-items: center;" type="primary" size="mini" @click="">预览</el-button>
              <el-button style="margin-left: 0; height: 20px;display: flex;justify-content: center;align-items: center;" type="warning" size="mini" @click="">收藏</el-button>
            </div>
          </div>
        </div>
        <div>
          <div class="pdf-list-div">
            <div class="pdf-img">
              <img src="../../assets/images/prepare/PPT.png" alt="" />
            </div>
            <div class="pdf-text">
              <div>语文第三章.ppt</div>
              <div>8.0MB</div>
            </div>
            <div class="pdf-icon">
              <el-button style="height:20px;display: flex;justify-content: center;align-items: center;" type="primary" size="mini" @click="">预览</el-button>
              <el-button style="margin-left: 0; height: 20px;display: flex;justify-content: center;align-items: center;" type="warning" size="mini" @click="">收藏</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name:'PDF'
    }
</script>

<style lang="less" scoped>
  .pdf {
    flex: 1;
    height: 91%;
    align-self: flex-end;
    border-top: 2px solid #0caa7f;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #cbc7c7;
    .pdf-refer {
      flex: 0.8;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #cbc7c7;
    }
    .pdf-list {
      flex: 6;
      overflow: auto;
      > div {
        width: 100%;
        height: 20%;
        border-bottom: 1px solid #cbc7c7;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .pdf-list-div{
            width: 90%;
            height: 70%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: 10px;
            .pdf-img{
                flex:1;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 35px;
                }
            }
            .pdf-text{
                flex:2;
            }
            .pdf-icon{
                height: 80%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                flex:1
            }
        }
      }
    }
  }

</style>