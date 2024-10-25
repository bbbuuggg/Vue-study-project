/*

*/
//
import axios from 'axios'

const state = {
  sales: [
    {
      slip_id: 1,
      customer_id: 1,
      store_id: 1,
      user_id: 1,
      product_id: 1,
      product_num: 1,
      state: 0
    },
    {
      slip_id: 2,
      customer_id: 2,
      store_id: 2,
      user_id: 2,
      product_id: 2,
      product_num: 2,
      state: 0
    },
    {
      slip_id: 3,
      customer_id: 3,
      store_id: 3,
      user_id: 3,
      product_id: 3,
      product_num: 3,
      state: 0
    },
    {
      slip_id: 4,
      customer_id: 4,
      store_id: 4,
      user_id: 4,
      product_id: 4,
      product_num: 4,
      state: 0
    },
    {
      slip_id: 5,
      customer_id: 5,
      store_id: 5,
      user_id: 5,
      product_id: 5,
      product_num: 5,
      state: 0
    },
    {
      slip_id: 6,
      customer_id: 6,
      store_id: 6,
      user_id: 6,
      product_id: 6,
      product_num: 6,
      state: 0
    }
  ]
}

const getters = {
  sales: state => state.sales
}

// 与后端交互的时候用下面这两个const
// const state = {
//   saleList: []
// }                                  

// const getters = {
//   saleList: state => state.saleList
// }

const actions = {
  fetchSales({ commit }) {
    // 这里模拟从API获取产品数据
    // const sales = [
    //   
    // ]
    const sales = state.sales
    commit('setSales', sales)
  },
  //获取销售单信息
  async fetchSaleDetail({ commit }, slipId) {
    try {
      await axios.get(`/sale/detail`, {
        data: { id: slipId }
      })
      commit('SET_SALE_DETAIL', response.data)
    } catch (error) {
      console.error('获取销售单信息失败: ', error)
    }
  },
  // 开销售单
  async addSale({ commit }, saleData) {
    try {
      const response = await axios.post('/sale/add', {
        user_id: saleData.user_id,
        customer_id: saleData.customer_id,
        store_id: saleData.store_id,
        product_id: saleData.product_id,
        product_num: saleData.product_num
      })
      commit('ADD_SALE', response.data)
    } catch (error) {
      console.error('开销售单失败失败: ', error)
    }
  },
  // 审核销售单
  async modifySale({ commit }, modifiedSaleData) {
    try {
      const response = await axios.post('/sale/examine', {
        new_state: modifiedSaleData.new_state
      })
      commit('MODIFY_SALE', response.data)
    } catch (error) {
      console.error('审核失败: ', error)
    }
  },

  // 退货
  async deleteSale({ commit }, slipId) {
    try {
      await axios.delete(`/sale/delete`, {
        data: { id: slipId }
      })
      commit('DELETE_SALE', slipId)
    } catch (error) {
      console.error('退货失败: ', error)
    }
  },

  // 获取销售单列表
  async getSaleList({ commit }, query) {
    try {
      const response = await axios.get('/sale/list', {
        params: {
          state: query.state
        }
      })
      commit('SET_SALE_LIST', response.data)
    } catch (error) {
      console.error('获取销售单列表失败: ', error)
    }
  }
}

const mutations = {
  setSales(state, sales) {
    state.sales = sales
  },
  ADD_SALE(state, sale) {
    state.saleList.push(sale)
  },
  MODIFY_SALE(state, updatedsale) {
    const index = state.saleList.findIndex(sale => sale.state === updatedsale.state)
    if (index !== -1) {
      state.saleList.splice(index, 1, updatedsale)
    }
  },
  SET_SALE_LIST(state, sales) {
    state.saleList = sales
  },
  SET_SALE_DETAIL(state, sale) {
    state.sale = sale
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}                            
