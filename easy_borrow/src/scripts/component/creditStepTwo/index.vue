<template>
	<div>
	<headerCom titleTxt="授信" backurl="creditStepOne"></headerCom>
	<section class="mb20">
        <div class="inside-bg">
            <div class="credit-form">
                <div class="credit-title">个人基本资料</div>
                <form action="">
                    <div class="credit-item credit-first mt25">
                        <div class="item-inner inner-name">
                            <div class="">
                                <label for="" class="lab">申请人姓名</label>
                                <input name="name" v-model="form.name" type="text" class="ipt">
                            </div>
                            <div class="error" v-show="isError.name">请输入姓名</div>
                        </div>
                        <div class="item-inner inner-card">
                            <div class="">
                                <label for="" class="lab">身份证号</label>
                                <input v-model="form.idCardNumber" type="text" class="ipt">
                            </div>
                            <div class="error" v-show="isError.idCardNumber">请输入正确的身份证号码</div>
                        </div>
                    </div>
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">移动电话</label>
                                <input v-model="form.phone" type="number" class="ipt">
                            </div>
                            <div class="error" v-if="isError.phone">请输入11位电话号码</div>
                        </div>
                    </div>
                    <div class="credit-item mt25">
                        <!-- 未婚 -->
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">婚姻状况</label>
                                <div class="select-module">
                                    <select v-model="form.maritalStatus" class="select-form" name="" id="" @change="isMarried(form.maritalStatus)">
                                        <option value="MARRIED">已婚</option>
                                        <option value="UNMARRIED">未婚</option>
                                    </select>
                                    <i class="select-ico"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 已婚 -->
                    <div v-show="this.$store.state.married" class="credit-item credit-first mt25">
                        <div class="item-inner inner-name">
                            <div class="">
                                <label for="" class="lab">配偶姓名</label>
                                <input v-model="form.spouseName" type="text" class="ipt">
                            </div>
                            <div class="error" v-if="isError.spouseName">请输入配偶姓名</div>
                        </div>
                        <div class="item-inner inner-card">
                            <div class="">
                                <label for="" class="lab">配偶身份证号</label>
                                <input v-model="form.spouseIdCard" type="text" class="ipt">
                            </div>
                            <div class="error" v-if="isError.spouseIdCard">请输入正确的身份证号</div>
                        </div>
                    </div>
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">单位名称</label>
                                <input v-model="form.unitName" type="text" class="ipt">
                            </div>
                            <div class="error" v-if="isError.unitName">请输入单位名称</div>
                        </div>
                    </div>
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">最高学历</label>
                                <div class="select-module">
                                    <select v-model="form.educational" class="select-form" name="" id="">
                                        <option value="10">研究生</option>
                                        <option value="20">大学</option>
                                        <option value="30">大专</option>
                                        <option value="40">中等专业学校或中等技术学校</option>
                                        <option value="50">技术学校</option>
                                        <option value="60">高中</option>
                                        <option value="70">初中</option>
                                        <option value="80">小学</option>
                                        <option value="90">文盲或半文盲</option>
                                        <option value="99">未知</option>
                                    </select>
                                    <i class="select-ico"></i>
                                </div>
                                <div class="error" v-if="isError.educational">请选择学历</div>
                            </div>
                        </div>
                    </div>
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">在职时长</label>
                                <div class="select-module">
                                    <select v-model="form.workTime" class="select-form" name="" id="">
                                        <option value="0">0-0.5年</option>
                                        <option value="6">0.5-1年</option>
                                        <option value="12">1-2年</option>
                                        <option value="24">2年以上</option>
                                    </select>
                                    <i class="select-ico"></i>
                                </div>
                                <div class="error" v-if="isError.workTime">请选择在职时长</div>
                            </div>
                        </div>
                    </div>
                    <div class="credit-item mt25">
                        <div class="item-inner">
                            <div class="">
                                <label for="" class="lab">贷款用途</label>
                                <div class="select-module">
                                    <select v-model="form.loanUse" class="select-form" name="loanUse" id="">
                                        <option value="01">日常消费</option>
                                        <option value="02">租房</option>
                                        <option value="03">购买电子产品</option>
                                        <option value="04">购买家具</option>
                                        <option value="05">旅游</option>
                                        <option value="06">装修</option>
                                        <option value="07">个人购车</option>
                                        <option value="08">其他个人消费</option>
                                    </select>
                                    <i class="select-ico"></i>
                                </div>
                                <div class="error" v-if="isError.loanUse">请选择贷款用途</div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="choose-btn mt50 mb20">
                    <a href="javascript:;" class="btn btn-normal" @click="toNextFn">确定</a>
                </div>
            </div>
        </div>


    </section>
	</div>
</template>

<script>
import headerCom from '../header'
import { mapGetters } from 'vuex'
export default {
	name: 'creditStepTwo',
	components: { headerCom },
    data() {
        return {
            isError: {
                name: false,
                phone: false,
                educational: false,
                idCardNumber: false,
                loanUse: false,
                workTime: false,
                unitName: false,
                spouseName: false,
                spouseIdCard: false
            }
        }
    },
	computed: mapGetters({
		form: 'formDateObj'
	}),
    methods: {
        isMarried() {
            if(this.form.maritalStatus == 'MARRIED'){
                this.married = true;
                this.$store.dispatch('change_marry_status', true);
            } else {
                this.married = false;
                this.$store.dispatch('change_marry_status', false)
            }
        },
        toNextFn() {
            let obj = this.form;
            let isSubmit = this.checkFn(obj);
            if(isSubmit) this.$router.push('creditStepThr')
        },
        checkFn(obj) {
            let isSubmit = true;
            for (name in obj) {
                if (name == 'token') continue // 这里有 bug
               if(obj[name]) {
                    this.isError[name] = false;
                    if((name == 'idCardNumber' || name=="spouseIdCard") && obj[name].length !== 15 && obj[name].length !== 18 ) {
                       this.isError[name] = true;
                       isSubmit = false;
                    } 
                    if(name =="phone" && obj[name].length !== 11){
                        this.isError[name] = true;
                        isSubmit = false;
                    } 
               } else {
                if(name != 'bankCardNumber' && name != 'email'){
                    if(obj.maritalStatus == 'UNMARRIED' && name != 'spouseIdCard' && name != 'spouseName'){
                        this.isError[name] = true;
                        isSubmit = false;
                    } else if(obj.maritalStatus != 'UNMARRIED') {
                        this.isError[name] = true;
                        isSubmit = false;
                    }
                }    
               }
            }
            return isSubmit;
        }
    },
    watch: {
        form: {
            handler(newobj, oldobj) {
                for(name in newobj) {
                    if(newobj[name]) {
                        this.isError[name] = false
                    }
                }
            },
            deep: true
        }
    }
}
</script>