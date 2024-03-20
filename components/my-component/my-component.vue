<template>
	  <view class="my-component">
		  </view>
</template>

<script>
	export default {
		data() {
			return {
				cartList: [],
			}
		},
		methods: {
			setValue(value) {
				this.cartList.push(value);
			}
		}
	}
</script>

<style>
</style>