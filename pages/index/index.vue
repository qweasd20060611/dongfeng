<template>
	<view>
		<view class="search">
			<uni-search-bar placeholder="请输入搜索关键词" bgColor="#EEEEEE" @confirm="search" v-model="sear" />
		</view>
		<view class="swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" indicator-active-color="#FF0000">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<view class="swiper-item" @click="">
						<!-- <navigator :url="'/' + item.link"> -->
						<image :src="item.image" mode=""></image>
						<!-- </navigator> -->
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="icon-fg">
			<image src="/static/images/shoplogo.jpg" mode=""></image>
		</view>
		<view class="list">
			<view v-for="(item,index) in styleList" :key="index">
				<view class="icon-title">{{item.name}}</view>
				<view class="icon-img" @click="tzShop(item.style_id,item.name)">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="shop-list">
					<view class="shop">
						<view class="" v-for="(item,index) in item.products.slice(0,3)" :key="index"
							@click="tzDetail(item.product_id)">
							<image :src="item.image" mode=""></image>
							<view class="">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				styleList: [],
				sear: ''
			}
		},

		methods: {
			async getSwiper() {
				let res = await uni.$http.get('/carousel', {})
				this.swiperList = res.data.data
			},
			async getStyle() {
				let res = await uni.$http.get('/style', {})
				this.styleList = res.data.data
			},
			tzDetail(id) {
				uni.navigateTo({
					url: '/pages/Details/Details?id=' + id
				})
			},
			tzShop(id, name) {
				uni.navigateTo({
					url: '/pages/shop/shop?id1=' + id + '&name=' + name + '&index=0'
				})
			}
		},
		onLoad() {
			this.getSwiper()
			this.getStyle()
		},
	}
</script>

<style>
	.swiper image {
		width: 100%;
	}

	.icon-fg {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
	}

	.icon-fg image {
		width: 250rpx;
		height: 130rpx;
	}

	.icon-title {
		font-size: 34rpx;
		margin: 20rpx 0;
		text-align: center;
	}

	.icon-img {
		width: 100%;
		height: 500rpx;
	}

	.icon-img image {
		width: 100%;
		height: 100%;
	}

	.shop-list {
		width: 100%;
		height: 590rpx;
		background-color: #FF0000;
		position: relative;

	}

	.shop {
		width: 95%;
		position: absolute;
		background-color: #fff;
		margin: 0 18rpx;
		left: 0;
		top: -30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		height: 580rpx;

	}

	.shop>view {
		width: 33%;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.shop>view view {
		font-size: 22rpx
	}

	.shop image {
		box-sizing: border-box;
		width: 100%;
		height: 350rpx;
	}
</style>