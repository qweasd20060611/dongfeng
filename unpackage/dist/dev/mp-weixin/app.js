"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./untils/http.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/sort/sort.js";
  "./pages/cart/cart.js";
  "./pages/myhome/myhome.js";
  "./pages/Details/Details.js";
  "./pages/shop/shop.js";
  "./pages/about/about.js";
  "./pages/login/login.js";
  "./pages/shdz/shdz.js";
  "./pages/qrdd/qrdd.js";
  "./pages/ddxx/ddxx.js";
  "./pages/mydd/mydd.js";
}
const _sfc_main = {
  globalData: {
    cartList: []
  },
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
