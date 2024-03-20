<template>
	<view>
		<view class="logo">
			<image src="../../static/images/log.png" mode="" />
		</view>
		<view class="dlfs">
			<view @click="tive" data-index="0" :class="[active == 0 ?'active':'']">
				会员登录
			</view>
			<view @click="tive" data-index="1" :class="[active == 1 ?'active':'']">
				会员注册
			</view>
		</view>

		<view class="denlu" v-show="active ==  0">
			<view class="number">
				<text style="margin-right: 24rpx;">手机号码</text>
				<text class="numberxia">
					+86
				</text>
				<input type="number" v-model="mobile" maxlength="11" placeholder-style="color:#c9c9c9;"
					placeholder="请输入手机号码" />
			</view>
			<view class="code">
				<view
					style="display: flex;width: 388rpx;justify-content: space-between;border-bottom: #c9c9c9 1rpx solid;padding-bottom: 16rpx;">
					<text style="display: inline-block;width: 145rpx;">验证码</text>
					<input type="number" v-model="captcha" maxlength="4" placeholder-style="color:#c9c9c9;"
						placeholder="请输入验证码" />
				</view>
				<view class="yz">
					获取验证码
				</view>
			</view>
			<button class="button" @click="login">
				登录
			</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				mobile: '',
				captcha: '',
				code: ''
			}
		},
		onLoad() {
			wx.login({
				success: (res) => {
					if (res.code) {
						this.code = res.code
					}
				}
			})
		},
		methods: {
			tive(e) {
				this.active = e.currentTarget.dataset.index
			},
			async login() {
				if (this.code != '') {
					if (this.mobile == '' || this.captcha == '') {
						uni.showToast({
							title: '输入框不能为空',
							icon: 'error'
						})
					} else {
						if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
							console.log(this.mobile);
							uni.showToast({
								title: '手机号码有误，请重填',
								icon: 'error'
							})
							return false;
						} else if (!(/^\d{4}$/.test(this.captcha))) {
							uni.showToast({
								title: '验证码四位',
								icon: 'error'
							})
							return false;
						} else {
							let res = await uni.$http.post('/user/login', {
								captcha: this.captcha,
								mobile: this.mobile,
								country_code: 86,
								code: this.code
							})
							console.log(res);
							if (res && res.data.data) {
								uni.setStorageSync('user', res.data.data.access_token)
								uni.setStorageSync('userinfo', res.data.data.user_info)
								uni.switchTab({
									url: '/pages/myhome/myhome'
								})
							}

						}
					}

				} else {
					uni.showToast({
						title: '用户code没有获取到'
					})
				}
			}
		},
	}
</script>

<style>
	.logo {
		height: 155rpx;
		width: 170rpx;
		margin: 0 auto;
		margin-top: 80rpx;
	}

	.logo image {
		width: 100%;
		height: 100%;
	}

	.dlfs {
		display: flex;
		justify-content: space-evenly;
	}

	.dlfs view {
		width: 200rpx;
		text-align: center;
		padding-bottom: 12rpx;
		font-size: 30rpx;
		margin-top: 55rpx;
	}

	.dlfs .active {
		color: #bfbfbf;
		border-bottom: 1rpx solid #000000;
	}

	.number {
		width: 615rpx;
		margin: 0 auto;
		display: flex;
		font-size: 26.67rpx;
		/* justify-content:space-between; */
		border-bottom: solid 1rpx #d5d5d5;
		padding-bottom: 16rpx;
		margin-top: 108rpx;
	}

	.code {
		width: 615rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		margin-top: 60rpx;
		font-size: 26.67rpx;
	}

	.code .yz {
		width: 215rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border: 1rpx solid #949494;
	}

	.button {
		width: 607rpx !important;
		height: 76rpx !important;
		background-color: #000000;
		color: #fff;
		margin: 0 auto;
		text-align: center;
		margin-top: 88rpx;
		font-size: 26.67rpx;
	}

	.number text {
		line-height: 40rpx;
	}

	.number .numberxia {
		color: #ccc;
		margin-right: 40rpx;
	}

	.number .numberxia .xia {
		transform: rotate(90deg);
	}
</style>