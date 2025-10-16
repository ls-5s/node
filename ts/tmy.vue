<template>
    <view class="my-container">
        <!-- 添加顶部安全区域 -->
        <view class="safe-area-top"></view>
        <!-- 顶部用户信息区域 -->
        <view class="user-info-section">
            <view class="user-card">
                <view class="avatar">
                    <text class="iconfont icon-logo">&#xe6a0;</text>
                    <!-- <image src="/static/images/logo.png" mode="aspectFit"></image> -->
                </view>
                <view class="user-details">
                    <text class="user-id">18108118507</text>
                    <text class="user-role">{{ userInfo.role_name }}</text>
                </view>
            </view>
            <text class="description">
                万物互联的时代，德姆云物联解决了多元异构物联网设备的接入与管理，给用户提供完整的支撑服务体系。
            </text>
        </view>

        <!-- 功能列表区域 -->
        <view class="menu-list">
            <!-- 第一组菜单 -->
            <view class="menu-group">
                <view class="menu-item" @click="handleMenuClick('official')">
                    <view class="menu-item-left">
                        <text class="iconfont icon-home">&#xe644;</text>
                        <text class="menu-text">德姆云官网</text>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
                <view class="menu-item" @click="handleMenuClick('open')">
                    <view class="menu-item-left">
                        <text class="iconfont icon-open">&#xe801;</text>
                        <text class="menu-text">德姆云官网</text>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
                <view class="menu-item" @click="handleMenuClick('help')">
                    <view class="menu-item-left">
                        <text class="iconfont icon-help">&#xe6a5;</text>
                        <text class="menu-text">帮助中心</text>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
            </view>

            <!-- 第二组菜单 -->
            <view class="menu-group">
                <view class="menu-item ">
                    <view class=" menu-item-left">
                        <text class="iconfont icon-share">&#xe630;</text>
                        <button open-type="share" class="menu-text-1">分享小程序</button>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
                <!--  <view class="menu-item" @click="handleMenuClick('feedback')">
          <view class="menu-item-left">
            <text class="iconfont icon-feedback">&#xe645;</text>
            <text class="menu-text">问题反馈</text>
          </view>
          <text class="iconfont icon-right">&#xe7e7;</text>
        </view> -->
                <view class="menu-item" @click="handleMenuClick('about')">
                    <view class="menu-item-left">
                        <text class="iconfont icon-about">&#xe7f4;</text>
                        <text class="menu-text">关于我们</text>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
            </view>

            <!-- 第三组菜单 -->
            <view class="menu-group">
                <view class="menu-item" @click="handleMenuClick('password')">
                    <view class="menu-item-left">
                        <text class="iconfont icon-password">&#xe601;</text>
                        <text class="menu-text">修改密码</text>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
                <view class="menu-item" @click="handleMenuClick('logOut')" v-if="checkLogin()">
                    <view class="menu-item-left">
                        <text class="iconfont icon-switch">&#xe628;</text>
                        <text class="menu-text">退出登录</text>
                    </view>
                    <text class="iconfont icon-right">&#xe7e7;</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// 用传统export default定义页面配置（兼容旧版本）
export default {
    onShareAppMessage() {
        return {
            title: '德姆云',
            path: '/pages/index/index', // 不带.vue后缀
            imageUrl: '/static/img/home/banner/banner1.png',
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
<script setup>
import {
    computed
} from "vue";
import {
    checkLogin,
    logOut
} from "@/utils/utils";
// const show = false
const userInfo = computed(() => {
    return uni.getStorageSync("userInfo");
});

const handleMenuClick = (type) => {
    // 处理菜单点击事件
    switch (type) {
        case "official":
            break;
        case "open":
            break;
        case "logOut":
            handleLogOut();
            break;
        // ... 其他菜单项的处理逻辑
    }
};

const handleLogOut = () => {
    uni.showModal({
        title: "提示",
        content: "确定要退出登录吗",
        success: function (res) {
            if (res.confirm) {
                logOut();
            }
        },
    });
};
</script>

<style lang="scss" scoped>
// 定义变量
$primary-color: #4080ff;
$bg-color: #f5f5f5;
$text-color: #333;
$text-light: #999;
$white: #fff;

.my-container {
    min-height: 100vh;
    background-color: $bg-color;

    .safe-area-top {
        width: 100%;
        height: var(--status-bar-height);
        padding-top: 44px;
        background-color: $primary-color;
    }

    .user-info-section {
        background-color: $primary-color;
        padding: 40rpx;
        color: $white;

        .user-card {
            display: flex;
            align-items: center;
            margin-bottom: 30rpx;

            .avatar {
                width: 120rpx;
                height: 120rpx;
                margin-right: 30rpx;

                .iconfont {
                    font-size: 120rpx;
                }

                image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .user-details {
                display: flex;
                flex-direction: column;

                .user-id {
                    font-size: 40rpx;
                    font-weight: bold;
                    margin-bottom: 10rpx;
                }

                .user-role {
                    font-size: 28rpx;
                    opacity: 0.8;
                }
            }
        }

        .description {
            font-size: 28rpx;
            line-height: 1.5;
            opacity: 0.9;
        }
    }

    .menu-group {
        background-color: $white;
        margin: 30rpx 24rpx;
        border-radius: 20rpx;

        .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30rpx 40rpx;
            border-bottom: 1px solid $bg-color;

            &:last-child {
                border-bottom: none;
            }

            .menu-item-left {
                display: flex;
                align-items: center;

                .iconfont {
                    font-size: 40rpx;
                    margin-right: 20rpx;
                    color: #000;
                }

                .menu-text-1 {
                    /* 基础样式清除 */
                    border: none;
                    margin: 0;
                    padding: 0;
                    background-color: transparent;
                    color: #000;
                    /* 清除按钮点击时的阴影效果 */
                    box-shadow: none;
                    /* 清除按钮的默认最小宽度 */
                    min-width: auto;
                    font-size: 32rpx;
                    color: $text-color;

                    /* 关键：去掉按钮默认高度，由内容/父元素决定高度 */
                    height: auto;
                    /* 清除按钮可能的默认行高影响 */
                    line-height: normal;
                    /* 确保按钮不继承额外高度样式 */
                    min-height: auto;
                }

                /* 伪元素样式也同步关联到新类名 */
                .menu-text-1::after {
                    border: none !important;
                }

                .menu-text {
                    font-size: 32rpx;
                    color: $text-color;
                }
            }

            .icon-right {
                color: #c4c4c4;
                font-size: 32rpx;
            }
        }
    }
}
</style>