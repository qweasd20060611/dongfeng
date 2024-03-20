"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "cc-goods-card",
  components: {},
  props: {
    // 左侧图片
    thumb: {
      type: String,
      default: ""
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 描述
    desc: {
      type: String,
      default: ""
    },
    // 图片角标
    tag: {
      type: String,
      default: ""
    },
    // 商品数量
    num: {
      type: [Number, String],
      default: ""
    },
    // 商品价格
    price: {
      type: [Number, String],
      default: ""
    },
    // 商品划线原价
    originPrice: {
      type: [Number, String],
      default: ""
    },
    // 货币符号
    currency: {
      type: String,
      default: "￥"
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
    clickImage() {
      this.$emit("click-thumb");
    }
  },
  mounted() {
  },
  onLoad() {
  },
  onShow() {
  },
  filters: {},
  computed: {},
  watch: {}
};
if (!Array) {
  const _easycom_cc_tag2 = common_vendor.resolveComponent("cc-tag");
  _easycom_cc_tag2();
}
const _easycom_cc_tag = () => "../cc-tag/cc-tag.js";
if (!Math) {
  _easycom_cc_tag();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.clickImage && $options.clickImage(...args)),
    b: $props.thumb,
    c: $props.tag
  }, $props.tag ? {
    d: common_vendor.t($props.tag),
    e: common_vendor.p({
      type: "error",
      circleRight: true
    })
  } : {}, {
    f: $props.title
  }, $props.title ? {
    g: common_vendor.t($props.title)
  } : {}, {
    h: $props.desc
  }, $props.desc ? {
    i: common_vendor.t($props.desc)
  } : {}, {
    j: _ctx.$slots.tags
  }, _ctx.$slots.tags ? {} : {}, {
    k: $props.price
  }, $props.price ? {
    l: common_vendor.t($props.currency),
    m: common_vendor.t(String($props.price).slice(0, 1)),
    n: common_vendor.t(String($props.price).slice(1))
  } : {}, {
    o: $props.originPrice
  }, $props.originPrice ? {
    p: common_vendor.t($props.currency),
    q: common_vendor.t($props.originPrice)
  } : {}, {
    r: $props.num
  }, $props.num ? {
    s: common_vendor.t($props.num)
  } : {}, {
    t: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-008f692b"], ["__file", "D:/2023学期/uniapp/dongfeng/node_modules/cc-ui-uni-app/components/cc-goods-card/cc-goods-card.vue"]]);
wx.createComponent(Component);
