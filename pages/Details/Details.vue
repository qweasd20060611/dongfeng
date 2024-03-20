<template>
	<view>
		<view class="bigImg">
			<swiper :indicator-dots="true" :autoplay="true" :interval="1500">
				<swiper-item v-for="(item,index) in Detail.photos" :key="index">
					<view class="swiper-item">
						<image :src="item" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="introduce">
			<view class="title">{{Detail.name}}</view>
			<view class="xlh">序列号 {{Detail.serial_number}}</view>
			<view class="xian"></view>
			<view class="money">￥{{Detail.price}}</view>
		</view>
		<!-- 商品注意事项 -->
		<view class="">
			<uni-section title="手风琴效果（只会保留一个的打开状态）" type="line">
				<uni-collapse accordion v-model="accordionVal" @change="change">
					<uni-collapse-item title="购买须知">
						<view class="content">
							<text class="text">好用就完了</text>
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="商品描述">
						<view class="content" v-html="text">
							<!-- <text class="text"></text> -->
						</view>
					</uni-collapse-item>
					<uni-collapse-item title="商品参数">
						<view class="content flex1">
							<view v-for="(item,index) in Detail.param" :key="index">
								{{item.key}}:{{item.val}}
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</uni-section>
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @buttonClick="buttonClick"
				@click="onClick" />
		</view>
		<cart ref="cart" />
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				cid: '',
				Detail: '',
				text: '',
				cartid: '',
				options: [{
					icon: 'home',
					text: '首页'
				}, {
					icon: 'chat',
					text: '客服',
				}, {
					icon: 'cart',
					text: '购物车',
					info: store.state.cartList.length
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
			}
		},
		methods: {
			async getDetail() {
				let res = await uni.$http.get('/product/' + this.cid)
				this.Detail = res.data.data;
				console.log(this.Detail);
				this.text = res.data.data.descrip.replace(/style="[^"]+"/gi,
					'style="max-width:100% !important;height:auto;display:block;"');;
			},
			buttonClick(e) {
				if (e.index == 0) {
					if (!uni.getStorageSync('user')) {
						uni.showToast({
							title: '还未登录',
							icon: 'error'
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/login/login'
							})
						}, 1000)
					} else {
						if (store.state.cartList.length == 0) {
							this.Detail.num = 1
							this.Detail.flag = true
							this.cartid = this.Detail.product_id
							store.state.cartList.push(this.Detail)
							this.options[2].info = store.state.cartList.length
						} else {
							if (this.cartid == this.Detail.product_id) {
								store.state.cartList.find(item => {
									if (item.product_id == this.cartid) {
										item.num++
										return
									}
								})
							} else {
								this.Detail.num = 1
								this.Detail.flag = true
								this.cartid = this.Detail.product_id
								store.state.cartList.push(this.Detail)
								this.options[2].info = store.state.cartList.length
							}
						}
					}
				}
			},
			onClick(e) {
				if (e.index == 0) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (e.index == 1) {
					uni.navigateTo({
						// url: '/pages/cart/cart'
					})
				} else if (e.index == 2) {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
		},
		onLoad(options) {
			this.cid = options.id
			this.getDetail()
		},
		onShow() {
			console.log(11);
			this.getDetail()
		},
	}
</script>

<style>
	.bigImg {
		width: 100%;
		height: 400rpx;
		margin-bottom: 27rpx;
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}

	swiper {
		height: 400rpx;
	}

	.bigImg image {
		width: 100%;
		height: 400rpx;
	}

	.flex1 {
		display: flex;
		flex-wrap: wrap;
	}

	.flex1 view {
		width: 50%;
		margin: 30rpx 0;
		font-weight: 500;
	}

	.introduce {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.introduce .title {
		font-weight: 700;
		font-size: 36rpx;
		margin-bottom: 9rpx;
	}

	.introduce .xlh {
		font-size: 20rpx;
		color: #888888;
	}

	.introduce .money {
		font-weight: 600;
		font-size: 30rpx;
	}

	.introduce .xian {
		width: 300rpx;
		height: 1rpx;
		margin: 16rpx 0;
		background-color: #000;
	}

	.content {
		padding: 0 30rpx;
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
</style>