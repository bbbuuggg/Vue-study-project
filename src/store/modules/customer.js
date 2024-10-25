/*

*/
//
import axios from 'axios'

const state = {
  customers: [
    {
      customer_id: 1,
      name: '客户1',
      sex: 'Male',
      telephone: '12306',
      type: 'retail'
    },
    {
      customer_id: 2,
      name: '客户2',
      sex: 'Male',
      telephone: '12305',
      type: 'retail'
    },
    {
      customer_id: 3,
      name: '客户3',
      sex: 'Female',
      telephone: '12304',
      type: 'retail'
    },
    {
      customer_id: 4,
      name: '客户4',
      sex: 'Female',
      telephone: '12303',
      type: 'wholesale'
    },
    {
      customer_id: 5,
      name: '客户5',
      sex: 'Other',
      telephone: '12302',
      type: 'wholesale'
    },
    {
      customer_id: 6,
      name: '客户6',
      sex: 'Prefer not to say',
      telephone: '12301',
      type: 'wholesale'
    }
  ]
}

const getters = {
  customers: state => state.customers
}

// 与后端交互的时候用下面这两个const
// const state = {
//   customerList: []
// }

// const getters = {
//   customerList: state => state.customerList
// }

const actions = {
  fetchCustomers({ commit }) {
    // 这里模拟从API获取产品数据
    // const customers = [
    //   { id: 1, name: 'Customer A', sex:  },
    //   { id: 2, name: 'Customer B', description: 'Description B' }
    // ]
    const customers = state.customers
    commit('setCustomers', customers)
  },
  //获取客户个人信息
  async fetchCustomerDetail({ commit }, customerId) {
    try {
      await axios.get(`/customer/detail`, {
        data: { id: customerId }
      })
      commit('SET_CUSTOMER_DETAIL', response.data)
    } catch (error) {
      console.error('获取客户个人信息失败: ', error)
    }
  },
  // 增加客户
  async addCustomer({ commit }, customerData) {
    try {
      const response = await axios.post('/customer/add', {
        customer_name: customerData.customer_name,
        sex: customerData.sex,
        telephone: customerData.telephone,
        customer_type: customerData.customer_type
      })
      commit('ADD_CUSTOMER', response.data)
    } catch (error) {
      console.error('添加客户失败: ', error)
    }
  },
  // 修改客户
  async modifyCustomer({ commit }, modifiedCustomerData) {
    try {
      const response = await axios.put('/customer/modify', {
        customer_id: modifiedCustomerData.customer_id,
        new_customer_name: modifiedCustomerData.new_customer_name,
        new_customer_sex: modifiedCustomerData.new_customer_sex,
        new_telephone: modifiedCustomerData.new_telephone,
        new_customer_type: modifiedCustomerData.new_customer_type
      })
      commit('MODIFY_CUSTOMER', response.data)
    } catch (error) {
      console.error('修改客户失败: ', error)
    }
  },
  // 删除客户
  async deleteCustomer({ commit }, customerId) {
    try {
      await axios.delete(`/customer/delete`, {
        data: { id: customerId }
      })
      commit('DELETE_CUSTOMER', customerId)
    } catch (error) {
      console.error('删除客户失败: ', error)
    }
  },
  // 查询客户（分页）
  async getCustomerList({ commit }, query) {
    try {
      const response = await axios.get('/customer/list', {
        params: {
          pageNum: query.pageNum,
          pageSize: query.pageSize,
          customer_type: query.customer_type
        }
      })
      commit('SET_CUSTOMER_LIST', response.data)
    } catch (error) {
      console.error('查询客户失败: ', error)
    }
  }
}

const mutations = {
  setCustomers(state, customers) {
    state.customers = customers
  },
  ADD_CUSTOMER(state, customer) {
    state.customerList.push(customer)
  },
  DELETE_CUSTOMER(state, customerId) {
    state.customerList = state.customerList.filter(customer => customer.customer_id !== customerId)
  },
  MODIFY_CUSTOMER(state, updatedcustomer) {
    const index = state.customerList.findIndex(customer => customer.customer_id === updatedcustomer.customer_id)
    if (index !== -1) {
      state.customerList.splice(index, 1, updatedcustomer)
    }
  },
  SET_CUSTOMER_LIST(state, customers) {
    state.customerList = customers
  },
  SET_CUSTOMER_DETAIL(state, customer) {
    state.customer = customer
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

