<template>
  <div>
    <button :disabled="disabled" :class="[grey? 'disabled':'',warn? 'warn':'']"><slot></slot></button>
  </div>
</template>

<script>
export default {
  props:['disabled','grey','warn'],
  name: "myButton",
};
</script>

<style lang="less" scoped>
.disabled{
  background-color: #c1c1c1;
  &:hover{
    background-color: #c1c1c1 !important;
  }
}
.warn{
  background-color: #fc8b15;
  &:hover{  
    background-color: #ff4240;
  }
}
button{
    width: 140px;
    height: 50px;
    border-radius: 10px;
    background-color: #109d5e;
    border: none;
    color: aliceblue;
    cursor: pointer;
    letter-spacing: 2.5px;
    transition: all .3s;
    outline: none;
    &:hover{
        background-color: #0a9355;
    }
    &:active{
      transform: scale(0.95);
    }
}
</style>