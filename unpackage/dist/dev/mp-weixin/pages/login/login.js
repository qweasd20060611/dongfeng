"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      active: 0,
      mobile: "",
      captcha: "",
      code: ""
    };
  },
  onLoad() {
    common_vendor.wx$1.login({
      success: (res) => {
        if (res.code) {
          this.code = res.code;
        }
      }
    });
  },
  methods: {
    tive(e) {
      this.active = e.currentTarget.dataset.index;
    },
    async login() {
      if (this.code != "") {
        if (this.mobile == "" || this.captcha == "") {
          common_vendor.index.showToast({
            title: "输入框不能为空",
            icon: "error"
          });
        } else {
          if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
            console.log(this.mobile);
            common_vendor.index.showToast({
              title: "手机号码有误，请重填",
              icon: "error"
            });
            return false;
          } else if (!/^\d{4}$/.test(this.captcha)) {
            common_vendor.index.showToast({
              title: "验证码四位",
              icon: "error"
            });
            return false;
          } else {
            let res = await common_vendor.index.$http.post("/user/login", {
              captcha: this.captcha,
              mobile: this.mobile,
              country_code: 86,
              code: this.code
            });
            console.log(res);
            if (res && res.data.data) {
              common_vendor.index.setStorageSync("user", res.data.data.access_token);
              common_vendor.index.setStorageSync("userinfo", res.data.data.user_info);
              common_vendor.index.switchTab({
                url: "/pages/myhome/myhome"
              });
            }
          }
        }
      } else {
        common_vendor.index.showToast({
          title: "用户code没有获取到"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.tive && $options.tive(...args)),
    b: common_vendor.n($data.active == 0 ? "active" : ""),
    c: common_vendor.o((...args) => $options.tive && $options.tive(...args)),
    d: common_vendor.n($data.active == 1 ? "active" : ""),
    e: $data.mobile,
    f: common_vendor.o(($event) => $data.mobile = $event.detail.value),
    g: $data.captcha,
    h: common_vendor.o(($event) => $data.captcha = $event.detail.value),
    i: common_vendor.o((...args) => $options.login && $options.login(...args)),
    j: $data.active == 0
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
