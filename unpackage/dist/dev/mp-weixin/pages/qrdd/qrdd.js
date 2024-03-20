"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      dzObj: {},
      dzList: [],
      shopList: [],
      check: false,
      ddbz: "",
      total: ""
    };
  },
  methods: {
    toggle(type) {
      this.type = type;
      this.$refs.popup.open(type);
    },
    async getDz() {
      let res = await common_vendor.index.$http.get("/address");
      if (res && res.data.data) {
        this.dzList = res.data.data;
        res.data.data.find((item) => {
          if (item.is_default == true) {
            this.dzObj = item;
          }
        });
      }
    },
    chk() {
      if (this.check == false) {
        this.check = true;
      } else {
        this.check = false;
      }
    },
    getSum() {
      this.total = 0;
      this.shopList.forEach((item) => {
        this.total += item.num * item.price;
      });
    },
    async onClickButton() {
      var idList = [];
      this.shopList.forEach((item) => {
        idList.push(item.product_id);
      });
      if (this.check != false && idList != []) {
        console.log(store_index.store.state.cartList);
        console.log(this.shopList[0].product_id);
        store_index.store.state.cartList = store_index.store.state.cartList.filter((item) => item.product_id != this.shopList[0].product_id);
        let res = await common_vendor.index.$http.post("/orderV2?items[0][product_id]=" + idList + "&items[0][amount]=" + this.total, {
          address_id: this.dzObj.address_id,
          remark: this.ddbz,
          store_id: 13
        });
        store_index.store.state.ddxx = res.data.data;
        if (res.data.data) {
          common_vendor.index.navigateTo({
            url: "/pages/ddxx/ddxx"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请确定免责声明",
          icon: "error"
        });
      }
    },
    changedz(e) {
      this.dzObj = e.currentTarget.dataset.obj;
      this.$refs.popup.close();
    }
  },
  onLoad() {
    this.getDz();
    this.shopList = store_index.store.state.tjList;
    console.log(store_index.store.state.cartList);
    this.getSum();
  }
};
if (!Array) {
  const _easycom_cc_goods_card2 = common_vendor.resolveComponent("cc-goods-card");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_cc_submit_bar2 = common_vendor.resolveComponent("cc-submit-bar");
  (_easycom_cc_goods_card2 + _easycom_uni_group2 + _easycom_uni_icons2 + _easycom_uni_popup2 + _easycom_cc_submit_bar2)();
}
const _easycom_cc_goods_card = () => "../../node-modules/cc-ui-uni-app/components/cc-goods-card/cc-goods-card.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_cc_submit_bar = () => "../../node-modules/cc-ui-uni-app/components/cc-submit-bar/cc-submit-bar.js";
if (!Math) {
  (_easycom_cc_goods_card + _easycom_uni_group + _easycom_uni_icons + _easycom_uni_popup + _easycom_cc_submit_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.dzObj.consignee),
    b: common_vendor.t($data.dzObj.mobile),
    c: common_vendor.t($data.dzObj.province),
    d: common_vendor.t($data.dzObj.city),
    e: common_vendor.t($data.dzObj.area),
    f: common_vendor.t($data.dzObj.address),
    g: common_vendor.o(($event) => $options.toggle("bottom")),
    h: common_vendor.f($data.shopList, (item, index, i0) => {
      return {
        a: index,
        b: "e94e395a-0-" + i0,
        c: common_vendor.p({
          num: item.num,
          price: item.price,
          desc: item.serial_number,
          title: item.name,
          thumb: item.image
        })
      };
    }),
    i: $data.check,
    j: common_vendor.o((...args) => $options.chk && $options.chk(...args)),
    k: $data.ddbz,
    l: common_vendor.o(($event) => $data.ddbz = $event.detail.value),
    m: common_vendor.t($data.total),
    n: common_vendor.t($data.total),
    o: common_vendor.p({
      type: "weixin",
      size: "30"
    }),
    p: common_vendor.f($data.dzList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.consignee),
        b: common_vendor.t(item.mobile),
        c: common_vendor.t(item.province),
        d: common_vendor.t(item.city),
        e: common_vendor.t(item.area),
        f: common_vendor.t(item.address),
        g: index,
        h: common_vendor.o((...args) => $options.changedz && $options.changedz(...args), index),
        i: item
      };
    }),
    q: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    r: common_vendor.sr("popup", "e94e395a-5"),
    s: common_vendor.o(_ctx.change),
    t: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    v: common_vendor.o($options.onClickButton),
    w: common_vendor.p({
      price: $data.total * 100
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/qrdd/qrdd.vue"]]);
wx.createPage(MiniProgramPage);
