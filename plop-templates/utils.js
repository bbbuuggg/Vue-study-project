exports.notEmpty = name => v =>
  !v || v.trim() === '' ? `${name} is required` : true
//模板代码用于快速生成component/store/view