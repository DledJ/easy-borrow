<template>
	<header class="">
        <router-link class="back" :to="backurl"><img class="back-ico" :src="picPath" alt="" />返回</router-link><h2 class="title"></h2>
    </header>
</template>

<script>
export default {
	name: 'headerCom',
	props: ['backurl'],
	data() {
		return {
			picPath: require('../../../images/back-ico.png')
		}
	}
}
</script>

<style>
	
</style>