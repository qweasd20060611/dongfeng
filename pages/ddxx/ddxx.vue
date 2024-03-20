<template>
	<view class="box">
		<view class="shdz">
			<view class="user">
				<view class="">
					订单: {{ddBh.order_id}}
				</view>
				<view class="tel">
					{{ddBh.payment_status}}
				</view>
			</view>
			<view class="dz">
				{{ddBh.created_at}}
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="shdz">
			<view class="user">
				<view class="">
					收货人: {{dzObj.consignee}}
				</view>
				<view class="tel">
					{{dzObj.mobile}}
				</view>
			</view>
			<view class="dz">
				收货地址: {{dzObj.province}}{{dzObj.city}}{{dzObj.area}}{{dzObj.address}}
			</view>
		</view>
		<view class="">
			<cc-goods-card v-for="(item,index) in shopList" :key="index" :num="item.num" :price="item.price"
				:desc="item.serial_number" :title="item.name" :thumb="item.image"></cc-goods-card>
		</view>
		<!-- 协议 -->
		<view class="xy">
			<checkbox :value="check" @click="chk" /><text>我已阅读并接受[免责声明]</text>
		</view>
		<!-- 发票 -->
		<view class="fp">
			<uni-group class="fpbox">
				<view>
					<view>
						发票类型
					</view>
					<view>
						纸质发票
					</view>
				</view>
				<view>
					<view>
						发票抬头
					</view>
					<view>
						个人
					</view>
				</view>
				<view>
					<view>
						发票内容
					</view>
					<view>
						商品明细
					</view>
				</view>
				<view class="fpxy">
					发票将于确认收货后20个工作日寄出,抬头默认为个人,收标地址默认为收货地址.如需要更改抬头和收票地址,请主动联系客服或备注
				</view>
			</uni-group>
		</view>
		<view class="xy">
			订单备注
		</view>
		<!-- 订单备注 -->
		<view class="ddbz">
			<input type="text" v-model="ddbz" />
		</view>
		<view class="xy">
			商品金额明细
		</view>
		<view class="fp">
			<uni-group class="fpbox">
				<view>
					<view>
						商品总金额
					</view>
					<view>
						￥{{total}}
					</view>
				</view>
				<view>
					<view>
						定金
					</view>
					<view>
						个人
					</view>
				</view>
				<view>
					<view>
						运费
					</view>
					<view>
						商品明细
					</view>
				</view>
				<view>
					<view>
						总计
					</view>
					<view>
						￥{{total}}
					</view>
				</view>
			</uni-group>
		</view>
		<view class="xy">
			支付方法
		</view>
		<view class="fp">
			<uni-group class="fpbox">
				<view>
					<view>
						<uni-icons type="weixin" size="30"></uni-icons> 微信
					</view>
				</view>
			</uni-group>
		</view>
		<view class="tj">
			<cc-submit-bar :price="total * 100" @submit="onClickButton"></cc-submit-bar>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				dzObj: {},
				ddBh: {},
				dzList: [],
				shopList: [],
				check: false,
				ddbz: '',
				total: ''
			}
		},
		methods: {
			toggle(type) {
				this.type = type
				this.$refs.popup.open(type)
			},
			async getDz() {
				let res = await uni.$http.get('/address')
				if (res && res.data.data) {
					this.dzList = res.data.data
					res.data.data.find(item => {
						if (item.is_default == true) {
							this.dzObj = item;
							console.log(this.dzObj.consignee);
						}
					})
				}
			},
			chk() {
				if (this.check == false) {
					this.check = true
				} else {
					this.check = false
				}
			},
			getSum() {
				this.total = 0
				this.shopList.forEach(item => {
					this.total += item.num * item.price
				})
			},
			async onClickButton() {
				if (this.check != false) {
					console.log(this.ddBh);
					let res = await uni.$http.post('/order/' + this.ddBh.order_id + '/payByWechat', {
						category: 1
					})
					if (res) {
						console.log(res)
						uni.requestPayment({
							"provider": "wxpay", //固定值为"wxpay"
							timeStamp: res.data.data.timeStamp,
							nonceStr: res.data.data.nonceStr,
							package: res.data.data.package,
							signType: res.data.data.signType,
							paySign: res.data.data.paySign,
							success: function(res) {
								console.log("支付成功", res)
								uni.switchTab({
									url: '/pages/cart/cart'
								})
							},
							fail: function(err) {
								console.log('支付失败:' + JSON.stringify(err))
								uni.removeStorageSync('res');
								uni.removeStorageSync('shoparr')
							}
						})
					}
				} else {
					uni.showToast({
						title: '请确定免责声明',
						icon: 'error'
					})
				}
			},
			changedz(e) {
				console.log(e.currentTarget.dataset.obj);
				this.dzObj = e.currentTarget.dataset.obj
				this.$refs.popup.close()
			}
		},
		onLoad() {
			this.getDz()
			this.shopList = store.state.tjList
			this.ddBh = store.state.ddxx
			console.log(this.ddBh);
			this.getSum()
		}
	}
</script>

<style>
	.tj {
		background-color: #fff;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
	}

	.fp {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.ddbz {
		padding: 20rpx;
	}

	.ddbz input {
		border-bottom: 2rpx solid #CFD0D0;
	}

	.fp .fpbox>view {
		margin: 8rpx;
		padding-bottom: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #EFEFEF;
	}

	.fpxy {
		color: #B3B4B5;
		font-size: 24rpx;
	}

	.shdz {
		padding: 40rpx;
		display: flex;
		flex-direction: column;
	}

	.xy {
		padding: 10rpx;
		display: flex;
		align-items: center;
		background-color: #EFEFEF;
	}

	.shdz .user {
		display: flex;
		justify-content: space-between;
		margin-bottom: 4rpx;
	}

	.box {
		background-color: #FAFAFA;
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