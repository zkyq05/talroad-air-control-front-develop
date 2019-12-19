<template>
    <div class="app" id='app'>
        <div class="login-box">
            <!--     <div class="login-side">
                  <div class="login-side-bd">
                    <img src="images/logo2.png" alt="">
                    <h1>中节能智慧环境平台</h1>
                    <p>欢迎来到中节能智慧环境平台</p>
                  </div>
                </div> -->
            <h1 class="login-logo"><img src="../../static/css/images/index-logo.png" alt=""></h1>
            <div class="login-main">
                <div class="login-main-bd">
                    <div class="login-tit">用户登录</div>
                    <div class="login-item">
                        <label class="login-label" for="username">账号</label>
                        <input v-model="ruleForm.username" type="text" class="login-input" placeholder="请输入您的账号" id="username">
                        <div class="login-tips">用户名错误</div>
                    </div>
                    <div class="login-item">
                        <label class="login-label" for="pwd">密码</label>
                        <input v-model="ruleForm.password" type="password" class="login-input" placeholder="请输入您的密码" id="pwd">
                        <div class="login-tips">密码错误，请检查并重新输入</div>
                    </div>
<!--                    <div class="login-item">
                        <label class="login-label" for="code">验证码</label>
                        <input type="text" class="login-input login-input-code" placeholder="" id="code">
                        <div class="login-code">
                            <img src="images/pic/code.png" alt="" class="login-code-pic">
                            <span class="login-code-text">看不清？换一张</span>
                        </div>
                        <div class="login-tips">验证码错误，请检查并重新输入</div>
                    </div>-->
                    <div class="login-item-btn">
                        <a href="#" class="login-btn" v-on:click="submitForm()">登录</a>
                    </div>
     <!--               <div class="login-item-text">
                        <div class="login-remember is-active"><i></i>记住密码</div>
                        <div class="login-account"><a href="#">忘记密码?</a><span>|</span><a href="#">立即注册</a></div>
                    </div>-->
                </div>
            </div>
            <div class="login-foot">
                <div class="welcome">
                    <img src="../../static/css/images/msg.png" class="welcome-icon" alt="">
                    <p class="welcome-text">欢迎来到</p>
                    <p class="welcome-text">中节能智慧环境平台</p>
                </div>
                <div class="copyright">
                    <span>中节能天融科技有限公司</span>
                    <span>版权所有</span>
                    <span>Copyright © {{startYear}}-{{endYear}} </span>
                    <span>All Right Reserved </span>
                    <span>京ICP备10207363-1号</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loginHtml",
        data(){
            return{
                startYear: 2019,
                endYear: 2019,
                authUsername: this.AppConfig.authInfo.username,
                authPassword: this.AppConfig.authInfo.password,
                userNameMessage: '',
                passwordMessage: '',
                ruleForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            validateFrom(){
                if (!this.ruleForm.username){
                    this.userNameMessage = "请输入账号";
                    return false;
                }else if (!this.ruleForm.password){
                    this.passwordMessage = "请输入密码";
                    return false;
                }else {
                    return true;
                }
            },
            submitForm() {
                const self = this;
                if (this.validateFrom()) {
                    var params = new URLSearchParams();
                    params.append("username", this.ruleForm.username);
                    //params.append("password", this.$md5(this.$md5(this.ruleForm.password)));
                    params.append("password", this.ruleForm.password);
                    params.append("grant_type", "password");
                    params.append("scope", "read");
                    //登录
                    self.$axios.post("/bas/auth/web/token",params,{
                            auth: {
                                username: self.authUsername,
                                password: self.authPassword
                            }
                        }).then(function (response) {
                        sessionStorage.setItem("token", response.data.access_token);
                        sessionStorage.setItem("userId", response.data.userId);
                        //获取用户菜单--start--
                        // var url = "/api/auth/queryResource/";
                        // self.$axios.post(url).then(function (response) {
                        //     sessionStorage.setItem('menus',JSON.stringify(response.data));
                        self.$router.push('/dynamicControlHTML');
                        // })
                        //获取用户菜单--end--
                    }).catch(function (err) {
                        console.log(err);
                        self.$message.error("登录失败,连接服务器失败!")
                        // self.message = "连接服务器失败！"
                    })

                    // self.$router.push('/amfHomeHtml');
                };
            },
            initCopyRightTime(){
                var date = new Date();
                this.startYear = date.getFullYear();
                this.endYear = this.startYear + 100;
            }
        },
        created() {
            this.initCopyRightTime();
        }
    }
</script>

<style scoped>

</style>
