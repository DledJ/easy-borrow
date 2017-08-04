/**
* cash-home.html的入口文件
* author 菡萏  handan@yiji.com
* update 20170624
*/


import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/router';
import VueResource from 'vue-resource';
import setTitle from './setTitle';
import store from './store';
import AutoFocus from 'vue-auto-focus';
import VueForm from 'vue-form';


Vue.use(AutoFocus);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueForm);

var _csrf = (/_csrf=[^;]+;?/i).exec(document.cookie);

if(_csrf) {
    _csrf = _csrf[0].replace('_csrf=', '').replace(';', '');
}

Vue.http.headers.common['X-CSRF-TOKEN'] =_csrf;

const router = new VueRouter({
	routes
})

router.afterEach((t) => {
  let title = t.meta.title;
  setTitle(title)
})

const cash = new Vue({
	el: '#cash',
	router,
	store
})