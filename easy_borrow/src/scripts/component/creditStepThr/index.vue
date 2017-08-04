<template>
	<div>
	<headerCom titleTxt="" backurl="creditStepTwo" v-if="isshow"></headerCom>
    <header class="" v-if="bankList">
        <a class="back" href="javascript:;" @click="showBankList"><img class="back-ico" :src="picPath" alt="" />返回</a><h2 class="title"></h2>
    </header>
    <section class="mb20" v-if="isshow">
        <div class="cell" v-show="isDisabled"><span class="spinner-loader">Loading…</span></div>
        <div class="inside-bg">
            <div class="credit-form">
                <div class="credit-title">填写银行储蓄卡号码</div>
                <form action="">
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">银行卡号</label>
                                <input type="number" class="ipt" v-model="bankCardNumber">
                            </div>
                        </div>
                    </div>
                    <div class="mt15 fn-clear">
                        <div class="fn-left bank-txt2" v-show="bankHide">
                            <i class="bank-ico3"><img :src="bankObj.logo" width="20" alt=""></i>{{bankObj.bankName}}<em class="bank-type">{{bankObj.bankCardTypeName}}</em>
                        </div>
                        <div class="fn-right">
                            <a href="javascript:;" class="ft-blue ft-size14" @click="showBankList">支持的银行</a>
                        </div>
                    </div>
                    <div class="error" v-if="isError">{{errMsg}}</div>
                </form>

                <div class="choose-btn mt60 mb20">
                    <a href="javascript:;" class="btn" :class="{'btn-normal': !isDisabled, 'gray': isDisabled}" @click="submitDate">去签约</a>
                </div>
            </div>
        </div>
    </section>
    <section class="mb20" v-if="bankList">
        <div class="inside-bg">
            <div class="support-bank">
                <ul>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic1" width="30" alt=""></i>中国银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic2" width="30" alt=""></i>中国建设银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic3" width="30" alt=""></i>中国农业银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic4" width="30" alt=""></i>招商银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic5" width="30" alt=""></i>兴业银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic6" width="30" alt=""></i>中国邮政储蓄银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic7" width="30" alt=""></i>浦发银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic8" width="30" alt=""></i>中国光大银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic9" width="30" alt=""></i>中国民生银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic10" width="30" alt=""></i>中信银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic11" width="30" alt=""></i>平安银行
                    </a></li>
                    <li><a href="javascript:;">
                        <i class="bank-ico4"><img :src="pic12" width="30" alt=""></i>交通银行
                    </a></li>
                </ul>
            </div>

        </div>

    </section>
    </div>
</template>

<script>
import headerCom from '../header'
export default {
	name: 'creditStepThr',
	components: { headerCom },
    data() {
        return {
            isChoose: false,
            isDisabled: false,
            isshow: true,
            isChoosed: true,
            nowIndex: 0,
            bankList: false,
            bankHide: false,
            isError:false,
            picPath: require('../../../images/back-ico.png'),
            pic1: require('../../../images/bank/china-bank.png'),
            pic2: require('../../../images/bank/jianshe-bank.png'),
            pic3: require('../../../images/bank/nongye-bank.png'),
            pic4: require('../../../images/bank/zhaoshang-bank.png'),
            pic5: require('../../../images/bank/xingye-bank.png'),
            pic6: require('../../../images/bank/youzheng-bank.png'),
            pic7: require('../../../images/bank/pufa-bank.png'),
            pic8: require('../../../images/bank/guangda-bank.png'),
            pic9: require('../../../images/bank/minsheng-bank.png'),
            pic10: require('../../../images/bank/zhongxin-bank.png'),
            pic11: require('../../../images/bank/pingan-bank.png'),
            pic12: require('../../../images/bank/jiaotong-bank.png'),
            pic13: require('../../../images/bank/huaxia-bank.png'),
            pic14: require('../../../images/bank/shanghai-bank.png'),
            pic15: require('../../../images/bank/beijing-bank.png'),
            pic16: require('../../../images/bank/chongqing-bank.png'),
            bankCardNumber:'',
            bankObj:{},
            errMsg: '请输入银行卡号',
            bankCardTypeName:''
        }
    },
	methods: {
		submitDate() {
            if(this.isDisabled) return;
            if(!this.bankCardNumber) {
                this.isError = true;
                return;
            }
			let formdate = this.$store.state.formDateObj;
            formdate.bankCardNumber = this.bankCardNumber;

            let pUserId=localStorage.getItem('userId');
            let partnerId=localStorage.getItem('partnerId');

            formdate.pUserId=pUserId;
            formdate.partnerId=partnerId;

            this.$http.post('/casual/credit/validateBankCardInfo.json', {bankCardNo: this.bankCardNumber,partnerId:partnerId,pUserId:pUserId}, {emulateJSON: true}).then(function(res) {
                if(res.body.success) {
                    this.isDisabled = true
                    this.bankObj = res.body.data;
                    this.bankHide = true;
                    formdate.bankId = res.body.data.bankId;
                    formdate.bankCardTypeCode = res.body.data.bankCardTypeCode;
                    formdate.bankCardTypeName=res.body.data.bankCardTypeName;
                    formdate.token = this.$store.state.token
                    this.$http.post('/casual/credit/apply.json', formdate, {emulateJSON: true}).then(function(res) {
                        if(res.body.success) {
                            let url = res.body.data.url;
                            let name = formdate.name;
                            localStorage.setItem('name', name);
                            localStorage.setItem('bankCardTypeName',formdate.bankCardTypeName);
                            this.$store.dispatch('clear_data');
                            window.location.href = url;
                        } else {
                            this.isDisabled = false;
                            this.errMsg = res.body.message;
                            this.isError = true;


                            this.$router.push({path:'creditResult',query:{creditStepThr:true}})
                        }
                    })
                } else {
                    this.isDisabled = false;
                    this.errMsg = res.body.message;
                    this.isError = true;

                }
            })
			
		},
        showBankList() {
            this.bankList = !this.bankList;
            this.isshow = !this.isshow;
        }

	},
	created() {

	},
    watch: {
        bankCardNumber(newval, oldval) {
            if(newval) {
                this.isError = false;
            }
        }
    }
}
</script>


<style>


</style>