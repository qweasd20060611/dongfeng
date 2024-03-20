"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      cid: "",
      Detail: "",
      text: "",
      cartid: "",
      options: [{
        icon: "home",
        text: "首页"
      }, {
        icon: "chat",
        text: "客服"
      }, {
        icon: "cart",
        text: "购物车",
        info: store_index.store.state.cartList.length
      }],
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
          color: "#fff"
        },
        {
          text: "立即购买",
          backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
          color: "#fff"
        }
      ]
    };
  },
  methods: {
    async getDetail() {
      let res = await common_vendor.index.$http.get("/product/" + this.cid);
      this.Detail = res.data.data;
      console.log(this.Detail);
      this.text = res.data.data.descrip.replace(
        /style="[^"]+"/gi,
        'style="max-width:100% !important;height:auto;display:block;"'
      );
    },
    buttonClick(e) {
      if (e.index == 0) {
        if (!common_vendor.index.getStorageSync("user")) {
          common_vendor.index.showToast({
            title: "还未登录",
            icon: "error"
          });
          setTimeout(() => {
            common_vendor.index.redirectTo({
              url: "/pages/login/login"
            });
          }, 1e3);
        } else {
          if (store_index.store.state.cartList.length == 0) {
            this.Detail.num = 1;
            this.Detail.flag = true;
            this.cartid = this.Detail.product_id;
            store_index.store.state.cartList.push(this.Detail);
            this.options[2].info = store_index.store.state.cartList.length;
          } else {
            if (this.cartid == this.Detail.product_id) {
              store_index.store.state.cartList.find((item) => {
                if (item.product_id == this.cartid) {
                  item.num++;
                  return;
                }
              });
            } else {
              this.Detail.num = 1;
              this.Detail.flag = true;
              this.cartid = this.Detail.product_id;
              store_index.store.state.cartList.push(this.Detail);
              this.options[2].info = store_index.store.state.cartList.length;
            }
          }
        }
      }
    },
    onClick(e) {
      if (e.index == 0) {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      } else if (e.index == 1) {
        common_vendor.index.navigateTo({
          // url: '/pages/cart/cart'
        });
      } else if (e.index == 2) {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    }
  },
  onLoad(options) {
    this.cid = options.id;
    this.getDetail();
  },
  onShow() {
    console.log(11);
    this.getDetail();
  }
};
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  const _component_cart = common_vendor.resolveComponent("cart");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_section2 + _easycom_uni_goods_nav2 + _component_cart)();
}
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_section + _easycom_uni_goods_nav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.Detail.photos, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.t($data.Detail.name),
    c: common_vendor.t($data.Detail.serial_number),
    d: common_vendor.t($data.Detail.price),
    e: common_vendor.p({
      title: "购买须知"
    }),
    f: $data.text,
    g: common_vendor.p({
      title: "商品描述"
    }),
    h: common_vendor.f($data.Detail.param, (item, index, i0) => {
      return {
        a: common_vendor.t(item.key),
        b: common_vendor.t(item.val),
        c: index
      };
    }),
    i: common_vendor.p({
      title: "商品参数"
    }),
    j: common_vendor.o(_ctx.change),
    k: common_vendor.o(($event) => _ctx.accordionVal = $event),
    l: common_vendor.p({
      accordion: true,
      modelValue: _ctx.accordionVal
    }),
    m: common_vendor.p({
      title: "手风琴效果（只会保留一个的打开状态）",
      type: "line"
    }),
    n: common_vendor.o($options.buttonClick),
    o: common_vendor.o($options.onClick),
    p: common_vendor.p({
      options: $data.options,
      fill: true,
      ["button-group"]: $data.buttonGroup
    }),
    q: common_vendor.sr("cart", "a2dced8e-6")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/Details/Details.vue"]]);
wx.createPage(MiniProgramPage);
