"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    cartList: [],
    tjList: [],
    ddxx: ""
  },
  mutations: {},
  actions: {}
  // ....
});
exports.store = store;
