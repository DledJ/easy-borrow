<template>
	<div>
		<headerCom titleTxt="借款" backurl="borrowHome"></headerCom>
		<section class="mb20">
        <div class="credit-form borrow2-form mt15">
            <div class="borrow2-info">
                <div class="borrow2-item borrow2-item-center border-b-ds">
                    <div class="borrow2-inner">
                        <div class="label fn-tac">借款金额</div>
                        <div class="ft-size14 money">￥<em class="number">{{borrowMoney}}</em></div>
                    </div>
                </div>
                <div class="borrow2-item">
                    <div class="borrow2-inner">
                        <div class="label">收款账户</div>
                        <div class="borrow2-txt">{{bankName}}({{bankCardNumber}})</div>
                    </div>
                    <div class="borrow2-inner w-50">
                        <div class="inner-module">
                            <div class="label">日利率</div>
                            <div class="borrow2-txt">{{rate}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow2-item mt-10 border-b-ds">
                    <div class="borrow2-inner">
                        <div class="label">到期日</div>
                        <div class="borrow2-txt">{{creditEndTime}}</div>
                    </div>
                </div>
                <div class="borrow2-item border-b-ds">
                    <div class="borrow2-inner">
                        <div class="label">借款人姓名</div>
                        <div class="borrow2-txt">{{name}}</div>
                    </div>
                    <div class="borrow2-inner w-50">
                        <div class="label">借款人身份证号码</div>
                        <div class="borrow2-txt">{{idCardNumber}}</div>
                    </div>
                </div>
                <div class="radio-ipt ft-333">
                    <i class="line-ico left-ico"></i>
                    <i class="line-ico right-ico"></i>
                    <!--<i class="radio-ico" :class="{'radio-ico1': noCheck, 'radio-ico2': !noCheck}" @click="agree"></i><span class="ft-333">我同意<a href="javascript:;" class="ft-orange">《用户服务协议》</a></span>-->
                </div>
                <!--<div class="error" v-show="iserror">请先阅读同意用户服务协议</div>-->
            </div>

            <div class="phone-card mt20">
                <div class="label">手机验证码</div>
                <div class="fn-clear ft-333 mt10">
                    <div class="fn-left">{{phone}}</div>
                </div>
                <div class="pic-code">
                    <div class="label">输入图形验证码</div>
                    <div class="code-box">
                        <input class="text" type="text" v-model="captchaPicture" v-on:focus="phoneErr = false">
                        <a class="piccode" href="javascript:;"><img :src="'/casual/ validate/getCaptchaPicture?_=' + timeStamp" v-on:click="timeStamp++"></a>
                    </div>
                </div>
                <div class="send-code">
                    <button class="card-btn" type="button" @click="sendCode" v-show="isSend">发送验证码</button>
                    <button class="card-btn ipt-btn" type="button" v-show="isRetry">重新发送({{i}}s)</button>
                </div>
                <div class="phone-ipt mt10" v-auto-focus="focusCtrl" :data-current="currentIndex" :data-action="actionType">
                    <input v-model="smsCodeArr[0]" @focus="setFocusIndex(1)" data-index="1" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[1]" @focus="setFocusIndex(2)" data-index="2" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[2]" @focus="setFocusIndex(3)" data-index="3" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[3]" @focus="setFocusIndex(4)" data-index="4" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[4]" @focus="setFocusIndex(5)" data-index="5" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[5]" @focus="setFocusIndex(6)" data-index="6" class="ipt" type="number">
                </div>
                <div class="error" v-show="phoneErr">{{phoneMsg}}</div>
            </div>

            <div class="choose-btn mt30 mb20">
                <a href="javascript:;" class="btn btn-normal" @click="nextFn">下一步</a>
            </div>
        </div>


    </section>
	</div>
</template>


<script>
import headerCom from '../header'
export default {
	name: 'borrowNext',
	components: { headerCom },
    data() {
        return {
            borrowMoney:'',
            focusCtrl:0, 
            currentIndex:0, 
            actionType: 'next',
            isSend: true,
            isRetry: false,
            isCode: false,
            smsCodeArr:[],
            i: 60,
            noCheck: true,
            iserror: false,
            phoneErr: false,
            phoneMsg: '请输入完整的验证码',
            bankCardNumber:'',
            bankName: '',
            rate:'',
            creditEndTime: '',
            name:'',
            idCardNumber:'',
            phone:'',
            creditSerialNumber:'',
            logo: '',
            bankCardTypeName:'',
            pUserId: '',
            partnerId: '',
            isSubmit:false,             //控制邮箱提交只能提交一次
            captchaPicture: '',
            timeStamp: 1
        }
    },
	methods: {
        setFocus(actionType,index) {
            this.focusCtrl++
            this.actionType = actionType
        },
        setFocusIndex(index) {
            this.currentIndex = index
        },
        sendCode() {
            this.i = 60;
            this.isSend = false;
            this.isRetry = true;
            let timer = this.countDown();

            let partnerId=localStorage.getItem('partnerId');
            let pUserId=localStorage.getItem('userId');

            this.$http.post('/casual/loan/sendSms.json', {
                partnerId: partnerId,
                pUserId: pUserId,
                captchaPicture: this.captchaPicture
            }, {emulateJSON: true}).then(function(res) {
                if(res.body.success){
                    
                } else {
                    if(timer) clearInterval(timer)
                    this.isSend = true;
                    this.isRetry = false;
                    this.phoneErr = true;
                    this.phoneMsg = res.body.message
                    this.timeStamp++
                }
            })
        },
        countDown() {
            let dec = 60;
            let timer = setInterval(() => {
                if( dec == 0 ){
                    clearInterval(timer);
                    this.isRetry = false;
                    this.isSend = true;
                } else {
                    dec--;
                    this.i = dec;
                }
            }, 1000);
            return timer;
        },
//        agree() {
//            this.noCheck = ! this.noCheck
//        },
        nextFn() {
//            console.log(this.noCheck);
//            if(this.noCheck) {
//                this.iserror = true
//                return;
//            }
            if(this.smsCodeArr.length != 6) {
                this.phoneErr = true;
                return;
            }
            let smsCode = this.smsCodeArr.join('');
            let partnerId=localStorage.getItem('partnerId');
            let pUserId=localStorage.getItem('userId');

            if(this.isSubmit){
                return;
            }
            this.isSubmit=true;

            this.$http.post('/casual/loan/validateSms.json', {smsCode: smsCode,partnerId:partnerId,pUserId:pUserId}, {emulateJSON: true}).then(function(res) {
                if(res.body.success) {
                    let obj = {
                        creditMoney: this.borrowMoney,
                        receiptAccountName: this.name,
                        creditSerialNumber: this.creditSerialNumber,
                        partnerId:partnerId,
                        pUserId:pUserId
                    };
                    this.$http.post('/casual/loan/loanApply.json', obj, {emulateJSON: true}).then(function(res) {
                        if(res.body.success) {
                            let showObj = {
                                borrowMoney: this.borrowMoney,
                                bankCardNumber: this.bankCardNumber,
                                bankName: this.bankName,
                                logo: this.logo,
                                bankCardTypeName: this.bankCardTypeName
                            }
                            showObj = JSON.stringify(showObj);
                            localStorage.setItem('showObj', showObj);
                            this.$router.push('borrowSuccess')
                        } else {
                            this.phoneErr = true;
                            this.phoneMsg = res.body.message
                        }
                    })
                } else {
                    this.phoneErr = true;
                    this.phoneMsg = res.body.message
                    this.isSubmit = false;
                }
            })
        }
	},
    watch: {
        noCheck(newval, oldval) {
            if(!newval) this.iserror = false
        },
        smsCodeArr: {
            handler(newval, oldval){
                for(name in newval) {
                    if(newval[name].length > 1) {
                        newval[name] = newval[name].substr(0,1);
                    }
                }
            },
            deep: true
        }
    },
    created() {
        this.pUserId=localStorage.getItem('userId');
        this.partnerId=localStorage.getItem('partnerId');


        this.borrowMoney = localStorage.getItem('borrowMoney');
        this.$http.post('/casual/userInfo/getCreditQuo.json',{pUserId:this.pUserId,partnerId:this.partnerId}, {emulateJSON: true}).then(function(res){
            if(res.body.success) {
                this.rate = res.body.data.rate;
                this.bankCardNumber = res.body.data.bankCardNumber;
                this.bankName = res.body.data.bankName;
                this.creditEndTime = res.body.data.creditEndTime;
                this.name = res.body.data.name;
                this.idCardNumber = res.body.data.idCardNumber;
                this.phone = res.body.data.phone;
                this.logo = res.body.data.logo;
                this.creditSerialNumber = res.body.data.creditSerialNumber;
                this.bankCardTypeName = res.body.data.bankCardTypeName;
            }
        })
    }
}
</script>