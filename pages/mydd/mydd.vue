<template>
	<view>
		<view class="" v-for="(item,index) in list" :key="index">
			<view class="hz">
				<view class="">
					{{item.store.address}}
				</view>
				<view class="">
					{{item.status}}
				</view>
			</view>
			<view class="">
				<cc-goods-card :num="item.items[0].amount" :price=" item.items[0].product.price"
					:desc="item.items[0].product.serial_number" :title=" item.items[0].product.name"
					:thumb=" item.items[0].product.image"></cc-goods-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tel: ''
			}
		},
		methods: {
			async getDd() {
				let res = await uni.$http.get('/order')
				console.log(res);
				if (res) {
					this.list = res.data.data
					// this.list = this.list.filter(item => item.address.mobile != this.tel)
					// console.log(this.tel);
					// console.log(this.list);
				}

			}
		},
		onLoad() {
			this.tel = uni.getStorageSync('userinfo').mobile
			this.getDd()
		}
	}
</script>

<style>
	.hz {
		display: flex;
		justify-content: space-between;
		margin: 15rpx 0;
	}
</style>