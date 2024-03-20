<template>
	<view>
		<view class="search">
			<uni-search-bar placeholder="搜索商品" bgColor="#EEEEEE" @confirm="search" v-model="sear" />
		</view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', index == active ? 'active' : '']"
						@click="activeChanged(index, item.category_id)">
						<view class="son">
							{{item.name_cn}}
						</view>
						<view class="son">
							{{item.name_en}}
						</view>
					</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2" @click="tzShop(item2.category_id)">
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类 Item 项 -->
						<view class="cate-lv3-item">
							<!-- 图片 -->
							<image :src="item2.image"></image>
							<!-- 文本 -->
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				cateLevel2: [],
				active: 0,
				id: ''
			}
		},
		methods: {
			async getFl() {
				let res = await uni.$http.get('/category')
				if (res && res.data.data) {
					this.cateList = res.data.data;
					this.id = this.cateList[0].category_id
					this.cateLevel2 = this.cateList[0].son
				}
			},
			activeChanged(i, id) {
				this.active = i;
				this.id = id
				this.cateLevel2 = this.cateList[i].son
				console.log(this.cateList[i].son);
			},
			tzShop(name) {
				uni.navigateTo({
					url: '/pages/shop/shop?id1=' + this.id + '&name=' + name + '&index=1'
				})
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getFl()
		}
	}
</script>

<style lang="less">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 284rpx !important;
			padding: 0 50rpx;
			box-sizing: border-box;

			.left-scroll-view-item {
				display: flex;
				flex-direction: column;
				height: 145rpx;
				justify-content: center;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					.son {
						color: #0e0e0e !important;
					}
				}
			}
		}
	}

	.son {
		color: #c8c8c8;
	}



	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;

		.cate-lv3-item {
			width: 100%;
			padding: 0 20rpx 20rpx;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 100%;
				height: 191rpx;
			}
		}
	}
</style>