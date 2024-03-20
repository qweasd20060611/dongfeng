<template>
	<view>
		<view class="num">
			购物数量({{cart.length}})
		</view>
		<view class="cart">
			<view class="" v-for="(item,index) in cart" :key="index">
				<view class="">
					<checkbox :value="item.flag" :checked="item.flag" @click="check(index)" />
				</view>
				<view class="">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="js">
					<view class="title">{{item.name}}</view>
					<view class="title2">
						<text>{{item.serial_number}}</text>
					</view>
					<view class="money">
						<view class="">￥{{item.price}}
						</view>
						<view class="">
							<uni-number-box :min="1" :max="99" :value="item.num" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<cc-submit-bar :price="sum" @submit="onClickButton">
				<checkbox :checked="flag" @click="checkAll" />全选
			</cc-submit-bar>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				cart: [],
				sum: 0,
				flag: false
			}
		},
		methods: {
			getSum() {
				this.sum = 0
				this.cart.forEach(item => {
					if (item.flag) {
						this.sum += item.num * item.price * 100
					}
				})
				if (this.cart.length > 0) {
					this.flag = this.cart.every(item => item.flag)
				}
			},
			check(index) {
				this.cart[index].flag = !this.cart[index].flag
				this.getSum()
			},
			checkAll() {
				if (this.flag == true) {
					this.flag = false
					this.cart.forEach(item => {
						item.flag = this.flag
					})
				} else {
					this.flag = true
					this.cart.forEach(item => {
						item.flag = this.flag
					})
				}
				this.getSum()
			},
			onClickButton() {
				store.state.tjList = []
				if (this.cart.length == 0) {
					uni.showToast({
						title: '购物车没有商品',
						icon: 'error'
					})
				} else if (this.cart.find(item => {
						if (item.flag != true) {
							uni.showToast({
								title: '你没有选择商品',
								icon: 'error'
							})
						}
					})) {} else {
					this.cart.forEach(item => {
						if (item.flag == true) {
							store.state.tjList.push(item)
						}
					})
					uni.navigateTo({
						url: '/pages/qrdd/qrdd'
					})
				}
			}
		},
		onShow() {
			if (uni.getStorageSync('user') == '') {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
			this.cart = store.state.cartList;
			this.getSum()
		},
	}
</script>

<style>
	.cart>view {
		display: flex;
		align-items: center;
	}

	.cart>view .js {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.cart>view .js .title {
		font-size: 35rpx
	}

	.cart>view .js .title2 {
		margin: 15rpx 0;
		width: 300rpx;
		height: 75rpx;
		line-height: 28rpx;
	}

	.cart>view .js .title2 text {
		font-size: 25rpx;
		color: #A9A9A9;
	}

	image {
		width: 180rpx;
		height: 260rpx;
		margin: 5rpx 10rpx;
	}

	.money {
		display: flex;
		justify-content: space-between;
	}

	.bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}

	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		border: 2rpx solid #1989FA !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		border: 2rpx solid #1989FA !important;
		background-color: #1989FA !important;
		color: #FFFFFF !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #FFFFFF !important;
	}
</style>