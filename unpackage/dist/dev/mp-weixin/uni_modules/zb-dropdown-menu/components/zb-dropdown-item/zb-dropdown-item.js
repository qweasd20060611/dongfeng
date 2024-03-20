"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "zb-dropdown-item",
  options: {
    virtualHost: true
  },
  props: {
    value: {
      type: [String, Number]
    },
    modelValue: {
      type: [String, Number]
    },
    name: {
      type: [String, Number],
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  inject: {
    parent: {
      default: null
    }
  },
  data() {
    return {
      zIndex: null,
      activeColor: null,
      mask: false,
      showWrap: false,
      title: null
    };
  },
  watch: {
    modelValue: {
      handler(newValue, oldValue) {
        const item = this.options.find(
          (option) => option.value === this.mValue
        );
        this.title = item.text || "";
        this.$emit("change", { ...item });
      }
    },
    showWrap: {
      handler(newLength, oldLength) {
      },
      immediate: true
    },
    options: {
      handler(newValue, oldLength) {
        if (newValue.length) {
          const match = this.options.filter(
            (option) => option.value === this.mValue
          );
          let title = match.length ? match[0].text : "";
          this.title = title;
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    mValue() {
      return this.value != null ? this.value : this.modelValue;
    },
    displayTitle: {
      get() {
        if (this.title) {
          return this.title;
        }
        const match = this.options.filter(
          (option) => option.value === this.mValue
        );
        let title = match.length ? match[0].text : "";
        this.title = title;
        return title;
      },
      set(val) {
        this.title = val;
      }
    }
  },
  methods: {
    /**
     * 获取父元素实例
     */
    getDropdown(name = "zb-dropdown-menu") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    clickCell(item) {
      this.changeStatus(this, "mask", "showWrap", false);
      if (item.value !== this.mValue) {
        this.title = item.text;
        this.$emit("update:modelValue", item.value);
        this.$emit("input", item.value);
      }
    },
    changeStatus(item, param1, param2, status) {
      item[param1] = status;
      this.watchTimer && clearTimeout(this.watchTimer);
      this.watchTimer = setTimeout(() => {
        item[param2] = status;
      }, status ? 20 : 200);
    },
    close(item, type) {
      let index = this.parent.childrenList.findIndex((item2) => item2.title === this.title);
      this.parent.closeMask({}, index);
    },
    moveHandle() {
      return false;
    },
    bindRelation() {
      let obj = this.parent.childrenList.find((item) => {
        let flag = item.name === this.name;
        return flag;
      });
      if (!this.parent || obj) {
        return;
      }
      let obj1 = Object.assign(
        this.$data,
        this.$props
      );
      const children = [...this.parent.childrenList, obj1];
      this.parent.childrenList = children;
    }
  },
  created() {
    this.bindRelation();
    let parentDropMenu = this.getDropdown();
    this.activeColor = parentDropMenu.activeColor;
    this.zIndex = parentDropMenu.zIndex;
  },
  beforeDestroy() {
    if (this.parent) {
      this.parent.childrenList = this.parent.childrenList.filter(
        (item) => item.title !== this.title
      );
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(() => {
    }),
    b: common_vendor.n({
      "mask__visible": $data.mask
    }),
    c: common_vendor.o((...args) => $options.close && $options.close(...args)),
    d: common_vendor.f($props.options, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.text),
        b: common_vendor.n({
          "active-cell__title": $options.mValue === item.value
        }),
        c: common_vendor.s({
          color: $options.mValue === item.value ? $data.activeColor : ""
        }),
        d: $options.mValue === item.value
      }, $options.mValue === item.value ? {
        e: common_vendor.s({
          color: $data.showWrap ? $data.activeColor : ""
        })
      } : {}, {
        f: index,
        g: common_vendor.o(($event) => $options.clickCell(item), index)
      });
    }),
    e: common_vendor.n({
      "content--visible_Y": $data.mask
    }),
    f: common_vendor.s($options.parent.style),
    g: common_vendor.s({
      zIndex: $data.zIndex
    }),
    h: $data.showWrap
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d6317b08"], ["__file", "D:/2023学期/uniapp/dongfeng/uni_modules/zb-dropdown-menu/components/zb-dropdown-item/zb-dropdown-item.vue"]]);
wx.createComponent(Component);
