"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "zb-dropdown-menu",
  options: {
    virtualHost: true
  },
  props: {
    zIndex: [Number, String],
    titleColorStyle: {
      type: Object,
      default: () => {
      }
    },
    activeColor: {
      type: String,
      default: "#ee0a24"
    }
  },
  provide() {
    return {
      parent: this
    };
  },
  computed: {
    opened() {
      return this.childrenList.some((item) => item.showWrap);
    },
    barStyle() {
      if (this.opened && this.isDef(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex
        };
      }
    }
  },
  // watch:{
  //   childrenList:{
  //     handler(val){
  //       console.log('=====val====ss=',val)
  //     },
  //     immediate:true
  //   }
  // },
  data() {
    return {
      childrenList: [],
      direction: "down",
      offset: 0,
      style: {
        top: 0
      },
      showMask: true,
      show: false,
      mask: false,
      mask1: false,
      showWrapper: false,
      showWrapper1: false,
      watchTimer: null,
      activeIndex: null
    };
  },
  mounted() {
    this.updateOffset();
  },
  beforeDestroy() {
    this.watchTimer && clearTimeout(this.watchTimer);
  },
  methods: {
    isDef(val) {
      return val !== void 0 && val !== null;
    },
    close() {
      if (this.activeIndex == null)
        return;
      if (this.childrenList && this.childrenList.length) {
        let obj = this.childrenList.find((item) => {
          return item.showWrap;
        });
        if (obj) {
          this.changeStatus(obj, "mask", "showWrap", false);
        }
      }
    },
    change(param1, param2, status) {
      this[param1] = status;
      this.watchTimer && clearTimeout(this.watchTimer);
      this.watchTimer = setTimeout(() => {
        this[param2] = status;
        this.$emit("change", status);
      }, status ? 5 : 200);
    },
    closeMask(ite, index) {
      for (let i = 0; i < this.childrenList.length; i++) {
        let item = this.childrenList[i];
        if (i === index) {
          if (!item.showWrap) {
            this.changeStatus(item, "showWrap", "mask", true);
          } else {
            this.changeStatus(item, "mask", "showWrap", false);
          }
        } else {
          this.$set(item, "mask", false);
          this.$set(item, "showWrap", false);
        }
      }
    },
    changeStatus(item, param1, param2, status) {
      item[param1] = status;
      this.watchTimer && clearTimeout(this.watchTimer);
      this.watchTimer = setTimeout(() => {
        this.$set(item, param2, status);
      }, status ? 20 : 200);
    },
    toggleItem(index) {
      for (let i = 0; i < this.childrenList.length; i++) {
        let item = this.childrenList[i];
        if (i === index) {
          if (!item.showWrap) {
            this.changeStatus(item, "showWrap", "mask", true);
          } else {
            this.changeStatus(item, "mask", "showWrap", false);
          }
        } else {
          item.mask = false;
          item.showWrap = false;
        }
      }
      this.activeIndex = index;
      this.updateOffset();
      this.$emit("toggleItem");
    },
    updateOffset() {
      let query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".zb-dropdown-menu__bar").boundingClientRect((res) => {
        if (this.direction === "down") {
          this.offset = res.height + common_vendor.index.getSystemInfoSync().windowTop + res.top;
          this.style.top = `${this.offset}px`;
        } else {
          this.offset = common_vendor.index.getSystemInfoSync().screenHeight - res.top;
        }
      }).exec();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.childrenList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.n({
          "zb-dropdown-menu__title--active": item.showWrap,
          "zb-dropdown-menu__title--down": item.showWrap
        }),
        c: common_vendor.s({
          color: item.showWrap ? $props.activeColor : ""
        }),
        d: common_vendor.o(($event) => $options.toggleItem(index, item), index),
        e: index
      };
    }),
    b: common_vendor.s($props.titleColorStyle),
    c: common_vendor.s($options.barStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-86f52271"], ["__file", "D:/2023学期/uniapp/dongfeng/uni_modules/zb-dropdown-menu/components/zb-dropdown-menu/zb-dropdown-menu.vue"]]);
wx.createComponent(Component);
