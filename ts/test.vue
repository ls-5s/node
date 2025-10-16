<template>
    <view class="container">
        <text>这是一个带分享功能的页面</text>
        <button class="share-btn" open-type="share">点击分享给好友</button>
    </view>
</template>

<script setup>
// 保持空的setup标签，用于Vue3的模板编译
</script>

<script>
// 用传统export default定义页面配置（兼容旧版本）
export default {
    onShareAppMessage() {
        return {
            title: '我发现了一个好东西，快来看看！',
            path: '/pages/index/index', // 不带.vue后缀
            imageUrl: '/static/logo.png',
            success(res) {
                console.log('分享成功', res)
                uni.showToast({
                    title: '分享成功',
                    icon: 'success'
                })
            },
            fail(res) {
                console.log('分享失败', res)
            }
        }
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx;
}

.share-btn {
    /* 基础样式清除 */
    border: none;
    margin: 0;
    padding: 0;
    background-color: transparent;
    color: #000;
    font-size: 14px;

    /* 清除按钮点击时的阴影效果 */
    box-shadow: none;

    /* 清除按钮的默认最小宽度 */
    min-width: auto;
}

/* 关键：清除伪元素的边框（小程序按钮的边框通常由伪元素实现） */
.share-btn::after {
    border: none !important;
}
</style>