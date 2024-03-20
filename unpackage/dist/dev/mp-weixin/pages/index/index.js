"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      styleList: [],
      sear: ""
    };
  },
  methods: {
    async getSwiper() {
      let res = await common_vendor.index.$http.get("/carousel", {});
      this.swiperList = res.data.data;
    },
    async getStyle() {
      let res = await common_vendor.index.$http.get("/style", {});
      this.styleList = res.data.data;
    },
    tzDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/Details/Details?id=" + id
      });
    },
    tzShop(id, name) {
      common_vendor.index.navigateTo({
        url: "/pages/shop/shop?id1=" + id + "&name=" + name + "&index=0"
      });
    }
  },
  onLoad() {
    this.getSwiper();
    this.getStyle();
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.search),
    b: common_vendor.o(($event) => $data.sear = $event),
    c: common_vendor.p({
      placeholder: "请输入搜索关键词",
      bgColor: "#EEEEEE",
      modelValue: $data.sear
    }),
    d: common_vendor.f($data.swiperList, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.o(() => {
        }, index),
        c: index
      };
    }),
    e: common_vendor.f($data.styleList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.image,
        c: common_vendor.o(($event) => $options.tzShop(item.style_id, item.name), index),
        d: common_vendor.f(item.products.slice(0, 3), (item2, index2, i1) => {
          return {
            a: item2.image,
            b: common_vendor.t(item2.name),
            c: index2,
            d: common_vendor.o(($event) => $options.tzDetail(item2.product_id), index2)
          };
        }),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
