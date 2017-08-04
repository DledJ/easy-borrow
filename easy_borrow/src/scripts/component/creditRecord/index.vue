<template>
	<div>
	<headerCom titleTxt="" backurl="borrowInfo"></headerCom>
		 <section class="mb70">
        <div class="borrow-form user-form">
            <div class="borrow-item" v-for="item in creditRec">
                <div class="border-b item-module">
                    <div class="item-inner">
                        <div class="label">授信记录</div>
                        <div class="inner-info">{{item.date}}</div>
                    </div>
                    <div class="item-inner fn-tar">
                        <!--<div class="">￥{{item.applyAmount}}</div>-->
                        <div class="inner-info2"><span :class="{'ft-red': item.status == '授信失败', 'ft-orange': item.status == '处理中'}">{{item.status}}</span></div>
                    </div>
                </div>
            </div>

        </div>
    </section>
	</div>
</template>

<script>
import headerCom from '../header'

export default {
	name: 'creditRecord',
	components: { headerCom },
    data() {
        return {
            creditRec: [],
            pUserId: '',
            partnerId: ''
        }
    },
    created() {
        this.pUserId=localStorage.getItem('userId');
        this.partnerId=localStorage.getItem('partnerId');



        this.$http.post('/casual/userInfo/getCreditRec.json', {type: 'CASUAL',pUserId:this.pUserId,partnerId:this.partnerId}, {emulateJSON: true}).then(res => {
            if(res.body.success) {
                this.creditRec = res.body.data.creditRec;
            }
        })
    }
}
</script>