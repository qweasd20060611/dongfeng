"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      styleName: "",
      sear: "",
      value: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      index: 0,
      list: [],
      option: [{
        text: "全部",
        value: 0
      }],
      option2: [
        {
          text: "价格升序",
          value: 0
        },
        {
          text: "价格降序",
          value: 1
        }
      ]
    };
  },
  methods: {
    async getShop() {
      this.list = [];
      if (this.index == 0) {
        let res = await common_vendor.index.$http.post("/productv2", {
          style_id: this.value4,
          series_id: this.styleName
        });
        console.log(this.value4);
        console.log(this.styleName);
        this.list = res.data.data;
        if (this.value2 == 0) {
          this.list.sort(this.compare("price"));
        } else {
          this.list.sort(this.compare2("price"));
        }
      } else {
        let res = await common_vendor.index.$http.post("/productv2", {
          style_id: this.value3,
          series_id: this.styleName
        });
        this.list = res.data.data;
        if (this.value2 == 0) {
          this.list.sort(this.compare("price"));
        } else {
          this.list.sort(this.compare2("price"));
        }
      }
    },
    async getFl() {
      let res = await common_vendor.index.$http.get("/category");
      if (res && res.data.data) {
        var list = res.data.data;
        list.find((item) => {
          if (item.category_id == this.value3) {
            list = item;
            console.log(list);
            list.son.forEach((item2) => {
              this.option.push({
                text: item2.name_cn,
                value: item2.category_id
              });
            });
          }
        });
      }
    },
    tzDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/Details/Details?id=" + id
      });
    },
    change1(val) {
      console.log(this.index);
      if (this.index == 0) {
        this.value4 = val.value;
        this.styleName = val.text;
      } else {
        this.value = val.value;
        this.styleName = val.value;
      }
      console.log(val);
      this.getShop();
    },
    change2(val) {
      this.value2 = val.value;
      this.getShop();
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    compare2(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      };
    }
  },
  onLoad(options) {
    this.index = options.index;
    if (this.index == 1) {
      this.value = Number(options.name);
      console.log(this.value);
    } else {
      this.value4 = Number(options.id1);
    }
    this.styleName = options.name;
    if (options.name == "帝舵风" || options.name == "商务风" || options.name == "休闲风") {
      this.option.push({
        text: "帝舵风",
        value: 3
      }, {
        text: "商务风",
        value: 1
      }, {
        text: "休闲风",
        value: 2
      });
    }
    this.getShop();
    if (this.index == 1) {
      this.getFl();
      this.value3 = Number(options.id1);
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_zb_dropdown_item2 = common_vendor.resolveComponent("zb-dropdown-item");
  const _easycom_zb_dropdown_menu2 = common_vendor.resolveComponent("zb-dropdown-menu");
  (_easycom_uni_search_bar2 + _easycom_zb_dropdown_item2 + _easycom_zb_dropdown_menu2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_zb_dropdown_item = () => "../../uni_modules/zb-dropdown-menu/components/zb-dropdown-item/zb-dropdown-item.js";
const _easycom_zb_dropdown_menu = () => "../../uni_modules/zb-dropdown-menu/components/zb-dropdown-menu/zb-dropdown-menu.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_zb_dropdown_item + _easycom_zb_dropdown_menu)();
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
    d: common_vendor.o($options.change1),
    e: common_vendor.o(($event) => $data.value4 = $event),
    f: common_vendor.p({
      name: "first",
      options: $data.option,
      modelValue: $data.value4
    }),
    g: common_vendor.o($options.change2),
    h: common_vendor.o(($event) => $data.value2 = $event),
    i: common_vendor.p({
      name: "two",
      options: $data.option2,
      modelValue: $data.value2
    }),
    j: $data.index == 0,
    k: common_vendor.o($options.change1),
    l: common_vendor.o(($event) => $data.value = $event),
    m: common_vendor.p({
      name: "first",
      options: $data.option,
      modelValue: $data.value
    }),
    n: common_vendor.o($options.change2),
    o: common_vendor.o(($event) => $data.value2 = $event),
    p: common_vendor.p({
      name: "two",
      options: $data.option2,
      modelValue: $data.value2
    }),
    q: $data.index == 1,
    r: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: index,
        e: common_vendor.o(($event) => $options.tzDetail(item.product_id), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
