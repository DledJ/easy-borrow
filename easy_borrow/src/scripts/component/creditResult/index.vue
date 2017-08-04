<template>
	<div>
	<headerCom titleTxt="" backurl="/"></headerCom>
	<section class="mb20">
        <div class="inside-bg">
            <div class="credit-form">
                <!-- 审核中 -->
                <template v-if="auditing">

                <div class="credit-result">
                    <i class="result-ico waiting-ico"></i>
                    <div class="result-txt ft-333">亲爱的{{name}}，您的申请已提交，正在审核请耐心等待...</div>
                </div>

                </template>
                <!-- 失败 -->
                <template v-if="fail">
	                <div class="credit-result">
	                    <i class="result-ico fail-ico"></i>
	                    <div class="result-txt ft-333">亲爱的{{name}},你的申请在审批中被退回，<br>请拨打02365937208电话咨询，<br>或重新提交申请。</div>
	                </div>
                </template>
               

                <div class="choose-btn mt50 mb20">
                    <a href="javascript:;" class="btn btn-normal" @click="backCredit">返回现金贷</a>
                </div>
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
//                this.$router.push({path: 'productView', query: {userId: userId, partnerId: partnerId}})

                window.location.href='/casual/login/home?userId='+userId+'&partnerId='+partnerId+'&partnerHomeUrl='+appHomeUrl+'&loginUrl='+loginUrl;
            } else {
                this.$router.push({path: '/', query: {userId: userId, partnerId: partnerId}});
            }
        }
    }
}
</script>