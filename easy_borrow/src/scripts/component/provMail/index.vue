<template>
	<div>
		<headerCom titleTxt="" :backurl="{path: 'productView', query: {userId: this.userId, partnerId: this.partnerId}}"></headerCom>
		<section class="mb20">
        <div class="credit-form borrow2-form prove-mail"  v-auto-focus="focusCtrl" :data-current="currentIndex" :data-action="actionType">
            <div class="credit-title">验证企业邮箱</div>
            <div class="borrow2-info">
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="item-text">
                                <label for="" class="lab">企业邮箱地址</label>
                                <input @focus="setFocusIndex(0)" data-index="0" type="text" class="ipt" v-model="emailAddress">
                                <button class="ipt-btn" @click="sendCode" v-show="isSend">发送验证码</button>
                                <button class="ipt-btn ipt-btned" v-show="isRetry">重新发送({{i}}s)</button>
                            </div>
                            <div class="error" v-show="iserror">{{errorMsg}}</div>
                        </div>
                    </div>
            </div>

            <div class="phone-card mt20">
                <div class="label">邮箱验证码</div>
                <div class="phone-ipt mt10">
                    <input v-model="smsCodeArr[0]" @focus="setFocusIndex(1)" data-index="1" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[1]" @focus="setFocusIndex(2)" data-index="2" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[2]" @focus="setFocusIndex(3)" data-index="3" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[3]" @focus="setFocusIndex(4)" data-index="4" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[4]" @focus="setFocusIndex(5)" data-index="5" @keyup="setFocus('next')" class="ipt" type="number">
                    <input v-model="smsCodeArr[5]" @focus="setFocusIndex(6)" data-index="6" class="ipt" type="number">
                </div>
                <div class="error" v-show="isCode">{{codeMsg}}</div>
            </div>

            <div class="choose-btn mt30 mb20">
                <a href="javascript:;" class="btn btn-normal" @click="nextFn">确定</a>
            </div>
        </div>


    </section>
	</div>
</template>

<script>
import headerCom from '../header'

export default {
	name: 'proveMail',
	components: {
		headerCom
	},
	data() {
		return {
			focusCtrl:0, 
            currentIndex:0, 
            actionType: 'next',
            emailAddress: '',
            iserror: false,
            isSend: true,
            isRetry: false,
            isCode: false,
            smsCodeArr:[],
            i: 60,
            errorMsg: '请输入正确的邮箱地址',
            codeMsg: '请输入完整的验证码',
            userId: '',
            partnerId: ''
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
            let re =/^([a-zA-Z0-9_-])+@yiji.com+/;
        	if(re.test(this.emailAddress)) {
        		this.iserror = false;
                this.i = 60;
                this.isSend = false;
                this.isRetry = true;
                let timer = this.countDown();
        		let emailAddress = this.emailAddress;

                let pUserId=localStorage.getItem('userId');
                let partnerId=localStorage.getItem('partnerId');

        		this.$http.post('/casual/credit/sendEmailValidate.json', {emailAddress: emailAddress,partnerId:partnerId,pUserId:pUserId}, {emulateJSON: true}).then(res => {
        			if(res.body.success){

        			} else {
                        if(timer) clearInterval(timer);
                        this.isSend = true;
        				this.iserror = true;
                        this.isRetry = false;
        				this.errorMsg = res.body.message
        			}
        		})
        	} else {
        		this.iserror = true;
        	}
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
        	}, 1000)
            return timer;
        },
        nextFn() {
            let re = /^([a-zA-Z0-9_-])+@yiji.com+/;
            if(!re.test(this.emailAddress)) {
                this.iserror = true;
                return;
            }else {
                this.iserror = false;
            }
            if(this.smsCodeArr.length != 6) {
                this.isCode = true;
                return;
            } else {
                this.isCode = false;
            }
            let smsCode = this.smsCodeArr.join('');
            this.$http.post('/casual/credit/validateSms.json', {
                emailAddress: this.emailAddress,
                smsCode: smsCode
            }, {emulateJSON: true}).then(res => {
                if(res.body.success) {
                    this.$store.state.formDateObj.email = this.emailAddress;
                    this.$store.state.token = res.body.data
                    this.$router.push('creditStepOne')
                } else {
                    this.codeMsg = res.body.message;
                    this.isCode = true;
                }
            })
        }
    },
    watch: {
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
        this.userId = localStorage.getItem('userId');
        this.partnerId = localStorage.getItem('partnerId');
    }
}
</script>