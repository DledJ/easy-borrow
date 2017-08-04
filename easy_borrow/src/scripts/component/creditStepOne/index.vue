
<template>
	<div>
	<headerCom titleTxt="授信" backurl="provMail"></headerCom>
	<section class="mb20">
        <div class="credit-form">
            <div class="credit-title">上传身份证照片</div>
            <div class="upload-module mt25">
                <div class="upload-inner">
                    <div class="upload-bg" @click="toFrontUpload">
                        <div class="upload-img"><img :src="this.$store.state.pic1" alt=""></div>
                    </div>
                    <div class="upload-txt" @click="toFrontUpload">{{this.$store.state.frontTxt}}</div>
                    <input class="fn-hide" type="file" name="frontPic" accept="image/*" ref="frontPic" @change="onUpload($event, 'pic1')" >
                    <div class="error" v-show="isFront">{{frontMsg}}</div>
                </div>
                <div class="upload-inner">
                    <div class="upload-bg" @click="toBackUpload">
                        <div class="upload-img"><img :src="this.$store.state.pic2" alt=""></div>
                    </div>
                    <div class="upload-txt" @click="toBackUpload">{{this.$store.state.backTxt}}</div>
                    <input class="fn-hide" type="file" name="backPic" accept="image/*" ref="backPic" @change="onUpload($event, 'pic2')" >
                    <div class="error" v-show="isBack">{{backMsg}}</div>
                </div>
            </div>
            <div class="ft-999 mt25 ft-size13">说明： 请保证上传的身份证图片清晰可辨</div>
            <div class="choose-btn mt50">
                <a href="javascript:;" class="btn btn-normal" @click="toNextFn">确定</a>
            </div>
        </div>

    </section>
	</div>
</template>

<script>
import headerCom from '../header'
export default {
	name: 'creditStepOne',
	components: { headerCom }, 
	data() {
		return {
			isBack: false,
			isFront: false,
			frontMsg: '请上传身份证正面照',
			backMsg: '请上传身份证反面照',
		}
	},
	methods: {
		toFrontUpload() {
			this.$refs.frontPic.click();
			this.isFront = false;
		},
		toBackUpload() {
			this.$refs.backPic.click();
			this.isBack = false;
		},
		onUpload(e, pic) {
			let formData = new FormData(); 
	        formData.append('file', e.target.files[0]);
	        formData.append('file', 'test');
	        this.$http.post('/casual/credit/uploadFile.json', formData).then(res => {
	        	let url = res.body.url;
	        	this.$store.state[pic] = url;
	        	if(pic == 'pic1'){
	        		this.$store.dispatch('query_url', {picname: pic,picurl: 'idCardPhotoFace', txtname: 'frontTxt', url: url })
	        	} else {
	        		this.$store.dispatch('query_url', {picname: pic,picurl: 'idCardPhotoCon', txtname: 'backTxt', url: url })
	        	}
	        }, err => {
	           
	        })
		},
		toNextFn() {
			if(!this.$store.state.formDateObj.idCardPhotoFace) {
				this.isFront = true;
				return;
			}
			if(!this.$store.state.formDateObj.idCardPhotoCon) {
				this.isBack = true;
				return;
			}
			this.$router.push('creditStepTwo');
		}
	}
}
</script>

<style>
	
</style>