<template>
	<div>
		<headerCom titleTxt="" backurl="borrowInfo"></headerCom>
		<section class="mb20">
        <div class="inside-bg">
            <div class="credit-form">
                <div class="credit-result">
                    <i class="success-ico"></i>
                    <div class="result-txt ft-333">已成功提交申请，请等待放款结果</div>
                    <div class="money ft-333">￥<em class="number">{{showObj.borrowMoney}}</em></div>
                </div>
                <div class="mt10">收款银行卡</div>
                <div class="choose-bank mt10">
                    <a href="javascript:;">
                        <div class="choose-module fn-clear">
                            <div class="choose-inner">
                                <div class="bank-ico"><img :src="showObj.logo" width="30" alt=""></div>
                            </div>
                            <div class="choose-inner choose-text">
                                <div class="choose-txt1"><span class="ft-333 ft-weight">{{showObj.bankName}}</span><span class="ft-666">（尾号：{{showObj.bankCardNumber}}）</span></div>
                                <div class="choose-txt2"><span class="ft-999">{{showObj.bankCardTypeName}}</span></div>
                            </div>
                        </div>
                    </a>
                </div>
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
            showObj:{}
        }
    },
    created() {
        this.showObj = JSON.parse(localStorage.getItem('showObj'));
    }
}
</script>