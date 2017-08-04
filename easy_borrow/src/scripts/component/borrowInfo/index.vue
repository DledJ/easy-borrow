<template>
    <div>
        <header class="">
            <a class="back" href="javascript:;" @click="backHome"><img class="back-ico" :src="picPath" alt=""/>返回</a>
            <h2 class="title"></h2>
        </header>
        <section class="mb70">
            <div class="borrow-main">
                <div class="borrow-module1">
                    <div class="borrow-title ft-size13">可借金额</div>
                    <div class="borrow-info fn-clear mt10 border-b-w">
                        <div class="fn-left info-txt">￥<em class="number">{{creditData.leftAmount}}</em></div>
                        <div class="fn-right info-txt2">日利息：{{creditData.interestRate}}</div>
                    </div>
                    <div class="borrow-info2">
                        <div class="info-inner mt20">
                            <div class="">总借款额度</div>
                            <div class="ft-size17 mt5">￥{{creditData.totalAmount}}</div>
                        </div>
                        <div class="info-inner mt20">
                            <div class="">到期日</div>
                            <div class="ft-size17 mt5">{{creditData.creditEndTime}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-module2">
                    <div class="module2-main">
                        <div class="borrow-info2">
                            <div class="info-inner">
                                <div class="ft-999">应还本金</div>
                                <div class="ft-size17 ft-333 ft-weight">￥{{creditData.repayAmount}}</div>
                                <div class="line-ico"></div>
                            </div>
                            <div class="info-inner">
                                <div class="ft-999">应还利息</div>
                                <div class="ft-size17 ft-333 ft-weight">￥{{creditData.repayInterest}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mt25">
                        <div class="fn-tar">
                            <div class="rule-btn">
                                <i class="rule-ico" @click="showCover"></i>还款规则
                                <!-- 弹出层 -->
                                <div class="bubble-module" v-show="showHide">
                                    <div class="layer-bg" @click="showCover">
                                        <div class="layer"></div>
                                    </div>
                                    <div class="arrow_box">
                                        <p class="fn-tal">到期日前可任意还，系统自动从最早一笔未结清借款的利息、本金开始结算。</p>
                                        <p class="fn-tal mt5">截至到期日<em class="ft-orange">16：00</em>前可保持卡余额充足，系统可自动代扣），结清后可再次发起授信申请
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="borrow-form">
                <div class="borrow-item">
                    <router-link to="repayRecord">
                        <div class="border-b item-module">
                            <div class="item-inner">
                                <div class="label">还款记录</div>
                            </div>
                            <div class="item-inner">
                                <router-link to="repayRecord" tag="i" class="item-right-bar"></router-link>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="borrow-item">
                    <router-link to="borrowRecord">
                        <div class="border-b item-module">
                            <div class="item-inner">
                                <div class="label">历史借款记录</div>
                            </div>
                            <div class="item-inner">
                                <router-link tag="i" to="borrowRecord" class="item-right-bar"></router-link>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="borrow-item">
                    <router-link to="creditRecord">
                        <div class="border-b item-module">
                            <div class="item-inner">
                                <div class="label">授信记录</div>
                            </div>
                            <div class="item-inner">
                                <router-link tag="i" to="creditRecord" class="item-right-bar"></router-link>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="borrow-item">
                    <router-link to="userInfo">
                        <div class="item-module">
                            <div class="item-inner">
                                <div class="label">个人信息</div>
                            </div>
                            <div class="item-inner">
                                <router-link tag="i" to="userInfo" class="item-right-bar"></router-link>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </section>

        <div class="bottom-bar border-t">
            <div class="bar">
                <div class="bottom-btn">
                    <a href="javascript:" @click="borrowHome" :class="{'btn-default':!error}">借款<i class="line-ico"></i></a>
                </div>
                <div class="bottom-btn">
                    <a href="javascript:" @click="repayHome" :class="{'btn-primary':!error}">还款</a>
                </div>
            </div>
        </div>
        <error-block :showMessage="showMessage" :message="errorMessage"></error-block>
    </div>

</template>

<script>
    import headerCom from '../header'
    import ErrorBlock from '../../base/errorBlock/index.vue'

    export default {
        name: 'borrowInfo',

        components: {
            headerCom,
            ErrorBlock
        },
        data() {
            return {
                picPath: require('../../../images/back-ico.png'),
                showHide: false,
                creditData: {},
                pUserId: '',
                partnerId: '',
                error: false,    //这个是查询/casual/userInfo/getCreditInfo.json  接口失败的情况流程

                showMessage:false,
                errorMessage:'没有应还本息金额，不能还款'
            }
        },
        methods: {
            showCover() {
                this.showHide = !this.showHide;
            },
            backHome() {
                if (this.appHomeUrl) {
                    window.location.href = this.appHomeUrl;
                } else {
                    return;
                }
            },
            borrowHome(){
                if (!this.error) {
                    this.$router.push('borrowHome')
                }else{
                    this.showMessage=true;
                    setTimeout(()=>{
                        this.showMessage=false;
                    },2500)
                }
            },
            repayHome(){
                if (!this.error) {
                    if(this.creditData.repayAmount!=0||this.creditData.repayInterest!=0){
                        this.$router.push('repayHome')
                    }else{
                        this.showMessage=true;
                        setTimeout(()=>{
                            this.showMessage=false;
                        },3000)
                    }
                }else{
                    this.showMessage=true;
                    setTimeout(()=>{
                        this.showMessage=false;
                    },3000)
                }
            }
        },
        created() {
            this.pUserId = this.$route.query.userId;
            this.partnerId = this.$route.query.partnerId;

            if ((this.pUserId != 'undefined' && this.partnerId != 'undefined') && (this.pUserId != null && this.partnerId != null)) {
                localStorage.setItem('partnerId', this.partnerId);
                localStorage.setItem('userId', this.pUserId);
            } else {
                this.pUserId = localStorage.getItem('userId');
                this.partnerId = localStorage.getItem('partnerId');
            }

            this.$http.post('/casual/userInfo/getCreditInfo.json', {
                pUserId: this.pUserId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(res => {
                if (res.body.success) {
                    this.creditData = res.body.data;
                } else {
                    this.error = true;
                    this.errorMessage=res.body.message
                }
            });
            this.appHomeUrl = localStorage.getItem('appHomeUrl');
            if (!this.appHomeUrl) {
                this.$http.post('/casual/login/getPartnerHome.json', {
                    pUserId: this.pUserId,
                    partnerId: this.partnerId
                }, {emulateJSON: true}).then(res => {
                    if (res.body.success) {
                        this.appHomeUrl = res.body.data.appHomeUrl;
                        localStorage.setItem('appHomeUrl', this.appHomeUrl);
                    }
                })
            }

            if (this.error) {
                this.showStyle = false;
            } else {
                this.showStyle = true
            }
        }
    }

</script>

<style>

</style>