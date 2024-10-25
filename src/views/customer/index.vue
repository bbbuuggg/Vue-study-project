<template>
  <div class = "customer-editor-container">
    <h2>客户</h2>
    <h2>编辑客户</h2>
    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="openAddCustomerDialog">增加客户</el-button>
      <el-input v-model="searchType" placeholder="请输入类别" @change="searchCustomers" /> 
    </div>
    <div class="customer-list">
      <box-card v-for="customer in customers" :key="customer.customer_id" :customer="customer" @click.native="editCustomer(customer)" />
    </div>
    <!-- 管理员端修改客户信息（直接修改的customer.js中的信息） -->
    <el-dialog :visible.sync="dialogVisible" title="编辑客户信息">
      <el-form :model="editableCustomer">
        <el-form-item label="客户名称">
          <el-input v-model="editableCustomer.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="editableCustomer.sex" />         
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="editableCustomer.telephone" type="string" />
        </el-form-item>
        <el-form-item label="客户类型">
          <el-input v-model="editableCustomer.type" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCustomer">保存</el-button>
        <el-button type="danger" @click.stop="confirmDelete(editableCustomer.customer_id)">删除客户</el-button>
      </span>
    </el-dialog>
    <!-- 增加客户弹窗 -->
    <el-dialog :visible.sync="addDialogVisible" title="增加客户">
      <el-form :model="newCustomer">
        <el-form-item label="客户名称">
          <el-input v-model="newCustomer.customer_name" />
        </el-form-item>
        <el-form-item label="客户性别">
          <el-input v-model="newCustomer.customer_sex" />
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model="newCustomer.telephone" />
        </el-form-item>
        <el-form-item label="客户类型">
          <el-input v-model="newCustomer.type"  />
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCustomer">增加</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="deleteDialogVisible" title="确认删除" :z-index="3000">
      <span>确认删除客户 {{ selectedCustomer ? selectedCustomer.name : '' }} 吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteSelectedCustomer">确认</el-button>
      </span>
    </el-dialog>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!-- 下面这里是选用了折线图，下方的raddar、pie、bar都可以换用 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// 要用其他数据图形化的话要取消下面三个注释
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { mapGetters } from 'vuex'

// 数据填充处，分别对应newvisitis、messages、purchases、shopping数据
// 后端需要展示其他数据的话把下面换掉就行
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'CustomerAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    // 要用其他数据图形化的话要取消下面三个注释
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    BoxCard
  },
  data() {
    return {
      selectedCustomer: null, // 用于存储选中的商品
      deleteDialogVisible: false, // 控制删除确认对话框显示
      dialogVisible: false,
      addDialogVisible: false,
      editableCustomer: {
        customer_id: null,
        name: '',
        sex: '',
        telephone: '',
        type: ''
      },
      newCustomer: {
        customer_name: '',
        customer_sex: '',                 //?
        telephone: '',
        type: null,
        
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters({
      customers: 'customer/customers' // 从customer模块获取customers数据
    })
  },
  methods: {
    // 打开增加客户的弹窗
    openAddCustomerDialog() {
      this.newCustomer = { name: '', sex: '', telephone: '', type: '' }
      this.addDialogVisible = true
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 选择客户
    selectCustomer(customer) {
      this.selectedCustomer = customer
    },
    editCustomer(customer) {
    // 深拷贝当前客户信息，以便编辑
      this.editableCustomer = { ...customer }
      this.dialogVisible = true
    },
    // 保存编辑客户
    saveCustomer() {
      const index = this.customers.findIndex(p => p.customer_id === this.editableCustomer.customer_id)
      if (index !== -1) {
        this.customers.splice(index, 1, { ...this.editableCustomer })
      }
      this.dialogVisible = false
    },
    // 与后端交互的时候用下面这个修改货品
    //async modifyCustomer({ commit }, modifiedCustomerData) {
    //  try {
    //    const response = await axios.put('/customer/modify', {
    //    customer_id: modifiedCustomerData.customer_id,
    //    new_customer_name: modifiedCustomerData.new_customer_name,
    //    new_customer_sex: modifiedCustomerData.new_customer_sex,
    //    new_telephone: modifiedCustomerData.new_telephone,
    //    new_customer_type: modifiedCustomerData.new_customer_type
    //  })
    //  commit('MODIFY_CUSTOMER', response.data)
    //  } catch (error) {
    //    console.error('修改客户失败: ', error)
    //  }
    // },

    // 点击删除按钮，弹出确认对话框
    confirmDelete(customerId) {
      console.log('try to delete')
      console.log('customer_id: ', customerId)
      const customer = this.customers.find(p => p.customer_id === customerId)
      this.dialogVisible = false
      this.deleteDialogVisible = true
      if (customer) {
        this.selectedCustomer = customer
      }
    },
    // 确认删除客户
    deleteSelectedCustomer() {
      const customerId = this.selectedCustomer?.customer_id
      if (customerId) {
        // 调用后端接口进行删除
        this.$axios.delete(`/customer/delete`, { params: { id: customerId }})
          .then(() => {
            // 删除成功后更新本地 customers 列表
            this.customers = this.customers.filter(p => p.customer_id !== customerId)
            this.deleteDialogVisible = false
            this.selectedCustomer = null
          })
          .catch(err => {
            console.error('删除客户失败:', err)
          })
      }
    },
    // 增加客户
    async addCustomer() {
      try {
        console.log('增加客户', this.newCustomer)
        const response = await this.$axios.post('/customer/add', this.newCustomer)
        this.customers.push(response.data) // 更新本地数据
        this.addDialogVisible = false
      } catch (error) {
        console.error('增加客户失败', error)
      }
    },
    // 查询商品（按类别）
    async searchCustomers() {
      try {
        const response = await this.$axios.get('/customer/list', {
          params: {
            pageNum: 1, // 默认第一页
            pageSize: 10, // 默认显示10个
            type: this.searchType
          }
        })
        this.customers = response.data.items // 更新本地数据
      } catch (error) {
        console.error('查询客户失败', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .customer-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; // 控制卡片之间的间距
  max-height: 600px; // 根据需要设置列表容器的最大高度
  overflow-y: auto; // 添加垂直滚动条
 }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

</style>


client