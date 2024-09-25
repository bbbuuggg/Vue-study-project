/*
 * @Author: hzxOnlineOk
 * @Date: 2024-09-05 19:16:36
 * @LastEditors: 
 * @LastEditTime: 2024-09-15 11:13:53
 * @Description: 请填写简介
 */
//注册生成器
const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
