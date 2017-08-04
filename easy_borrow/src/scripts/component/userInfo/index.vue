<template>
    <div>
        <headerCom titleTxt="" :backurl="backurl"></headerCom>
        <section class="mb70">
            <div class="borrow-form user-form">
                <div class="borrow-item" v-if="info.realName != '' && info.realName != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">姓名</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.realName}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.certNo != '' && info.certNo != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">身份证号</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.certNo}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.phone != '' && info.phone != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">移动电话</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.phone}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.maritalStatus != '' && info.maritalStatus != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">婚姻状况</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.maritalStatus}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.spouseName != '' && info.spouseName != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">配偶姓名</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.spouseName}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.spouseCertNo != '' && info.spouseCertNo != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">配偶身份证号</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.spouseCertNo}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.companyName != '' && info.companyName != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">单位名称</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.companyName}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.education != '' && info.education != null">
                    <div class="border-b item-module">
                        <div class="item-inner">
                            <div class="label">最高学历</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.education}}</div>
                        </div>
                    </div>
                </div>
                <div class="borrow-item" v-if="info.wokeBeginDate != '' && info.wokeBeginDate != null">
                    <div class="item-module">
                        <div class="item-inner">
                            <div class="label">在职时长</div>
                        </div>
                        <div class="item-inner">
                            <div class="">{{info.wokeBeginDate}}</div>
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
        name: 'userInfo',
        components: {headerCom},
        data() {
            return {
                userId: '',
                backurl: 'borrowInfo',
                info: {},
                pUserId: localStorage.getItem('userId') || localStorage.getItem('pUserId'),
                partnerId: localStorage.getItem('partnerId')
            }
        },
        created() {

            let comeFrom = this.$route.query.comeFrom;
            if (comeFrom == 'home') {
                this.backurl = '/'
            }
            let that = this;

            that.$http.post('/casual/userInfo/getUserInfo.json', {
                pUserId: this.pUserId,
                partnerId: this.partnerId
            }, {emulateJSON: true}).then(function (res) {
                if (res.body.success) {
                    that.info = res.body.data;
                }
            })
        }
    }
</script>

<style>

</style>