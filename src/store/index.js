/*
 * @Author: lsl
 * @Date: 2024-09-05 19:16:37
 * @LastEditors: lsl
 * @LastEditTime: 2024-09-23 19:57:07
 * @Description: 请填写简介
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import product from './modules/product'
//
import customer from './modules/customer'
import stock from './modules/stock'
import sale from './modules/sale'

// 注册Vuex插件
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  product,
  customer,
  stock,
  sale
})

export default store
