import {
	$http
} from '@escook/request-miniprogram'
$http.baseUrl = 'http://owmp.test.yscase.com/api'
uni.$http = $http
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '加载中...'
	})
	if (uni.getStorageSync('user')) {
		options.header = {
			Authorization: 'Bearer ' + [uni.getStorageSync('user')]
		}
	}
}
$http.afterRequest = function(res) {
	uni.hideLoading()
	console.log(res);
}