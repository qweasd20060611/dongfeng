export function unirequest(url, method = 'get', data = {}, header = {}) {
	if (uni.getStorageSync('token')) {
		header = {
			...header,
			token: uni.getStorageSync('token')
		}
	}
	return new Promise((resole, reject) => {
		uni.request({
			url,
			method,
			data,
			header,
			success: (res) => {
				resole(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}