"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "cc-tag",
  components: {},
  props: {
    // 标签主题类型
    type: {
      type: String,
      default: "primary"
    },
    // 朴素标签
    plain: {
      type: Boolean,
      defalut: false
    },
    // 圆角标签
    round: {
      type: Boolean,
      defalut: false
    },
    // 左圆角
    circleLeft: {
      type: Boolean,
      defalut: false
    },
    // 右圆角
    circleRight: {
      type: Boolean,
      defalut: false
    },
    // 尺寸
    size: {
      type: String,
      default: ""
    },
    // 自定义颜色
    color: {
      type: String,
      default: ""
    },
    // 自定义文字颜色
    textColor: {
      type: String,
      default: ""
    },
    // 是否可关闭
    closeable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      customColor: "",
      colorList: [
        {
          type: "primary",
          color: "#0081ff"
        },
        {
          type: "success",
          color: "#39b54a"
        },
        {
          type: "error",
          color: "#e54d42"
        },
        {
          type: "warning",
          color: "#f37b1d"
        },
        {
          type: "info",
          color: "#909399"
        }
      ]
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleClick() {
      this.$emit("click");
    }
  },
  mounted() {
    if (this.color) {
      this.customColor = {
        color: "#fff",
        border: `none`
      };
      if (this.plain) {
        this.customColor = {
          color: this.color,
          background: "#fff"
        };
      }
    }
  },
  onLoad() {
  },
  onShow() {
  },
  filters: {},
  computed: {
    isPlain() {
      if (this.plain)
        return `cc-tag-${this.type}-plain`;
      else
        return "";
    },
    iconColor() {
      if (this.type) {
        if (!this.plain)
          return "#fff";
        else {
          let item = this.colorList.find((item2) => item2.type === this.type);
          return item && item.color;
        }
      } else {
        return "#000";
      }
    }
  },
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
    a: $props.textColor,
    b: $props.closeable
  }, $props.closeable ? {
    c: common_vendor.p({
      type: "closeempty",
      color: $options.iconColor,
      size: "12"
    }),
    d: common_vendor.o((...args) => $options.close && $options.close(...args))
  } : {}, {
    e: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args)),
    f: common_vendor.n(`cc-tag-${$props.type}`),
    g: common_vendor.n(`${$options.isPlain}`),
    h: common_vendor.n(`cc-tag-${$props.size}`),
    i: common_vendor.n({
      "cc-tag-plain": $props.plain
    }),
    j: common_vendor.n({
      "cc-tag-round": $props.round
    }),
    k: common_vendor.n({
      "cc-tag-circle-left": $props.circleLeft
    }),
    l: common_vendor.n({
      "cc-tag-circle-right": $props.circleRight
    }),
    m: $props.color,
    n: $data.customColor
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-03b017a2"], ["__file", "D:/2023学期/uniapp/dongfeng/node_modules/cc-ui-uni-app/components/cc-tag/cc-tag.vue"]]);
wx.createComponent(Component);
