<template>
	<div>
		<header class="">
	        <a class="back" href="javascript:;" @click="backHome"><img class="back-ico" :src="picPath" alt="" />返回</a><h2 class="title"></h2>
	    </header>
		<section class="">
	        <div class="product-main">
	            <div class=""><img :src="pic1" alt=""></div>
	            <div class=""><img :src="pic2" alt=""></div>
	            <div class=""><img :src="pic3" alt=""></div>
	            <div class=""><img :src="pic4" alt=""></div>
	            <div class="product-module5">
	                <img :src="pic5" alt="">
	                <div class="choose-btn product-btn" v-if="!isCreadit">
	                    <div class="product-pd"><a href="javascript:;" class="pro-btn" @click="applyFn"><img :src="pic" alt=""></a></div>
	                </div>
	            </div>
	        </div>
	    </section>

	        <!-- 是否登录 -->
		<div class="layer-bg" v-show="!isLogin">
			<div class="layer">
				<div class="layer-main border-b">
					<div class="fn-tac layer-title">您还未登录金融超市，需要先登录才能进行相关操作。</div>
				</div>
				<div class="layer-btn">
					<div class="btn-inner">
						<a href="javascript:;" class="btn-default" @click="cancel">取消</a>
					</div>
					<div class="btn-inner">
						<a href="javascript:;" class="btn-primary" @click="gotoLogin">去登录</a>
					</div>
				</div>
			</div>
		</div>
    </div>
	</div>
</template>

<script>
import headerCom from '../header'

export default {
	name: 'productView',
	components: {
		headerCom
	},
	data() {
		return {
			picPath:require('../../../images/back-ico.png'),
			pic1:require('../../../images/product-pic1.jpg'),
			pic2:require('../../../images/product-pic2_2.jpg'),
			pic3:require('../../../images/product-pic3_2.jpg'),
			pic4:require('../../../images/product-pic4.png'),
			pic5:require('../../../images/product-pic5.png'),
			pic:require('../../../images/product-btn.png'),
			isLogin: true,
            pUserId: '',
			partnerId: '',
			appLoginUrl: '',
			creditStatus:'',
			creditRec: [],
			bankCardInfo: [],
			isCreadit: false,
			appHomeUrl: ''
		}
	},
	methods: {
		applyFn() {
			this.$http.post('/casual/login/checkIsLogin.json',{pUserId: this.pUserId, partnerId:this.partnerId}, {emulateJSON: true}).then(res => {
	        	if(res.body.success) {
					this.isLogin = res.body.data.isLogin;
					if(this.isLogin) {
			             this.$router.push('provMail');
				} else {
					this.appLoginUrl = res.body.data.appLoginUrl;
				}
			} 
		})

		},
		cancel() {
			this.isLogin = true;
		},
		gotoLogin() {
			window.location.href = this.appLoginUrl;
		},
		backHome() {
			if(!this.isCreadit){
                if (this.appHomeUrl) {
                    window.location.href = this.appHomeUrl;
                } else {
                    return;
                }
			}else{
                this.$router.push('/');
			}
		}
	},
	created() {
		this.isCreadit = this.$route.query.isCreadit;

        this.pUserId = this.$route.query.userId;
        this.partnerId = this.$route.query.partnerId;

        if ((this.pUserId != 'undefined' && this.partnerId != 'undefined') && (this.pUserId != null && this.partnerId != null)) {
            localStorage.setItem('partnerId', this.partnerId);
            localStorage.setItem('userId', this.pUserId);
        } else {
            this.pUserId = localStorage.getItem('userId');
            this.partnerId = localStorage.getItem('partnerId');
        }


        this.appHomeUrl = localStorage.getItem('appHomeUrl');
        if(this.userId == undefined){
            this.userId = null;
        }
        if(this.partnerId == undefined){
            this.partnerId = null;
        }
        if(!this.appHomeUrl) {
	        this.$http.post('/casual/login/getPartnerHome.json', {}, {emulateJSON: true}).then(res => {
	        	if(res.body.success) {
	        		this.appHomeUrl = res.body.data.appHomeUrl;
	        		localStorage.setItem('appHomeUrl', this.appHomeUrl);
	        	}
	        })
        }
	}
}
</script>