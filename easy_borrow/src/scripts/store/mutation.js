
const QUERY_URL = "QUERY_URL";
const CHANGE_MARRY_STATUS = "CHANGE_MARRY_STATUS";
const CLEAR_DATA = "CLEAR_DATA";

const ERROR='ERROR';

export default {
	[QUERY_URL](state, payload) {
		state[payload.picname] = payload.url;
		state.formDateObj[payload.picurl] = payload.url;
		state[payload.txtname] = '重新上传';
	},

	[CHANGE_MARRY_STATUS](state, payload) {
		state.married = payload.married
	},

	[CLEAR_DATA](state) {
		state.formDateObj = {
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
		}
		state.pic1 = require('../../images/upload-pic1.jpg');
		state.pic2 = require('../../images/upload-pic2.jpg');
		state.frontTxt = '上传身份证正面';
	    state.backTxt = '上传身份证反面';
	},

	[ERROR](state,error){
		this.state=error
	}
}