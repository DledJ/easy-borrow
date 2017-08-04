<template>
    <div>
        <headerCom titleTxt="还款" backurl="borrowInfo"></headerCom>
        <section class="mb20">
            <div class="credit-form">
                <div class="repay-moudle mt40">
                    <div class="repay-title">我要还款</div>
                    <div class="repay-ipt">
                        <label for="" class="lab">￥</label>
                        <input v-model="money" type="number" class="ipt" :placeholder="holder">
                    </div>
                    <div class="error" v-show="moneyErr">{{moneyMsg}}</div>
                    <div class="error" v-show="moneyErr1">{{moneyMessage1}}</div>
                    <div class="error" v-show="moneyErr2">{{moneyMessage2}}</div>
                </div>
                <div class="mt40">还款方式</div>
                <div class="choose-bank mt10">
                    <a href="javascript:;">
                        <div class="choose-module fn-clear">
                            <div class="choose-inner">
                                <div class="bank-ico"><img :src="bankCardInfo.logo" width="30" height="30" alt=""></div>
                            </div>
                            <div class="choose-inner choose-text">
                                <div class="choose-txt1"><span class="ft-333 ft-weight">{{bankCardInfo.bankName}}</span><span
                                        class="ft-666">（尾号：{{bankCardInfo.bankCardNumberShow}}）</span></div>
                                <div class="choose-txt2"><span
                                        class="ft-999">{{bankCardTypeName}}</span></div>
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

    export default {
        name: 'repayHome',
        components: {
            headerCom
        },
        data() {
            return {
                holder: '应还本息￥8820.00',
                moneyErr: false,
                moneyMsg: '请输入还款金额',
                moneyErr1:false,
                moneyMessage1:'单次还款金额至少要100元',
                moneyErr2:false,
                moneyMessage2:'应还本息少于100的时候，单次还款要全部还完',
                money: '',
                orderMoney:'',
                bankCardInfo: {
                    bankCode: {},
                    bankCardType: {}
                },
                pUserId: '',
                partnerId: '',
                bindBankCardId: '',
                bankCardTypeName:'',         //银行卡类型
                clickOne:true
            }
        },
        methods: {
            nextFn() {
                if (!this.money&&this.money=='') {
                    this.moneyErr = true;
                    return;
                }

                if(this.orderMoney>100){
                    if(this.money<100){
                        this.moneyErr1=true;
                        return ;
                    }
                }else{
                    if ((+this.money) != (+this.orderMoney)) {
                        this.moneyErr2 = true;
                        return;
                    }
                }

                if(this.clickOne){
                    this.clickOne=false;
                }else{
                    return;
                }

                this.$http.post('/casual/repay/applyRepay.json', {
                    pUserId: this.pUserId,
                    partnerId: this.partnerId,
                    repayAmount: this.money,
                    bindBankCardId: this.bindBankCardId
                }, {emulateJSON: true}).then(res => {
                    if (res.body.success) {
                        this.$router.push('repaySuccess')
                    }
                })


            },
            toFixed() {
                this.money = parseFloat(this.money).toFixed(2)
            }
        },
        created() {
            this.pUserId = localStorage.getItem('userId');
            this.partnerId = localStorage.getItem('partnerId');
            this.bankCardTypeName=localStorage.getItem('bankCardTypeName');

            this.$http.post('/casual/repay/getRepayData.json', {
                pUserId: this.pUserId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(res => {
                if (res.body.success) {
                    this.orderMoney=res.body.data.money;
                    this.holder = '应还本息￥' + res.body.data.money;
                    this.bindBankCardId = res.body.bankCardNumber;
                    this.bankCardInfo = res.body.data;
                }
            })
        },
        watch:{
            money(newValue){
                this.moneyErr=false;
                this.moneyErr1=false;
                this.moneyErr2=false;
            }
        }
    }
</script>