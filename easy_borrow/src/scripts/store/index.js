
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'


Vue.use(Vuex);

const state = {
	pic1: require('../../images/upload-pic1.jpg'),
	pic2: require('../../images/upload-pic2.jpg'),
	frontTxt: '上传身份证正面',
	backTxt: '上传身份证反面',
	married: false,
	formDateObj: {
		name: '',
		idCardNumber: '',
		idCardPhotoFace: '',
		idCardPhotoCon: '',
		bankCardNumber: '',
		phone: '',
		maritalStatus: 'UNMARRIED',
		spouseName: '',
		spouseIdCard: '',
		educational: '',
		workTime: '',
		loanUse: '',
		unitName: '',
		email:''
	},
	borrowData: {
		borrowMoney:''
	},
	error:false,
	token: ''
}
const getters = {
	formDateObj: state => state.formDateObj,
	borrowData: state => state.borrowData,
	error:state=>state.error,
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})