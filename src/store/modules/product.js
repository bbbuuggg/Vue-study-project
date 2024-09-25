/*
 * @Author: lsl
 * @Date: 2024-09-23 19:33:11
 * @LastEditors: lsl
 * @LastEditTime: 2024-09-24 23:05:14
 * @Description: 请填写简介
 */
// store/modules/product.js
const state = {
  products: [
    {
      id: 1,
      name: '商品1',
      image: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      avatar: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      description: '一款按了就会爆炸的按钮。',
      category: '技术产品',
      price: 1200,
      jhprice: 1,
      pfprice: 2,
      quantity: 100,
      feature1: 'Vue',
      feature1Percentage: 70,
      feature2: 'JavaScript',
      feature2Percentage: 18,
      feature3: 'CSS',
      feature3Percentage: 12,
      feature4: 'ESLint',
      feature4Percentage: 100
    },
    {
      id: 2,
      name: '商品2',
      image: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      avatar: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      description: '一款一样会爆炸的按钮。',
      category: '技术产品',
      price: 1500,
      jhprice: 1,
      pfprice: 2,
      quantity: 100,
      feature1: 'React',
      feature1Percentage: 80,
      feature2: 'TypeScript',
      feature2Percentage: 40,
      feature3: 'SASS',
      feature3Percentage: 50,
      feature4: 'Prettier',
      feature4Percentage: 90
    },
    {
      id: 3,
      name: '商品3',
      image: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      avatar: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      description: '一款不按也会爆炸的按钮。',
      category: '技术产品',
      price: 1500,
      quantity: 100,
      jhprice: 1,
      pfprice: 2,
      feature1: 'Vue',
      feature1Percentage: 70,
      feature2: 'JavaScript',
      feature2Percentage: 18,
      feature3: 'CSS',
      feature3Percentage: 12,
      feature4: 'ESLint',
      feature4Percentage: 100
    },
    {
      id: 4,
      name: '商品4',
      image: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      avatar: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      description: '爆炸的按钮。',
      category: '技术产品',
      price: 1500,
      jhprice: 1,
      pfprice: 2,
      quantity: 100,
      feature1: 'React',
      feature1Percentage: 80,
      feature2: 'TypeScript',
      feature2Percentage: 40,
      feature3: 'SASS',
      feature3Percentage: 50,
      feature4: 'Prettier',
      feature4Percentage: 90
    },
    {
      id: 5,
      name: '商品5',
      image: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      avatar: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      description: '一款打了折的爆炸按钮。',
      category: '技术产品',
      price: 500,
      jhprice: 1,
      pfprice: 2,
      quantity: 100,
      feature1: 'Vue',
      feature1Percentage: 70,
      feature2: 'JavaScript',
      feature2Percentage: 18,
      feature3: 'CSS',
      feature3Percentage: 12,
      feature4: 'ESLint',
      feature4Percentage: 100
    },
    {
      id: 6,
      name: '商品6',
      image: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      avatar: 'https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png',
      description: '难以捉摸的爆炸按钮。',
      category: '技术产品',
      price: 1500,
      jhprice: 1,
      pfprice: 2,
      quantity: 100,
      feature1: 'React',
      feature1Percentage: 80,
      feature2: 'TypeScript',
      feature2Percentage: 40,
      feature3: 'SASS',
      feature3Percentage: 50,
      feature4: 'Prettier',
      feature4Percentage: 90
    }
  ]
}

const getters = {
  products: state => state.products
}

const actions = {
  fetchProducts({ commit }) {
    // // 这里模拟从API获取产品数据
    // const products = [
    //   { id: 1, name: 'Product A', description: 'Description A' },
    //   { id: 2, name: 'Product B', description: 'Description B' }
    // ]
    const products = state.products
    commit('setProducts', products)
  }
}

const mutations = {
  setProducts(state, products) {
    state.products = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
