/*

*/
//
import axios from 'axios'

const state = {
  stocks: [
    {
      stock_id: 1,
      store_id: 1,
      product_id: 1,
      product_num: 1
    },
    {
      stock_id: 2,
      store_id: 2,
      product_id: 2,
      product_num: 2
    },
    {
      stock_id: 3,
      store_id: 3,
      product_id: 3,
      product_num: 3
    },
    {
      stock_id: 4,
      store_id: 4,
      product_id: 4,
      product_num: 4
    },
    {
      stock_id: 5,
      store_id: 5,
      product_id: 5,
      product_num: 5
    },
    {
      stock_id: 6,
      store_id: 6,
      product_id: 6,
      product_num: 6
    }
  ]
}

const getters = {
  stocks: state => state.stocks
}

// 与后端交互的时候用下面这两个const
// const state = {
//   stockList: []
// }                                  stockId

// const getters = {
//   stockList: state => state.stockList
// }

const actions = {
  fetchStocks({ commit }) {
    // 这里模拟从API获取产品数据
    // const stocks = [
    //   
    // ]
    const stocks = state.stocks
    commit('setStocks', stocks)
  },
  //获取仓库库存
  async fetchStockDetail({ commit }, storeId) {
    try {
      await axios.get(`/store/detail`, {
        data: { id: storeId }
      })
      commit('SET_STOCK_DETAIL', response.data)
    } catch (error) {
      console.error('获取仓库库存失败: ', error)
    }
  },
  // 进货
  async addStock({ commit }, stockData) {
    try {
      const response = await axios.post('/store/add', {
        store_id: stockData.store_id,
        product_id: stockData.product_id,
        product_num: stockData.product_num
      })
      commit('ADD_STOCK', response.data)
    } catch (error) {
      console.error('进货失败: ', error)
    }
  },
  // 销售出库
  async modifyStock({ commit }, modifiedStockData) {
    try {
      const response = await axios.put('/store/modify', {
        new_store_id: modifiedStockData.new_store_id,
        new_product_id: modifiedStockData.new_product_id,
        new_product_num: modifiedStockData.new_product_num
      })
      commit('MODIFY_STOCK', response.data)
    } catch (error) {
      console.error('出库失败: ', error)
    }
  },


}

const mutations = {
  setStocks(state, stocks) {
    state.stocks = stocks
  },
  ADD_STOCK(state, stock) {
    state.stockList.push(stock)
  },
  MODIFY_STOCK(state, updatedstock) {
    const index = state.stockList.findIndex(stock => stock.store_id === updatedstock.store_id)
    if (index !== -1) {
      state.stockList.splice(index, 1, updatedstock)
    }
  },
  /*SET_STOCK_LIST(state, stocks) {
    state.stockList = stocks
  },*/
  SET_STOCK_DETAIL(state, stock) {
    state.stock = stock
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}                            
