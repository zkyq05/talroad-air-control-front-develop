<template>
    <div>
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            当前位置：<span class="current">报警手动通知</span>
        </div>
        <div class="d" style="width: 100%">
            <hr style="border:0.5px dashed #CCC;margin-left: 10px;margin-right: 10px;margin-top: -5px"/>

            <el-form ref="form" label-width="10%" style="margin-top: 40px">
                <el-form-item label="通知内容">
                    <el-input type="textarea" :rows="3" v-model="result_w.remarks" style="width: 40%"/>
                </el-form-item>

                <el-form-item label="通知对象">
                    <template>
                        <el-transfer v-model="value" :data="data" :props="{key: 'pk_id',label: 'name'}" :titles="['待选人员', '已选人员']"></el-transfer>
                    </template>
                </el-form-item>

                <el-form-item label="通知方式">
                    <el-checkbox v-model="checked1" style="margin-left: 3px" :value="msg_1">短信</el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-checkbox v-model="checked" style="margin-left: -5px" :value="msg_2">邮件</el-checkbox>
                </el-form-item>

                <div
                    style="width: 35%;height: 24px;position: relative;margin-top: -15px;margin-bottom: 10px;margin-left: 10%">

                    <hr class="hr-cls" style="position: absolute;top: 11px;width: 100%">
                    <span class="text" style="
                display: inline-block;
                background-color:#F6F7FB;
                padding: 0 5px;
                line-height: 24px;
                height: 24px;
                color: #000;
                font-weight: 700;
                position: absolute;
                left: 50%;
                top: 5px;
                margin-left: -30px;
                font-size: 12px"
                    >快捷通知</span>


                </div>

                <el-form-item label="手机号码">
                    <el-input v-model="input_phone" placeholder="请输入内容" style="width: 40%"></el-input>
                </el-form-item>

                <el-form-item label="邮箱地址">
                    <el-input v-model="input_email" placeholder="请输入内容" style="width: 40%"></el-input>
                </el-form-item>

                <el-form-item style="margin-top: -25px">
                    <div style="color: #888888;display: block;font-size: 13px">
                        （多个号码或地址请用英文逗号（,）隔开，如13567876787,13678945632）
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="send" size="small" style="margin-top: 20px">发送通知</el-button>
                    <el-button type="primary" @click="returnPage" size="small" style="margin-top: 20px">返回报警列表
                    </el-button>
                </el-form-item>

            </el-form>


        </div>
    </div>
</template>

<script>
    export default {
        name: "AlarmNotification",
        data() {
            return {
                msg_1: '0',
                msg_2: '1',
                checked1: true,
                checked: false,
                result_w: [],
                input_phone: '',
                input_email: '',
                data: [],
                value: []
            }
        },
        methods: {
            init() {
                var _this = this;
                var url = "/api/linkMan/getLinkmanData";
                var param = new URLSearchParams();
                // param.append("beginTime", beginTime);
                // param.append("endTime", endTime);
                // param.append("pageNum", _this.$refs.paginationObj.cur_page);
                // param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("stationId", "2");
                _this.$axios.post(url, param).then(function (response) {
                    _this.data = response.data.left;

                    for (let i = 0; i < response.data.right.length; i++) {
                        _this.value.push(response.data.right[i].pk_id);
                    }
                })
                console.log(value);
            },
            returnPage() {
                this.$router.push({name: 'alarmData'});
            }
        },

        mounted() {
            this.result_w = this.$route.query.result1;
            this.init();
        }
    }
</script>

<style scoped>

</style>
