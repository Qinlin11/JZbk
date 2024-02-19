<template>
    <Create :url="urlList" :toPath="toPath">
    </Create>
</template>
<script>
    export default {
        data() {
            return {
                urlList:['/group/member','/group/activity','/group/discuss'],
                toPath:['/subject/detailtea','教研组','我的教研组'],
            }
        },
    }
</script>

<style lang="less" scoped>

</style>