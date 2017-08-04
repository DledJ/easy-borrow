<template>
    <div>
        <headerCom titleTxt="" backurl="/"></headerCom>
        <section class="mb20">
            <div class="inside-bg">
                <div class="credit-form">
                    <!-- 失败 -->
                    <template >
                        <div class="credit-result">
                            <i class="result-ico fail-ico"></i>
                            <div class="result-txt ft-333">您不是从正规途径进来，没有权限</div>
                        </div>
                    </template>


                    <!--<div class="choose-btn mt50 mb20">-->
                        <!--<a href="javascript:;" class="btn btn-normal" @click="backCredit">返回现金贷</a>-->
                    <!--</div>-->
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    import headerCom from '../header'
    export default {
        name: 'creditResult',
        data() {
            return {
                auditing: true,
                fail: false,
                name:'',
                status:'',
            }
        },
        components: { headerCom },
        created() {
            this.status = this.$route.query.status;
            this.fail=this.$route.query.creditStepThr;
            if(this.fail){
                this.auditing=false
            }

            this.name = localStorage.getItem('name');
            if(this.status == 2) {
                this.fail = true;
                this.auditing = false;
            } else if(this.status == 1) {
                this.auditing = true;
                this.fail = false;
            }
        },
        methods: {
            backCredit() {
                let userId = localStorage.getItem('userId');
                let partnerId = localStorage.getItem('partnerId');
                let appHomeUrl=localStorage.getItem('appHomeUrl');
                let loginUrl=localStorage.getItem('appLoginUrl');

                if(this.status == 2) {
                    window.location.href='/casual/login/home?userId='+userId+'&partnerId='+partnerId+'&partnerHomeUrl='+appHomeUrl+'&loginUrl='+loginUrl;
                } else {
                    this.$router.push({path: '/', query: {userId: userId, partnerId: partnerId}});
                }
            }
        }
    }
</script>