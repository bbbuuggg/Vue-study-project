/*
 * @Author: hzxOnlineOk
 * @Date: 2024-09-05 19:16:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-09-15 11:03:59
 * @Description: 请填写简介
 */
const { notEmpty } = require('../utils.js')//读入依赖

module.exports = {//prompt.js的导出对象
  description: 'generate a view',//描述
  prompts: [{//用户交互部分
    type: 'input',
    name: 'name',
    message: 'view name please',//提示输入视图名称
    validate: notEmpty('name')//检查是否为空
  },
  //blocks复选框
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    /*三种选项，用户可以通过复选框选择哪些代码块
    （<template>、<script>、style）要包含在生成的 Vue 文件中。*/
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }
    ],
    //确保script和template至少选择一个（ Vue 文件通常需要至少一个模板或脚本部分。）
    validate(value) {
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.'
      }
      return true
    }
  }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',//操作类型，会生成一个新文件
      path: `src/views/${name}/index.vue`,//文件保存路径
      templateFile: 'plop-templates/view/index.hbs',//选择文件模板
      data: {//传给模板的数据，决定生成哪些块
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]

    return actions
  }
}
