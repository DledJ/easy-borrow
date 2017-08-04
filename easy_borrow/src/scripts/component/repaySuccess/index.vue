<template>
	<div>
		<headerCom titleTxt="" backurl="repayHome"></headerCom>
		<section class="mb20">
	        <div class="inside-bg">
	            <div class="credit-form">
	                <div class="credit-result">
	                    <i class="success-ico"></i>
	                    <div class="result-txt ft-333">还款提交成功</div>
	                    <div class="result-txt ft-666">请到还款记录查看还款结果</div>
	                </div>
	                <div class="choose-btn mt25 mb20">
	                    <router-link to="repayRecord" class="btn btn-normal">查看还款记录</router-link>
	                </div>
	            </div>
	        </div>
	    </section>
	</div>
</template>

<script>
import headerCom from '../header'

export default {
	name: 'repaySuccess',
	components: { headerCom }
}
</script>