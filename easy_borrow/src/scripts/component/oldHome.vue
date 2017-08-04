
<template>
	<div>
    <headerCom titleTxt="" backurl="/"></headerCom>
    <section>
        <!-- banner -->
    	<div class="banner-list">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide class="swiper-item"  v-for="banner in banners">
                  <img :src="banner" @click="gotoDetail">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
    	</div>
    	<!-- 授信后 -->
    	<div class="index-main" v-if="isLogin">
    		<div class="index-module1">
    			<div class="module-innner">
    				<a href="javascript:;" @click="toProduct">
	    				<i class="inner-ico inner-ico1"><img :src="module1" alt=""></i>
	    				<div class="inner-txt ft-333">员工随手借</div>
    				</a>
    			</div>
    			<div class="module-innner module-default">
    				<a href="javascript:;">
	    				<i class="inner-ico inner-ico2"><img :src="module2" alt=""></i>
	    				<div class="inner-txt ft-bbb">虚拟信用卡</div>
    				</a>
    			</div>
    		</div>
    		<div class="index-module2">
    			<div class="module2-item">
    				<div class="module2-innner">
    					<div class="inner-label">个人信息</div>
    					<div class="">{{hideRealName}}</div>
    				</div>
    				<div class="module2-innner">
    					<router-link to="userInfo" class="right-btn">查看<i class="right-bar"></i></router-link>
    				</div>
    			</div>
    			<div class="module2-item mt25" v-for="item in creditRec" v-if="item.status != 'SUCCESS'">
    				<div class="module2-innner">
    					<div class="inner-label">我的授信</div>
    					<div class="">{{item.productName}}</div>
    				</div>
    				<div class="module2-innner">
    					<a href="javascript:;" class="right-btn" @click="toResult(item.productNo)">{{status[item.status]}}<i class="right-bar"></i></a>
    				</div>
    			</div>
    		</div>
    	</div>

    	<!-- 授信前 -->
    	<div class="index-main" v-if="!isLogin">
    		<div class="index-module3 mt25">
    			<div class="module3-inner1">
    				<router-link tag="div" to="productView" class="fn-tac">
    					<i class="inner-ico inner-ico1"><img :src="module1" alt=""></i>
    					<div class="inner-txt">员工随手借</div>
    				</router-link>
    				<div class="inner-line"></div>
    			</div>
    			<div class="module3-inner2">
    				<div class="">
    					<div class="innner2-title ft-333">最高可借<em class="ft-red">5000</em></div>
    					<div class="module-info">
    						<div class="info">
    							<i class="info-ico info-ico1"></i>
    							<div class="">超低费率</div>
    						</div>
    						<div class="info">
    							<i class="info-ico info-ico2"></i>
    							<div class="">仅限员工</div>
    						</div>
    						<div class="info">
    							<i class="info-ico info-ico3"></i>
    							<div class="">随借随还</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    		<div class="index-module3 mt25 module3-default">
    			<div class="module3-inner1">
    				<div class="fn-tac">
    					<i class="inner-ico inner-ico2"><img :src="module2" alt=""></i>
    					<div class="inner-txt">虚拟信用卡</div>
    				</div>
    				<div class="inner-line"></div>
    			</div>
    			<div class="module3-inner2">
    				<div class="">
    					<div class="innner2-title ft-999">在线急速申请</div>
    					<div class="innner2-title2">暂未开放</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>


	</div>
</template>

<script>
import headerCom from '../header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        headerCom,
        swiper,
        swiperSlide
    },
    data() {
        return {
            banners:[require('../../../images/banner-pic1.jpg'),require('../../../images/banner-pic1.jpg'),require('../../../images/banner-pic1.jpg')],
            module1: require('../../../images/module1-ico.png'),
            module2: require('../../../images/module2-ico.png'),
            swiperOption: {
              pagination: '.swiper-pagination',
              slidesPerView: 1,
              paginationClickable: true,
              loop: true,
              autoplay: 3000,
              mousewheelControl : true,
              autoplayDisableOnInteraction: false
            },
            isLogin: false,
            userId: '',
            partnerId: '',
            creditRec: [],
            realName: '',
            creditStatus: '',
            status: {
                'SUCCESS': '成功',
                'FAIL': '授信失败',
                'INIT': '授信申请中'
            }
        }
    },
    created() {
        this.userId = this.$route.query.userId;
        this.partnerId = this.$route.query.partnerId;
        if(this.userId == undefined){
            this.userId = '';
        }
        if(this.partnerId == undefined){
            this.partnerId = '';
        }
        let that = this;
        that.$http.post('/casual/login/checkIsLogin.json', {pUserId: that.userId,partnerId: that.partnerId}, {emulateJSON: true}).then(res => {
            if(res.body.success) {
                that.isLogin = res.body.data.isLogin;
                if(that.isLogin) {
                    that.$http.post('/casual/userInfo/getUserInfo.json', {pUserId: that.userId,partnerId:that.partnerId}, {emulateJSON: true}).then(res => {
                        if(res.body.success) {
                           let name = res.body.data.realName;
                           that.realName = name;
                        }
                    })
                    that.$http.post('/casual/userInfo/getCreditRec.json', {type: 'ALL',pUserId: that.userId,partnerId:that.partnerId}, {emulateJSON: true}).then(function(res) {
                        if(res.body.success) {
                            that.creditRec = res.body.data.creditRec;
                        }
                    })
                }
            }
        });
    },
    methods: {
        gotoDetail() {
            //console.log(this.$refs.mySwiper.swiper.activeIndex)
            //localStorage.setItem("userId", this.userId);
            this.$router.push({ path: 'productView', query: { userId: this.userId, partnerId: this.partnerId }})
        },
        toProduct() {
            let obj = this.creditRec;
            for(name in obj) {
                if(obj[name].productNo == '33' && obj[name].status == 'SUCCESS') {
                    this.creditStatus = 1;
                } else if(obj[name].productNo == '33' && obj[name].status == 'INIT'){
                    this.creditStatus = 2;
                } else if(obj[name].productNo == '33'){
                    this.creditStatus = 3;
                }
            }
            if(this.creditStatus == 1) {
                 this.$router.push('borrowInfo')
             } else if(this.creditStatus == 3){
                 this.$router.push('productView')
             } else {
                this.$router.push('creditResult')
             }
        },
        toResult(no) {
            if(no == '33') this.$router.push({path: "creditResult", query: {name: this.realName}})
            
        }
    },
    computed: {
        hideRealName() {
            let nameFirst = this.realName.substr(0, 1);
            let end = new Array(this.realName.length).join('*');
            return nameFirst + end;
        }
    }
}
</script>

<style>
.swiper-pagination-bullet { background: #fff; opacity: 0.6; }
.swiper-pagination-bullet-active { background: rgba(13,13,13,0.6) }
.swiper-container-horizontal > .swiper-pagination-bullets { bottom: 1rem; }
</style>