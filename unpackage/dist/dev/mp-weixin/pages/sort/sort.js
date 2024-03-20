"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      wh: 0,
      cateList: [],
      cateLevel2: [],
      active: 0,
      id: ""
    };
  },
  methods: {
    async getFl() {
      let res = await common_vendor.index.$http.get("/category");
      if (res && res.data.data) {
        this.cateList = res.data.data;
        this.id = this.cateList[0].category_id;
        this.cateLevel2 = this.cateList[0].son;
      }
    },
    activeChanged(i, id) {
      this.active = i;
      this.id = id;
      this.cateLevel2 = this.cateList[i].son;
      console.log(this.cateList[i].son);
    },
    tzShop(name) {
      common_vendor.index.navigateTo({
        url: "/pages/shop/shop?id1=" + this.id + "&name=" + name + "&index=1"
      });
    }
  },
  onLoad() {
    const sysInfo = common_vendor.index.getSystemInfoSync();
    this.wh = sysInfo.windowHeight;
    this.getFl();
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
    b: common_vendor.o(($event) => _ctx.sear = $event),
    c: common_vendor.p({
      placeholder: "搜索商品",
      bgColor: "#EEEEEE",
      modelValue: _ctx.sear
    }),
    d: common_vendor.f($data.cateList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name_cn),
        b: common_vendor.t(item.name_en),
        c: common_vendor.n(index == $data.active ? "active" : ""),
        d: common_vendor.o(($event) => $options.activeChanged(index, item.category_id), index),
        e: index
      };
    }),
    e: $data.wh + "px",
    f: common_vendor.f($data.cateLevel2, (item2, i2, i0) => {
      return {
        a: item2.image,
        b: i2,
        c: common_vendor.o(($event) => $options.tzShop(item2.category_id), i2)
      };
    }),
    g: $data.wh + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/sort/sort.vue"]]);
wx.createPage(MiniProgramPage);
