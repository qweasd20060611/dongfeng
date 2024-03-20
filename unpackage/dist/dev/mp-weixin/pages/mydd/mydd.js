"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: [],
      tel: ""
    };
  },
  methods: {
    async getDd() {
      let res = await common_vendor.index.$http.get("/order");
      console.log(res);
      if (res) {
        this.list = res.data.data;
      }
    }
  },
  onLoad() {
    this.tel = common_vendor.index.getStorageSync("userinfo").mobile;
    this.getDd();
  }
};
if (!Array) {
  const _easycom_cc_goods_card2 = common_vendor.resolveComponent("cc-goods-card");
  _easycom_cc_goods_card2();
}
const _easycom_cc_goods_card = () => "../../node-modules/cc-ui-uni-app/components/cc-goods-card/cc-goods-card.js";
if (!Math) {
  _easycom_cc_goods_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.store.address),
        b: common_vendor.t(item.status),
        c: "4c218b9a-0-" + i0,
        d: common_vendor.p({
          num: item.items[0].amount,
          price: item.items[0].product.price,
          desc: item.items[0].product.serial_number,
          title: item.items[0].product.name,
          thumb: item.items[0].product.image
        }),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/mydd/mydd.vue"]]);
wx.createPage(MiniProgramPage);
