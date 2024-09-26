/*
 * @Author: lsl
 * @Date: 2024-09-23 19:33:11
 * @LastEditors: lsl
 * @LastEditTime: 2024-09-26 15:35:29
 * @Description: 请填写简介
 */
// store/modules/product.js
// 以下两个const是不连接后端时用的，若连接后端要用后面两个
import axios from 'axios'

const state = {
  products: [
    {
      product_id: 1,
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
      product_id: 2,
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
      product_id: 3,
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
      product_id: 4,
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
      product_id: 5,
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
      product_id: 6,
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

// 与后端交互的时候用下面这两个const
// const state = {
//   productList: []
// }

// const getters = {
//   productList: state => state.productList
// }

const actions = {
  fetchProducts({ commit }) {
    // 这里模拟从API获取产品数据
    // const products = [
    //   { id: 1, name: 'Product A', description: 'Description A' },
    //   { id: 2, name: 'Product B', description: 'Description B' }
    // ]
    const products = state.products
    commit('setProducts', products)
  },
  // 增加货品
  async addProduct({ commit }, productData) {
    try {
      const response = await axios.post('/good/add', {
        product_name: productData.product_name,
        product_description: productData.product_description,
        category: productData.category,
        purchase_price: productData.purchase_price,
        retail_price: productData.retail_price,
        wholesale_price: productData.wholesale_price
      })
      commit('ADD_PRODUCT', response.data)
    } catch (error) {
      console.error('添加货品失败: ', error)
    }
  },
  // 修改货品
  async modifyProduct({ commit }, modifiedProductData) {
    try {
      const response = await axios.put('/good/modify', {
        product_id: modifiedProductData.product_id,
        new_produce_name: modifiedProductData.new_produce_name,
        new_product_description: modifiedProductData.new_product_description,
        new_category: modifiedProductData.new_category,
        new_purchase_price: modifiedProductData.new_purchase_price,
        new_retail_price: modifiedProductData.new_retail_price,
        new_wholesale_price: modifiedProductData.new_wholesale_price
      })
      commit('MODIFY_PRODUCT', response.data)
    } catch (error) {
      console.error('修改货品失败: ', error)
    }
  },
  // 删除货品
  async deleteProduct({ commit }, productId) {
    try {
      await axios.delete(`/good/delete`, {
        data: { id: productId }
      })
      commit('DELETE_PRODUCT', productId)
    } catch (error) {
      console.error('删除货品失败: ', error)
    }
  },
  // 查询货品（分页）
  async getProductList({ commit }, query) {
    try {
      const response = await axios.get('/good/list', {
        params: {
          pageNum: query.pageNum,
          pageSize: query.pageSize,
          category: query.category
        }
      })
      commit('SET_PRODUCT_LIST', response.data)
    } catch (error) {
      console.error('查询货品失败: ', error)
    }
  }
}

const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  ADD_PRODUCT(state, product) {
    state.productList.push(product)
  },
  DELETE_PRODUCT(state, productId) {
    state.productList = state.productList.filter(product => product.product_id !== productId)
  },
  MODIFY_PRODUCT(state, updatedProduct) {
    const index = state.productList.findIndex(product => product.product_id === updatedProduct.product_id)
    if (index !== -1) {
      state.productList.splice(index, 1, updatedProduct)
    }
  },
  SET_PRODUCT_LIST(state, products) {
    state.productList = products
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
