<template>
    <div class="add">
        <div class="add-search">
            <div class="add-search-div"><input type="text" placeholder="请输入搜索内容" v-model="search" @change="init"><img
                    src="@/assets/images/create/search.png" alt="" @click="searchName"></div>
        </div>
        <div class="add-list">
            <div class="list" v-for="item in listSplice" :key="item.id">
                <div class="list-info">
                    <div><img :src="item.pic" alt="" srcset=""></div>
                    <div>{{ item.name }}</div>
                    <div>{{ item.sex }}</div>
                    <Button @click="invite(item)">邀请</Button>
                </div>

            </div>

        </div>
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="currentPage"
            :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="list.length" background>
            >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'addPeo',
    data() {
        return {
            search: '',
            list: '',
            currentPage: 1,
            pageSize: 6,
        }
    },
    created() {
        this.getList()
    },
    computed: {
        listSplice() {
            return this.list.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        }
    },
    methods: {
        init(){
            this.search? this.searchName():this.getList();
        },
        async searchName() {
            try {
                const res = await this.$API({
                    method: 'post',
                    url: '/api/Cgroup/find',
                    data: {
                        name: this.search
                    }
                })
                this.$message.success(`找到${this.search}啦~`)
                this.list=res.data;
            } catch (error) {
                this.$message.error(`${error.message}`) 
            }
        },
        async getList() {
            try {
                const res = await this.$API({
                    url: '/api/Cgroup/show',
                    method: 'get',
                })
                this.list = res.data;
            } catch (error) {
                this.$message.error(`获取教师数据失败,${error.message}`);
            }
        },
        sizeChange(val) {
            this.pageSize = val;
        },
        currentChange(val) {
            this.currentPage = val;
        },
        async invite(item) {
            try {
                let url = JSON.parse(sessionStorage.getItem('item')).Cid ? '/api/Cgroup/add' : '/api/Rgroup/addNumber'
                const res = await this.$API({
                    method: 'post',
                    url,
                    data: {
                        Cid: JSON.parse(sessionStorage.getItem('item')).Cid,
                        id: item.id,
                        nanoid: JSON.parse(sessionStorage.getItem('item')).nanoid
                    }
                })
                this.$message.success(res.data)
                this.$emit('update')
            } catch (error) {
                this.$message.error(`邀请成员失败,${error.message}`)
            }

        }
    }
}
</script>

<style lang="less" scoped>
.add {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .add-search {
        display: flex;
        width: 100%;

        .add-search-div {
            position: relative;
            width: 100%;

            input {
                height: 30px;
                text-indent: 1em;
                width: 100%;
                border-radius: 20px;
                outline: none;
                border: 2px solid #9f9f9f;
            }

            img {
                cursor: pointer;
                width: 30px;
                position: absolute;
                right: 3px;
                top: 2px;
            }
        }
    }

    .add-list {
        border: 2px solid #ebebeb;
        margin: 10px 0;
        border-bottom: none;
        width: 95%;

        .list {
            border-bottom: 2px solid #ebebeb;
            height: 60px;
            font-weight: 800;
            display: flex;
            align-items: center;

            .list-info {
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;

                >div:first-child {
                    border-radius: 50%;
                    overflow: hidden;
                    height: 50px;
                }

                img {
                    width: 50px;
                }

                button {
                    cursor: pointer;
                    background-color: #0caa7f;
                    border-radius: 5px;
                    border: none;
                    color: #ffffff;
                    height: 30px;
                    width: 80px;
                }
            }
        }
    }
}
</style>