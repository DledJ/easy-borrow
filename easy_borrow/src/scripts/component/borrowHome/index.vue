<template>
    <div>
        <headerCom titleTxt="" backurl="borrowInfo"></headerCom>
        <section class="mb20">
            <div class="credit-form">
                <div class="repay-moudle mt40">
                    <div class="repay-title">输入借款金额</div>
                    <div class="repay-ipt">
                        <input type="number" class="ipt" :placeholder="moneyMsg" v-model="borrowMoney">
                    </div>
                    <div class="ft-999 mt5">按日计息，日利率{{this.rate}}</div>
                    <div class="error" v-show="isError">{{errMsg}}</div>
                    <div class="error" v-show="isError1">{{errMessage}}</div>
                    <div class="error" v-show="isError2">{{errMessage2}}</div>
                </div>


                <div class="mt40">收款银行卡</div>
                <div class="choose-bank mt10">
                    <a href="javascript:;">
                        <div class="choose-module fn-clear">
                            <div class="choose-inner">
                                <div class="bank-ico"><img :src="logo" width="30" alt="" height="auto"></div>
                            </div>
                            <div class="choose-inner choose-text">
                                <div class="choose-txt1"><span class="ft-333 ft-weight">{{bankName}}</span><span
                                        class="ft-666">（尾号：{{bankCardNumber}}）</span></div>
                                <div class="choose-txt2"><span class="ft-999">{{bankCardTypeName}}</span></div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="choose-btn mt80 mb20">
                    <a href="javascript:;" class="btn btn-normal" @click="nextFn">确认</a>
                </div>
            </div>


        </section>

    </div>
</template>

<script>
    import headerCom from '../header'
    import {mapGetters} from 'vuex'
    export default {
        name: 'borrowHome',
        components: {
            headerCom
        },
        data() {
            return {
                borrowMoney: '',
                isError: false,
                isError1: false,
                isError2: false,
                moneyMsg: '',
                rate: '',
                totalAmount: '',
                errMsg: '请输入借款金额',
                errMessage: '每次借款至少要借1000元',
                errMessage2: '可借金额少于1000时，您只能把剩下的金额借完',
                bankCardNumber: '',
                bankName: '',
                logo: '',
                bankCardTypeName: '',
                pUserId: '',
                partnerId: '',
                clickOne:true
            }
        },
        created() {
            this.pUserId = localStorage.getItem('userId');
            this.partnerId = localStorage.getItem('partnerId');

            this.$http.post('/casual/userInfo/getCreditQuo.json', {
                pUserId: this.pUserId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(function (res) {
                if (res.body.success) {
                    this.totalAmount = res.body.data.totalAmount;
                    this.rate = res.body.data.rate;
                    this.moneyMsg = '最多可借' + this.totalAmount;
                    this.bankCardNumber = res.body.data.bankCardNumber;
                    this.bankName = res.body.data.bankName;
                    this.logo = res.body.data.logo;
                    this.bankCardTypeName = res.body.data.bankCardTypeName;

//                    let borrowMoney=this.borrowMoney;
//                    if (this.totalAmount<1000 && borrowMoney==this.totalAmount) {
//                        this.isError2 = true;
//                    }
                }
            });


        },
        methods: {
            nextFn() {
                if (this.isError2) {
                    return;
                }

                if (!this.borrowMoney || this.borrowMoney == 0||this.borrowMoney=='NaN') {
                    this.isError = true
                }
                if (this.isError) {
                    return;
                }

                if (this.borrowMoney < 1000 && this.borrowMoney != 0&&this.totalAmount>1000) {
                    this.isError1 = true;
                    return;
                }

                if(this.clickOne){
                    this.clickOne=false;
                }else{
                    return;
                }

                localStorage.setItem('borrowMoney', this.borrowMoney);
                this.$router.push('borrowNext')
            },
            toFixed(){
                this.borrowMoney = parseFloat(this.borrowMoney).toFixed(2);
            },
            up(){
                console.log(this.borrowMoney);
                console.log(this.totalAmount);
                console.log(this.borrowMoney==this.totalAmount)
            }
        },
        watch: {
            borrowMoney(newval, oldval) {
                if(this.totalAmount<1000){
                    if(newval==this.totalAmount){
                        this.isError2 = false
                    }else{
                        this.isError2=true
                    }
                }

                if (newval) {
                    this.isError = false;
                    this.isError1 = false;
                }

                if(!this.isError2){
                    if (parseFloat(newval) > parseFloat(this.totalAmount)) {
                        this.errMsg = '输入金额不能大于' + this.totalAmount
                        this.isError = true
                    }
                }


            }
        }
    }
</script>
