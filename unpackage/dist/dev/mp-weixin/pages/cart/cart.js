"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      cart: [],
      sum: 0,
      flag: false
    };
  },
  methods: {
    getSum() {
      this.sum = 0;
      this.cart.forEach((item) => {
        if (item.flag) {
          this.sum += item.num * item.price * 100;
        }
      });
      if (this.cart.length > 0) {
        this.flag = this.cart.every((item) => item.flag);
      }
    },
    check(index) {
      this.cart[index].flag = !this.cart[index].flag;
      this.getSum();
    },
    checkAll() {
      if (this.flag == true) {
        this.flag = false;
        this.cart.forEach((item) => {
          item.flag = this.flag;
        });
      } else {
        this.flag = true;
        this.cart.forEach((item) => {
          item.flag = this.flag;
        });
      }
      this.getSum();
    },
    onClickButton() {
      store_index.store.state.tjList = [];
      if (this.cart.length == 0) {
        common_vendor.index.showToast({
          title: "购物车没有商品",
          icon: "error"
        });
      } else if (this.cart.find((item) => {
        if (item.flag != true) {
          common_vendor.index.showToast({
            title: "你没有选择商品",
            icon: "error"
          });
        }
      }))
        ;
      else {
        this.cart.forEach((item) => {
          if (item.flag == true) {
            store_index.store.state.tjList.push(item);
          }
        });
        common_vendor.index.navigateTo({
          url: "/pages/qrdd/qrdd"
        });
      }
    }
  },
  onShow() {
    if (common_vendor.index.getStorageSync("user") == "") {
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    }
    this.cart = store_index.store.state.cartList;
    this.getSum();
  }
};
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_cc_submit_bar2 = common_vendor.resolveComponent("cc-submit-bar");
  (_easycom_uni_number_box2 + _easycom_cc_submit_bar2)();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_cc_submit_bar = () => "../../node-modules/cc-ui-uni-app/components/cc-submit-bar/cc-submit-bar.js";
if (!Math) {
  (_easycom_uni_number_box + _easycom_cc_submit_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.cart.length),
    b: common_vendor.f($data.cart, (item, index, i0) => {
      return {
        a: item.flag,
        b: item.flag,
        c: common_vendor.o(($event) => $options.check(index), index),
        d: item.image,
        e: common_vendor.t(item.name),
        f: common_vendor.t(item.serial_number),
        g: common_vendor.t(item.price),
        h: "4da652b3-0-" + i0,
        i: common_vendor.p({
          min: 1,
          max: 99,
          value: item.num
        }),
        j: index
      };
    }),
    c: $data.flag,
    d: common_vendor.o((...args) => $options.checkAll && $options.checkAll(...args)),
    e: common_vendor.o($options.onClickButton),
    f: common_vendor.p({
      price: $data.sum
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
