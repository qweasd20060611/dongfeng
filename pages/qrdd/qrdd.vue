<template>
	<view class="box">
		<!-- 收货地址 -->
		<view class="shdz" @click="toggle('bottom')">
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
		<view class="" style="padding-bottom: 160rpx;">
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="example">
						<view class="shdz" v-for="(item,index) in dzList" :key="index" @click="changedz"
							:data-obj="item">
							<view class="user">
								<view class="">
									收货人: {{item.consignee}}
								</view>
								<view class="tel">
									{{item.mobile}}
								</view>
							</view>
							<view class="dz">
								收货地址: {{item.province}}{{item.city}}{{item.area}}{{item.address}}
							</view>
						</view>
						<!-- 基础用法，不包含校验规则 -->
					</view>
				</view>
			</uni-popup>
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
				var idList = []
				this.shopList.forEach(item => {
					idList.push(item.product_id)
				})
				if (this.check != false && idList != []) {
					console.log(store.state.cartList);
					console.log(this.shopList[0].product_id);
					store.state.cartList = store.state.cartList.filter(item => item.product_id != this.shopList[0]
						.product_id)
					let res = await uni.$http.post('/orderV2?items[0][product_id]=' + idList + '&items[0][amount]=' +
						this.total, {
							address_id: this.dzObj.address_id,
							remark: this.ddbz,
							store_id: 13
						})
					store.state.ddxx = res.data.data
					if (res.data.data) {
						uni.navigateTo({
							url: '/pages/ddxx/ddxx'
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
				this.dzObj = e.currentTarget.dataset.obj
				this.$refs.popup.close()
			}
		},
		onLoad() {
			this.getDz()
			this.shopList = store.state.tjList
			console.log(store.state.cartList);
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