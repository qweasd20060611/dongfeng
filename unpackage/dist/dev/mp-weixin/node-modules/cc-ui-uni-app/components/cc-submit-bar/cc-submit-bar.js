"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "cc-submit-bar",
  components: {},
  props: {
    // 价钱
    price: {
      type: Number,
      required: true
    },
    // 左侧文案
    label: {
      type: String,
      default: "合计"
    },
    // 按钮文字
    buttonText: {
      type: String,
      default: "提交订单"
    },
    // 按钮颜色
    buttonColor: {
      type: String,
      default: "#ee0a24"
    },
    // 货币符号
    currency: {
      type: String,
      default: "¥"
    },
    // 价格小数点后位数
    decimalLength: {
      type: [String, Number],
      default: "2"
    },
    // 是否禁用按钮
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示加载中的按钮
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPrice: this.price
    };
  },
  methods: {
    submit(e) {
      if (!this.disabled && !this.loading) {
        this.$emit("submit", e);
      }
    }
  },
  mounted() {
  },
  computed: {
    leftPrice() {
      return Math.floor(this.showPrice / 100);
    },
    rightPrice() {
      return String((this.showPrice / 100).toFixed(this.decimalLength)).split(".")[1];
    }
  },
  watch: {
    price(val) {
      this.showPrice = val;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.$slots.tip
  }, _ctx.$slots.tip ? {} : {}, {
    b: common_vendor.t($props.label),
    c: common_vendor.t($props.currency),
    d: common_vendor.t($options.leftPrice),
    e: common_vendor.t($options.rightPrice),
    f: !$props.loading
  }, !$props.loading ? {
    g: common_vendor.t($props.buttonText)
  } : {}, {
    h: $props.loading,
    i: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    j: $props.disabled ? 1 : "",
    k: $props.buttonColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-896dcab9"], ["__file", "D:/2023学期/uniapp/dongfeng/node_modules/cc-ui-uni-app/components/cc-submit-bar/cc-submit-bar.vue"]]);
wx.createComponent(Component);
