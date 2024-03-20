"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      dzObj: {},
      ddBh: {},
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
            console.log(this.dzObj.consignee);
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
      if (this.check != false) {
        console.log(this.ddBh);
        let res = await common_vendor.index.$http.post("/order/" + this.ddBh.order_id + "/payByWechat", {
          category: 1
        });
        if (res) {
          console.log(res);
          common_vendor.index.requestPayment({
            "provider": "wxpay",
            //固定值为"wxpay"
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function(res2) {
              console.log("支付成功", res2);
              common_vendor.index.switchTab({
                url: "/pages/cart/cart"
              });
            },
            fail: function(err) {
              console.log("支付失败:" + JSON.stringify(err));
              common_vendor.index.removeStorageSync("res");
              common_vendor.index.removeStorageSync("shoparr");
            }
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
      console.log(e.currentTarget.dataset.obj);
      this.dzObj = e.currentTarget.dataset.obj;
      this.$refs.popup.close();
    }
  },
  onLoad() {
    this.getDz();
    this.shopList = store_index.store.state.tjList;
    this.ddBh = store_index.store.state.ddxx;
    console.log(this.ddBh);
    this.getSum();
  }
};
if (!Array) {
  const _easycom_cc_goods_card2 = common_vendor.resolveComponent("cc-goods-card");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_cc_submit_bar2 = common_vendor.resolveComponent("cc-submit-bar");
  (_easycom_cc_goods_card2 + _easycom_uni_group2 + _easycom_uni_icons2 + _easycom_cc_submit_bar2)();
}
const _easycom_cc_goods_card = () => "../../node-modules/cc-ui-uni-app/components/cc-goods-card/cc-goods-card.js";
const _easycom_uni_group = () => "../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_cc_submit_bar = () => "../../node-modules/cc-ui-uni-app/components/cc-submit-bar/cc-submit-bar.js";
if (!Math) {
  (_easycom_cc_goods_card + _easycom_uni_group + _easycom_uni_icons + _easycom_cc_submit_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.ddBh.order_id),
    b: common_vendor.t($data.ddBh.payment_status),
    c: common_vendor.t($data.ddBh.created_at),
    d: common_vendor.t($data.dzObj.consignee),
    e: common_vendor.t($data.dzObj.mobile),
    f: common_vendor.t($data.dzObj.province),
    g: common_vendor.t($data.dzObj.city),
    h: common_vendor.t($data.dzObj.area),
    i: common_vendor.t($data.dzObj.address),
    j: common_vendor.f($data.shopList, (item, index, i0) => {
      return {
        a: index,
        b: "9a6ce29a-0-" + i0,
        c: common_vendor.p({
          num: item.num,
          price: item.price,
          desc: item.serial_number,
          title: item.name,
          thumb: item.image
        })
      };
    }),
    k: $data.check,
    l: common_vendor.o((...args) => $options.chk && $options.chk(...args)),
    m: $data.ddbz,
    n: common_vendor.o(($event) => $data.ddbz = $event.detail.value),
    o: common_vendor.t($data.total),
    p: common_vendor.t($data.total),
    q: common_vendor.p({
      type: "weixin",
      size: "30"
    }),
    r: common_vendor.o($options.onClickButton),
    s: common_vendor.p({
      price: $data.total * 100
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/ddxx/ddxx.vue"]]);
wx.createPage(MiniProgramPage);
