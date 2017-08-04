<template>
    <div>
        <headerCom titleTxt="还款记录" backurl="borrowInfo"></headerCom>
        <section class="mb70">
            <div class="borrow-form user-form">

                <div class="borrow-item" v-if="repayInfos.length>0" v-for="repayInfo in repayInfos">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">还款金额</div>
                            <div class="inner-info">{{repayInfo.rawAddTime}}</div>
                        </div>
                        <div class="item-inner fn-tar">
                            <div class="ft-333 money">￥{{repayInfo.repayAmount}} 元</div>
                            <div class="inner-info2 ft-999" v-if="repayInfo.repayState=='REPAY_SUCCESS'">还款成功</div>
                            <div class="inner-info2 ft-orange" v-if="repayInfo.repayState=='REPAY_PROCESSING'">处理中</div>
                            <div class="inner-info2 ft-red" v-if="repayInfo.repayState=='REPAY_FAIL'">还款失败</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="repayInfos.length==0">
                    <div class=" item-module">
                        <p>无还款记录</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import headerCom from '../header'

    export default {
        name: 'repayRecord',
        components: {
            headerCom
        },
        data(){
            return {
                userId: '',
                partnerId: '',
                repayInfos:[]
            }
        },
        created(){
            this.userId = localStorage.getItem('userId');
            this.partnerId = localStorage.getItem('partnerId');

            this.$http.post('/casual/repay/repayHistory.json', {
                pUserId: this.userId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(function (res) {
                if(res.body&&res.body.success){
                    this.repayInfos=res.body.data.repayInfos;
                }
            })
        }
    }
</script>