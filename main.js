import App from './App'
import '@/untils/http.js'
import Store from './store'
// #ifndef VUE3
import ccUi from 'cc-ui-uni-app'
import Vue from 'vue'
Vue.use(ccUi)
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Store)
	return {
		app
	}
}
// #endif