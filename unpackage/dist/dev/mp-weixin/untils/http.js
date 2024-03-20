"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.$http.baseUrl = "http://owmp.test.yscase.com/api";
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "加载中..."
  });
  if (common_vendor.index.getStorageSync("user")) {
    options.header = {
      Authorization: "Bearer " + [common_vendor.index.getStorageSync("user")]
    };
  }
};
common_vendor.$http.afterRequest = function(res) {
  common_vendor.index.hideLoading();
  console.log(res);
};
