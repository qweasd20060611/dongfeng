<template>
	<view class="box">
		<view class="list" v-for="(item,index) in dzList" :key="index">
			<view class="son">
				<!-- 联系人以及电话 -->
				<view class="user">
					<view class="">
						{{item.consignee}}
					</view>
					<view class="">
						{{item.mobile}}
					</view>
				</view>
				<!-- 收货地址 -->
				<view class="dz">
					{{item.province}}{{item.city}}{{item.area}}{{item.address}}
				</view>
				<!-- 是否为默认地址 -->
				<view class="mrdz">
					<view class="mr">
						<checkbox :checked="item.is_default" />默认地址
					</view>
					<view class="cz">
						<view class="">
							<uni-icons type="compose" size="30"></uni-icons>
							编辑
						</view>
						<view class="">
							<uni-icons type="trash" size="30"></uni-icons>
							删除
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="">
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="example">
						<!-- 基础用法，不包含校验规则 -->
						<uni-forms ref="baseForm" :modelValue="baseFormData">
							<uni-forms-item label="姓名" required>
								<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
							</uni-forms-item>
							<uni-forms-item label="联系方式" required>
								<uni-easyinput v-model="baseFormData.tel" placeholder="请输入联系方式" />
							</uni-forms-item>
							<uni-forms-item label="邮政编码" required>
								<uni-easyinput v-model="baseFormData.code" placeholder="请输入邮政编码" />
							</uni-forms-item>
							<uni-forms-item label="地区">
								<!-- 	<uni-data-picker placeholder="请选择所在地区" popup-title="请选择所在地区" :localdata="dataTree"
									v-model="classes" @change="onchange" @nodeclick="onnodeclick"
									@popupopened="onpopupopened" @popupclosed="onpopupclosed">
								</uni-data-picker> -->
								<picker mode="region" :value="region" @change="bindPickerChange">
									<view class="uni-input">{{ region }}</view>
								</picker>
							</uni-forms-item>
							<uni-forms-item label="详细地址" required>
								<uni-easyinput v-model="baseFormData.xxdz" placeholder="请输入详细地址" />
							</uni-forms-item>
						</uni-forms>
						<button @click="bc">确定</button>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="" style="margin-top: 20rpx; padding-bottom: 20rpx;">
			<button class="btn" @click="toggle('bottom')">+新增收货地址</button>
		</view>

	</view>
</template>

<script>
	import {
		province1
	} from '@/untils/province.js'
	export default {
		data() {
			return {
				baseFormData: {
					name: '',
					tel: '',
					code: '',
					xxdz: ''
				},
				region: "请选择所在地区",
				dzList: []
			}
		},
		methods: {
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.region = e.detail.value
				this.region = this.region.toString()
				console.log(this.region);
			},
			async getDz() {
				let res = await uni.$http.get('/address')
				this.dzList = res.data.data
			},
			async bc() {
				var reg = this.region.split(',')
				console.log(reg);
				if (this.baseFormData.name != '' && this.baseFormData.tel != '' && this.baseFormData.code != '' && this
					.baseFormData.xxdz != '' && this.region != "请选择所在地区") {
					let res = await uni.$http.post('/address', {
						address: this.baseFormData.xxdz,
						area: reg[2],
						city: reg[1],
						consignee: this.baseFormData.name,
						country_code: 86,
						is_default: 1,
						mobile: this.baseFormData.tel,
						postal_code: this.baseFormData.code,
						province: reg[0]
					})
					this.getDz()
					this.$refs.popup.close()
					console.log(res);
				} else {
					uni.showToast({
						title: '不能为空',
						icon: 'error'
					})
				}

			}
		},
		onLoad() {
			this.getDz()
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}

	.uni-forms-item__label {
		width: 160rpx !important;
	}

	.uni-forms-item.is-direction-left {
		align-items: center;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.box {
		height: 100%;
	}

	.w100 {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.popup-content {
		height: 950rpx;
	}

	.btn {
		width: 455rpx;
		height: 85rpx;
		background-color: #000000;
		color: #fff;
		text-align: center;
	}

	.list {
		margin-top: 30rpx;
	}

	.son {
		box-sizing: border-box;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		height: 280rpx;
		justify-content: space-between;
		background-color: #fff;
	}

	.dz {
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #cdcdcd;
	}

	.user {
		display: flex;
		justify-content: space-between;
	}

	.mrdz {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.mr {
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}

	.mrdz .cz {
		display: flex;
	}

	.mrdz .cz view {
		font-size: 26rpx;
		display: flex;
		align-items: center;
	}

	.mrdz .cz view:nth-child(2) {
		margin-left: 38rpx;
	}

	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		border: 2rpx solid #333333 !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		border: 2rpx solid #000 !important;
		background-color: #000 !important;
		color: #FFFFFF !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		color: #FFFFFF !important;
	}
</style>