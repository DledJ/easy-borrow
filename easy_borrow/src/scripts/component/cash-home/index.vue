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
                        <div class="fn-left info-txt">￥<em class="number">0</em></div>
                        <div class="fn-right info-txt2 ft-size15">申请授信中</div>
                    </div>
                    <div class="borrow-info2">
                        <div class="mt20">
                            <a href="javascript:;" @click="gotoDetail" class="product-view-btn">产品介绍</a>
                        </div>
                    </div>
                </div>
                <div class="borrow-module2">
                    <div class="module2-main">
                        <div class="borrow-info2">
                            <div class="info-inner">
                                <div class="ft-999">应还本金</div>
                                <div class="ft-size17 ft-333 ft-weight">0.00</div>
                                <div class="line-ico"></div>
                            </div>
                            <div class="info-inner">
                                <div class="ft-999">应还利息</div>
                                <div class="ft-size17 ft-333 ft-weight">0.00</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="index-main">
                <div class="index-module2" style=" margin-top: 3rem;">
                    <div class="module2-item">
                        <div class="module2-innner">
                            <div class="inner-label">个人信息</div>
                            <div class="">{{hideRealName}}</div>
                        </div>
                        <div class="module2-innner">
                            <router-link :to="{path: 'userInfo', query: {comeFrom: 'home' }}" class="right-btn">查看<i
                                    class="right-bar"></i></router-link>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import headerCom from '../header'
    export default {
        components: {headerCom},
        data() {
            return {
                picPath: require('../../../images/back-ico.png'),
                userId: '',
                partnerId: '',
                realName: '',
                pUserId: ''
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

            if (!this.userId) {
                this.userId = this.$route.query.userId || localStorage.getItem('userId');
                localStorage.setItem('userId', this.userId);
            }
            if (!this.partnerId) {
                this.partnerId = this.$route.query.partnerId;
                localStorage.setItem('partnerId', this.partnerId);
            }
            if (this.userId == undefined) {
                this.userId = '';
            }
            if (this.partnerId == undefined) {
                this.partnerId = '';
            }
            this.$http.post('/casual/userInfo/getUserInfo.json', {
                userId: this.userId,
                pUserId: this.pUserId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(function (res) {
                if (res.body.success) {
                    let name = res.body.data.realName;
                    this.realName = name;
                }
            });
            this.appHomeUrl = localStorage.getItem('appHomeUrl');
            if (!this.appHomeUrl) {
                this.$http.post('/casual/login/getPartnerHome.json', {
                    pUserId: this.pUserId,
                    partnerId: this.partnerId
                }, {emulateJSON: true}).then(function (res) {
                    if (res.body.success) {
                        this.appHomeUrl = res.body.data.appHomeUrl;
                        localStorage.setItem('appHomeUrl', this.appHomeUrl);
                    }
                })
            }

            //查询授信
            this.$http.post('/casual/credit/getCreditStatus.json', {
                pUserId: this.pUserId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(function (res) {
                if (res.body.success) {
                    if (res.body.data.creditStatus == 'CREDIT_FAIL') {
                        this.$router.push({path: 'productView'

                        });
                    } else if (res.body.data.creditStatus == 'CREDIT_SUCCESS') {
                        this.$router.push({path: 'borrowInfo'});
                    }
                } else {
                    this.$router.push({path: '/'});
                }
            })

        },
        methods: {
            gotoDetail() {
                this.$router.push({path: 'productView', query: {isCreadit: true}})
            },
            backHome() {
                if (this.appHomeUrl) {
                    window.location.href = this.appHomeUrl;
                } else {
                    return;
                }
            }
        },
        computed: {
            hideRealName() {
                let nameFirst = this.realName.substr(0, 1);
                let end = new Array(this.realName.length).join('*');
                return nameFirst + end;
            }
        }
    }
</script>