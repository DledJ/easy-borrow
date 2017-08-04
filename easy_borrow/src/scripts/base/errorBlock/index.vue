<template>
    <div>
        <!--您没有还款金额-->
        <div class="error"  v-show="showMessage">
            {{message}}
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        props: {
            showMessage: Boolean ,//这样可以指定传入的类型，如果类型不对，会警告
            message: String //这样可以指定传入的类型，如果类型不对，会警告
        }
    }
</script>

<style scoped rel="stylesheet">
    .error {
        position: fixed;
        left: 20px;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 10px;
        font-size: 16px;
        text-align: center;
        color: #fff;
        background: #333;
        opacity: .7;
        padding: 27px 0px;
    }
</style>