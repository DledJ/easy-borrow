<template>
    <div class="bottom-bar border-t">
        <div class="bar">
            <div class="bottom-btn">
                <a href="javascript:" @click="borrowHome" :class="{'btn-default':showStyle}">借款<i class="line-ico"></i></a>
            </div>
            <div class="bottom-btn">
                <a href="javascript:" @click="repayHome" :class="{'btn-primary':showStyle}">还款</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:['error'],

        data(){
            return {
                showStyle:true
            }
        },

        methods: {
            borrowHome(){
                if(!this.error){
                    this.$router.push('borrowHome')
                }
            },
            repayHome(){
                if(!this.error){
                    this.$router.push('repayHome')
                }
            }
        },

        created(){
            if(this.error){
                this.showStyle=false;
            }else{
                this.showStyle=true
            }
        }
    }
</script>

<style>

</style>