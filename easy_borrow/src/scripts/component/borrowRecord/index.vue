<template>
	<div>
		<headerCom titleTxt="历史借款记录" backurl="borrowInfo"></headerCom>
		   <section class="mb70">
        <div class="borrow-form user-form">
            <div class="borrow-item" v-for="item in loanRec" v-if="loanRec.length>0">
                <div class="border-b item-module">
                    <div class="item-inner">
                        <div class="label">借款</div>
                        <div>&nbsp;</div>
                        <div class="inner-info">{{item.rawAddTime}}</div>
                    </div>
                    <div class="item-inner fn-tar">
                        <div class="ft-333 money">￥{{item.loanAmount}}</div>
                        <!--<div class="inner-info2" :class="{'ft-red': item.repayState == 'FAIL', 'ft-orange': item.repayState == 'PROCESSING', 'ft-999': item.repayState == 'SUCCESS'}">{{status[item.repayState]}}</div>-->
                        <div class="inner-info2 ft-red" v-if="item.loanStatus=='FAIL'">借款失败</div>
                        <div class="inner-info2 ft-orange"  v-if="item.loanStatus=='PROCESSING'">借款处理中</div>
                        <div class="inner-info2 ft-999"  v-if="item.loanStatus=='SUCCESS'">借款成功</div>
                    </div>
                </div>
            </div>

            <div class="borrow-item" v-if="loanRec.length==0">
                <div class="item-module">
                   <p>无借款记录</p>
                </div>
            </div>
        </div>
    </section>

	</div>
</template>

<script>
import headerCom from '../header'

export default {
	name: 'borrowRecord',
	components: {
		headerCom
	},
    data() {
        return {
            loanRec: [],
            status: {
                'SUCCESS': '借款成功',
                'FAIL': '借款失败',
                'PROCESSING': '处理中',
                pUserId: '',
                partnerId: ''
            }
        }
    },
    created() {
        this.pUserId=localStorage.getItem('userId');
        this.partnerId=localStorage.getItem('partnerId');

        this.$http.post('/casual/loan/loanRec.json',{pUserId:this.pUserId,partnerId:this.partnerId}, {emulateJSON: true}).then(res => {
            if(res.body.success) {
                this.loanRec = res.body.data.loanRec
            }
        })
    }
}
</script>