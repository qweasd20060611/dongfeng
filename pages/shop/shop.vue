<template>
	<view>
		<view class="search">
			<uni-search-bar placeholder="请输入搜索关键词" bgColor="#EEEEEE" @confirm="search" v-model="sear" />
		</view>
		<view class="dropdown" v-show="index == 0">
			<zb-dropdown-menu style="width: 100%">
				<zb-dropdown-item name="first" :options="option" v-model="value4" @change="change1"></zb-dropdown-item>
				<zb-dropdown-item name="two" :options="option2" v-model="value2" @change="change2"></zb-dropdown-item>
			</zb-dropdown-menu>
		</view>
		<view class="dropdown" v-show="index == 1">
			<zb-dropdown-menu style="width: 100%">
				<zb-dropdown-item name="first" :options="option" v-model="value" @change="change1"></zb-dropdown-item>
				<zb-dropdown-item name="two" :options="option2" v-model="value2" @change="change2"></zb-dropdown-item>
			</zb-dropdown-menu>
		</view>
		<view class="list">
			<view class="list-son" v-for="(item,index) in list" :key="index" @click="tzDetail(item.product_id)">
				<view class="img">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="text">
					<text>{{item.name}}</text>
				</view>
				<view class="money">
					<text>￥{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				styleName: '',
				sear: '',
				value: 0,
				value2: 0,
				value3: 0,
				value4: 0,
				index: 0,
				list: [],
				option: [{
					text: '全部',
					value: 0
				}],
				option2: [{
						text: '价格升序',
						value: 0
					},
					{
						text: '价格降序',
						value: 1
					},
				],
			}
		},
		methods: {
			async getShop() {
				this.list = []
				if (this.index == 0) {
					let res = await uni.$http.post('/productv2', {
						style_id: this.value4,
						series_id: this.styleName
					})
					console.log(this.value4);
					console.log(this.styleName);
					this.list = res.data.data
					if (this.value2 == 0) {
						this.list.sort(this.compare('price'))
					} else {
						this.list.sort(this.compare2('price'))
					}
				} else {
					let res = await uni.$http.post('/productv2', {
						style_id: this.value3,
						series_id: this.styleName
					})
					this.list = res.data.data
					if (this.value2 == 0) {
						this.list.sort(this.compare('price'))
					} else {
						this.list.sort(this.compare2('price'))
					}
				}

			},
			async getFl() {
				let res = await uni.$http.get('/category')
				if (res && res.data.data) {
					var list = res.data.data
					list.find(item => {
						if (item.category_id == this.value3) {
							list = item
							console.log(list);
							list.son.forEach(item => {
								this.option.push({
									text: item.name_cn,
									value: item.category_id
								})
							})
						}
					});

				}
			},
			tzDetail(id) {
				uni.navigateTo({
					url: '/pages/Details/Details?id=' + id
				})
			},
			change1(val) {
				console.log(this.index);
				if (this.index == 0) {
					this.value4 = val.value;
					this.styleName = val.text;
				} else {
					this.value = val.value;
					this.styleName = val.value;
				}
				console.log(val);
				this.getShop()
			},
			change2(val) {
				this.value2 = val.value
				this.getShop()
			},
			compare(property) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value1 - value2;
				}
			},
			compare2(property) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					return value2 - value1;
				}
			}
		},
		onLoad(options) {
			this.index = options.index
			if (this.index == 1) {
				this.value = Number(options.name)
				console.log(this.value);
			} else {
				this.value4 = Number(options.id1);
			}
			this.styleName = options.name;
			if (options.name == '帝舵风' || options.name == '商务风' || options.name == '休闲风') {
				this.option.push({
					text: '帝舵风',
					value: 3
				}, {
					text: '商务风',
					value: 1
				}, {
					text: '休闲风',
					value: 2
				})
			}
			this.getShop()
			if (this.index == 1) {
				this.getFl()
				this.value3 = Number(options.id1);
			}
		},
	}
</script>

<style>
	.list {
		padding: 40rpx 40rpx 0rpx;
		display: flex;
		background-color: #f7f7f7;
		flex-wrap: wrap;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.list-son {
		width: 47%;
		height: 300rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 10rpx 0;
		box-sizing: border-box;
		margin-bottom: 40rpx;
	}

	.list-son .img {
		width: 80rpx;
		height: 120rpx;
	}

	.list-son .img image {
		width: 100%;
		height: 100%;
	}

	.list-son .text {
		font-size: 23rpx;
		height: 40rpx;
		text-align: center;
	}

	.list-son .money {
		color: #FF0000;
	}
</style>