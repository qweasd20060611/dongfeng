"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      baseFormData: {
        name: "",
        tel: "",
        code: "",
        xxdz: ""
      },
      region: "请选择所在地区",
      dzList: []
    };
  },
  methods: {
    toggle(type) {
      this.type = type;
      this.$refs.popup.open(type);
    },
    bindPickerChange: function(e) {
      console.log(e);
      this.region = e.detail.value;
      this.region = this.region.toString();
      console.log(this.region);
    },
    async getDz() {
      let res = await common_vendor.index.$http.get("/address");
      this.dzList = res.data.data;
    },
    async bc() {
      var reg = this.region.split(",");
      console.log(reg);
      if (this.baseFormData.name != "" && this.baseFormData.tel != "" && this.baseFormData.code != "" && this.baseFormData.xxdz != "" && this.region != "请选择所在地区") {
        let res = await common_vendor.index.$http.post("/address", {
          address: this.baseFormData.xxdz,
          area: reg[2],
          city: reg[1],
          consignee: this.baseFormData.name,
          country_code: 86,
          is_default: 1,
          mobile: this.baseFormData.tel,
          postal_code: this.baseFormData.code,
          province: reg[0]
        });
        this.getDz();
        this.$refs.popup.close();
        console.log(res);
      } else {
        common_vendor.index.showToast({
          title: "不能为空",
          icon: "error"
        });
      }
    }
  },
  onLoad() {
    this.getDz();
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.dzList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.consignee),
        b: common_vendor.t(item.mobile),
        c: common_vendor.t(item.province),
        d: common_vendor.t(item.city),
        e: common_vendor.t(item.area),
        f: common_vendor.t(item.address),
        g: item.is_default,
        h: "4c8f7cda-0-" + i0,
        i: "4c8f7cda-1-" + i0,
        j: index
      };
    }),
    b: common_vendor.p({
      type: "compose",
      size: "30"
    }),
    c: common_vendor.p({
      type: "trash",
      size: "30"
    }),
    d: common_vendor.o(($event) => $data.baseFormData.name = $event),
    e: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.baseFormData.name
    }),
    f: common_vendor.p({
      label: "姓名",
      required: true
    }),
    g: common_vendor.o(($event) => $data.baseFormData.tel = $event),
    h: common_vendor.p({
      placeholder: "请输入联系方式",
      modelValue: $data.baseFormData.tel
    }),
    i: common_vendor.p({
      label: "联系方式",
      required: true
    }),
    j: common_vendor.o(($event) => $data.baseFormData.code = $event),
    k: common_vendor.p({
      placeholder: "请输入邮政编码",
      modelValue: $data.baseFormData.code
    }),
    l: common_vendor.p({
      label: "邮政编码",
      required: true
    }),
    m: common_vendor.t($data.region),
    n: $data.region,
    o: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    p: common_vendor.p({
      label: "地区"
    }),
    q: common_vendor.o(($event) => $data.baseFormData.xxdz = $event),
    r: common_vendor.p({
      placeholder: "请输入详细地址",
      modelValue: $data.baseFormData.xxdz
    }),
    s: common_vendor.p({
      label: "详细地址",
      required: true
    }),
    t: common_vendor.sr("baseForm", "4c8f7cda-3,4c8f7cda-2"),
    v: common_vendor.p({
      modelValue: $data.baseFormData
    }),
    w: common_vendor.o((...args) => $options.bc && $options.bc(...args)),
    x: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
    y: common_vendor.sr("popup", "4c8f7cda-2"),
    z: common_vendor.o(_ctx.change),
    A: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    B: common_vendor.o(($event) => $options.toggle("bottom"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/2023学期/uniapp/dongfeng/pages/shdz/shdz.vue"]]);
wx.createPage(MiniProgramPage);
