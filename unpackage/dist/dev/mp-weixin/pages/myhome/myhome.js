"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    shdz() {
      common_vendor.index.navigateTo({
        url: "/pages/shdz/shdz"
      });
    },
    qxlogin() {
      common_vendor.index.setStorageSync("user", "");
      common_vendor.index.setStorageSync("userinfo", "");
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      });
    },
    mydd() {
      common_vendor.index.navigateTo({
        url: "/pages/mydd/mydd"
      });
    }
  },
  onLoad() {
  },
  onShow() {
    if (common_vendor.index.getStorageSync("user") == "") {
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
  }
};
if (!Array) {
  const _easycom_cc_cell2 = common_vendor.resolveComponent("cc-cell");
  _easycom_cc_cell2();
}
const _easycom_cc_cell = () => "../../node-modules/cc-ui-uni-app/components/cc-cell/cc-cell.js";
if (!Math) {
  _easycom_cc_cell();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.mydd),
    b: common_vendor.p({
      value: "查看全部订单"
    }),
    c: common_vendor.p({
      title: "积分半对换",
      isLink: true
    }),
    d: common_vendor.o($options.shdz),
    e: common_vendor.p({
      title: "收货地址",
      isLink: true
    }),
    f: common_vendor.p({
      title: "在线客服",
      isLink: true
    }),
    g: common_vendor.p({
      value: "dian1"
    }),
    h: common_vendor.p({
      title: "关于我们",
      isLink: true
    }),
    i: common_vendor.o((...args) => $options.qxlogin && $options.qxlogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/myhome/myhome.vue"]]);
wx.createPage(MiniProgramPage);
