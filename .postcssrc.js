// 所有的postcss插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  // 插件
  plugins: [
    pxToRem({
      // 根节点字体大小
      rootValue: ({ file }) => {
        ;/van/.test(file) ? 37.5 : 75
      },
      propList: ['*'] // 所有属性都转为rem
    })
  ]
}
