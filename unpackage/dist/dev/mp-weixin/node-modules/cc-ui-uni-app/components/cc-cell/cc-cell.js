"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "cc-cell",
  components: {},
  props: {
    // 标题
    title: {
      type: String
    },
    // 右侧内容
    value: {
      type: String
    },
    // 标题下方描述
    label: {
      type: String
    },
    // 左侧图标
    icon: {
      type: String
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 尺寸
    size: {
      type: String
    },
    // 显示右侧箭头
    isLink: {
      type: Boolean,
      default: false
    },
    // 箭头方向
    arrowDirection: {
      type: String,
      default: "right"
    },
    // 图标尺寸
    iconSize: {
      type: String,
      default: "16"
    }
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  mounted() {
    console.log();
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
  const _easycom_cc_icon2 = common_vendor.resolveComponent("cc-icon");
  _easycom_cc_icon2();
}
const _easycom_cc_icon = () => "../cc-icon/cc-icon.js";
if (!Math) {
  _easycom_cc_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.icon
  }, $props.icon ? {
    b: common_vendor.p({
      size: $props.iconSize,
      type: $props.icon,
      color: "#323233"
    })
  } : {}, {
    c: !$props.title
  }, !$props.title ? {} : {
    d: common_vendor.t($props.title)
  }, {
    e: !$props.label
  }, !$props.label ? {} : {
    f: common_vendor.t($props.label)
  }, {
    g: !$props.value
  }, !$props.value ? {} : {
    h: common_vendor.t($props.value)
  }, {
    i: $props.isLink
  }, $props.isLink ? {
    j: common_vendor.p({
      color: "#969799",
      type: `arrow${$props.arrowDirection}`,
      size: $props.iconSize
    })
  } : {}, {
    k: common_vendor.n({
      "cc-cell-large": $props.size
    }),
    l: common_vendor.n({
      "cc-cell-border": $props.border
    }),
    m: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/node_modules/cc-ui-uni-app/components/cc-cell/cc-cell.vue"]]);
wx.createComponent(Component);
