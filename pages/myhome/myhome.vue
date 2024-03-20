<template>
	<view>
		<view class="bigImg">
			<image src="/static/images/userbg.png" mode=""></image>
			<view class="user">
				<image src="/static/logo.png" mode="widthFix"></image>
				<view class="username">
					user
				</view>
			</view>
			<!-- 流程 -->
			<view class="lc">
				<cc-cell value="查看全部订单" @click="mydd">
					<template #title>
						<text class="custom-title">我的订单</text>
					</template>
				</cc-cell>
				<view class="gc">
					<view class="gcson">
						<image src="/static/images/ico7.png" mode=""></image>
						<text>代付款</text>
					</view>
					<view class="gcson">
						<image src="/static/images/status.png" mode=""></image>
						<text>待发货</text>
					</view>
					<view class="gcson">
						<image src="/static/images/status2.png" mode=""></image>
						<text>待收货</text>
					</view>
					<view class="gcson">
						<image src="/static/images/ico5.png" mode=""></image>
						<text>退款/售后</text>
					</view>
				</view>
				<cc-cell title="积分半对换" isLink></cc-cell>
				<cc-cell title="收货地址" isLink @click="shdz"></cc-cell>
				<cc-cell title="在线客服" isLink></cc-cell>
				<cc-cell value="dian1">
					<template #title>
						<text class="custom-title">客服热线</text>
					</template>
				</cc-cell>
				<cc-cell title="关于我们" isLink></cc-cell>
				<button type="warn" @click="qxlogin" style="margin-top: 60rpx;">退出登录</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			shdz() {
				uni.navigateTo({
					url: '/pages/shdz/shdz'
				})
			},
			qxlogin() {
				uni.setStorageSync('user', '')
				uni.setStorageSync('userinfo', '')
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				})
			},
			mydd() {
				uni.navigateTo({
					url: '/pages/mydd/mydd'
				})
			}
		},
		onLoad() {

		},
		onShow() {
			if (uni.getStorageSync('user') == '') {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	.bigImg {
		position: relative;
		width: 100%;
		height: 550rpx;
	}

	.bigImg image {
		width: 100%;
		height: 100%;
	}

	.user {
		position: absolute;
		left: 50%;
		top: 52rpx;
		display: flex;
		flex-direction: column;
		transform: translateX(-50%);
		align-items: center;
	}

	.user image {
		width: 265rpx;
		height: 268rpx;
		border-radius: 50%;
	}

	.username {
		margin-top: 26rpx;
		font-weight: 500;
		font-size: 46rpx;
		color: #ffffff;
	}

	.lc {
		position: absolute;
		background-color: #fff;
		left: 0;
		top: 80%;
		width: 94%;
		height: 100%;
		margin: 0 24rpx;
		box-sizing: border-box;
	}

	.gc {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 50rpx;
		margin: 15rpx;
	}

	.gcson {
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: 28rpx
	}

	.gcson image {
		width: 50rpx;
		height: 55rpx;
		margin: 10rpx;
	}
</style>