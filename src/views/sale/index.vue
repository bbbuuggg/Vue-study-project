<template>
  <div class="sale-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <h2>销售单管理</h2>
    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="openAddSaleDialog">开销售单</el-button>
    </div>
    <div class="sale-list">
      <box-card v-for="sale in sales" :key="sale.slip_id" :sale="sale" @click.native="editSale(sale)" />
    </div>
    <!-- 管理员端审核销售单 -->
    <el-dialog :visible.sync="dialogVisible" title="审核销售单信息">
      <el-form :model="editableSale">
        <el-switch v-model="editableSale.state" :active-value="1" :inactive-value="0" />
      </el-form>
      <p v-if="editableSale.state > 0">审批通过</p>
      <p v-else>审批未通过</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveSale">保存</el-button>
        <el-button type="danger" @click.stop="confirmDelete(editableSale.slip_id)">退货</el-button>
      </span>
    </el-dialog>
    <!-- 开销售单弹窗 -->
    <el-dialog :visible.sync="addDialogVisible" title="开销售单">
      <el-form :model="newSale">
        <el-form-item label="开单用户编号">
          <el-input v-model="newSale.user_id" />
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="newSale.customer_id" />
        </el-form-item>
        <el-form-item label="仓库编号">
          <el-input v-model="newSale.store_id" />
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="newSale.products.product_id" type="number" />
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="newSale.products.product_num" type="number" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addSale">增加</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="deleteDialogVisible" title="确认退货" :z-index="3000">
      <span>确认退货销售单编号为 {{ selectedSale ? selectedSale.slip_id : '' }} 吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteSelectedSale">确认</el-button>
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
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// 要用其他数据图形化的话要取消下面三个注释
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'           products
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
  name: 'SaleAdmin',
  components: {
    // GithubCorner,                  product
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
      selectedSale: null, // 用于存储选中的商品
      deleteDialogVisible: false, // 控制删除确认对话框显示
      dialogVisible: false,
      addDialogVisible: false,
      editableSale: {
        slip_id: null,
        customer_id: '',
        store_id: '',
        user_id: null,
        state: 0,
        products: [
          {
            product_id: null,
            product_num: null
          }
        ]
      },
      newSale: {
        slip_id: null,
        customer_id: null,
        store_id: null,
        user_id: null,
        state: 0,
        products: [
          {
            product_id: null,
            product_num: null
          }
        ]
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters({
      sales: 'sale/sales' // 从sale模块获取sales数据
    })
  },
  methods: {
    // 打开开销售单的弹窗
    openAddSaleDialog() {
      this.newSale = { slip_id: 0, customer_id: 0, store_id: 0, user_id: 0, state: 0, products: '' }
      this.addDialogVisible = true
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 选择销售单
    selectSale(sale) {
      this.selectedSale = sale
    },
    editSale(sale) {
    // 深拷贝当前销售单信息，以便编辑
      this.editableSale = { ...sale }
      this.dialogVisible = true
    },
    // 保存审核销售单
    saveSale() {
      const index = this.sales.findIndex(p => p.slip_id === this.editableSale.slip_id)
      if (index !== -1) {
        this.sales.splice(index, 1, { ...this.editableSale })
      }
      this.dialogVisible = false
    },
    // 与后端交互的时候用下面这个修改货品
    // async modifySale({ commit }, modifiedProductData) {
    //   try {
    //     const response = await axios.put('/good/modify', {
    //       product_id: modifiedProductData.product_id,
    //       new_produce_name: modifiedProductData.new_produce_name,
    //       new_product_description: modifiedProductData.new_product_description,
    //       new_category: modifiedProductData.new_category,
    //       new_purchase_price: modifiedProductData.new_purchase_price,
    //       new_retail_price: modifiedProductData.new_retail_price,
    //       new_wholesale_price: modifiedProductData.new_wholesale_price
    //     })
    //     commit('MODIFY_PRODUCT', response.data)
    //   } catch (error) {
    //     console.error('修改货品失败: ', error)
    //   }
    // },
    // 点击退货按钮，弹出确认对话框
    confirmDelete(slipId) {
      console.log('try to delete')
      console.log('slip_id: ', slipId)
      const sale = this.sales.find(p => p.slip_id === slipId)
      this.dialogVisible = false
      this.deleteDialogVisible = true
      if (sale) {
        this.selectedSale = sale
      }
    },
    // 确认退货
    // deleteSelectedSale() {
    //   const slipId = this.selectedSale?.slip_id
    //   if (saleId) {
    //     // 调用后端接口进行删除
    //     this.$axios.delete(`/sale/delete`, { params: { id: slipId }})
    //       .then(() => {
    //         // 删除成功后更新本地 sales 列表
    //         this.sales = this.sales.filter(p => p.slip_id !== slipId)
    //         this.deleteDialogVisible = false
    //         this.selectedSale = null
    //       })
    //       .catch(err => {
    //         console.error('退货失败:', err)
    //       })
    //   }
    // },
    // 开销售单
    async addSale() {
      try {
        console.log('开销售单', this.newSale)
        const response = await this.$axios.post('/sale/add', this.newSale)
        this.sales.push(response.data) // 更新本地数据
        this.addDialogVisible = false
      } catch (error) {
        console.error('开销售单失败', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sale-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .sale-list {
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
