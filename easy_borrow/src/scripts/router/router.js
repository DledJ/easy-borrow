

import container from '../component/container'

export default [{
	path: '/',
	component: container,
	children: [{
		path: '',
		name:'cash-home',
		meta: {title: '现金贷'},
		component: r => require.ensure([], () => r(require('../component/cash-home')), 'cash-home')
	}, {
		path: 'borrowInfo',
		name: 'borrowInfo',
		meta: { title: '员工随借随还'},
		component: r => require.ensure([], () => r(require('../component/borrowInfo')), 'borrowInfo')
	}, {
		path: 'userInfo',
		name: 'userInfo',
		meta: { title: '个人信息'},
		component: r => require.ensure([], () => r(require('../component/userInfo')), 'userInfo')
	}, {
		path: 'creditStepOne',
		name: 'creditStepOne',
		meta: { title: '授信上传身份证'},
		component: r => require.ensure([], () => r(require('../component/creditStepOne')), 'creditStepOne')
	}, {
		path: 'creditStepTwo',
		name: 'creditStepTwo',
		meta: { title: '个人基本资料'},
		component: r => require.ensure([], () => r(require('../component/creditStepTwo')), 'creditStepTwo')
	}, {
		path: 'creditStepThr',
		name: 'creditStepThr',
		meta: { title: '选择银行卡'},
		component: r => require.ensure([], () => r(require('../component/creditStepThr')), 'creditStepThr')
	}, {
		path: 'creditResult',
		name: 'creditResult',
		meta: { title: '授信结果页'},
		component: r => require.ensure([], () => r(require('../component/creditResult')), 'creditResult')
	}, {
		path: 'creditRecord',
		name: 'creditRecord',
		meta: { title: '授信记录'},
		component: r => require.ensure([], () => r(require('../component/creditRecord')), 'creditRecord')
	}, {
		path: 'repayRecord',
		name: 'repayRecord',
		meta: {title: '还款记录'},
		component: r => require.ensure([], () => r(require('../component/repayRecord')), 'repayRecord')
	}, {
		path: 'borrowRecord',
		name: 'borrowRecord',
		meta: {title: '历史借款记录'},
		component: r => require.ensure([], () => r(require('../component/borrowRecord')), 'borrowRecord')
	}, {
		path: 'repayHome',
		name: 'repayHome',
		meta: {title: '还款'},
		component: r => require.ensure([], () => r(require('../component/repayHome')), 'repayHome')
	}, {
		path: 'borrowHome',
		name: 'borrowHome',
		meta: {title: '借款'},
		component: r => require.ensure([], () => r(require('../component/borrowHome')), 'borrowHome')
	}, {
		path: 'borrowNext',
		name: 'borrowNext',
		meta: {title: '借款'},
		component: r => require.ensure([], () => r(require('../component/borrowNext')), 'borrowNext')
	}, {
		path: 'borrowSuccess',
		name: 'borrowSuccess',
		meta: {title: '借款'},
		component: r => require.ensure([], () => r(require('../component/borrowSuccess')), 'borrowSuccess')
	}, {
		path: 'productView',
		name: 'productView',
		meta: {title: '产品介绍'},
		component: r => require.ensure([], () => r(require('../component/productView')), 'productView')
	}, {
		path: 'provMail',
		name: 'provMail',
		meta: {title: '验证企业邮箱'},
		component: r => require.ensure([], () => r(require('../component/provMail')), 'provMail')
	}, {
		path: 'repaySuccess',
		name: 'repaySuccess',
		meta: {title: '还款成功页'},
		component: r => require.ensure([], () => r(require('../component/repaySuccess')), 'repaySuccess')
	},{
        path: 'errorRecord',
        name: 'errorRecord',
        meta: {title: '没有权限'},
        component: r => require.ensure([], () => r(require('../component/errorRecord')), 'errorRecord')
	}]
}]