<template>
  <div class="stock-editor-container">
    <!-- <github-corner class="github-corner" /> -->
    <h2>库存管理</h2>
    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="openAddStockDialog">进货入库</el-button>
      <!-- <el-input v-model="searchStore_id" placeholder="请输入仓库id" @change="searchStocks" /> -->
    </div>
    <div class="stock-list">
      <box-card v-for="stock in stocks" :key="stock.stock_id" :stock="stock" @click.native="editStock(stock)" />
    </div>
    <!-- 管理员端修改库存信息(销售出库)（直接修改的stock.js中的信息） -->
    <el-dialog :visible.sync="dialogVisible" title="销售出库">
      <el-form :model="editableStock">
        <el-form-item label="出库后产品数量">
          <el-input v-model="editableStock.product_num" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveStock">保存</el-button>
      </span>
    </el-dialog>
    <!-- 进货入库弹窗 -->
    <el-dialog :visible.sync="addDialogVisible" title="进货入库">
      <el-form :model="newStock">
        <el-form-item label="库存id">
          <el-input v-model="newStock.stock_id" type="number" />
        </el-form-item>
        <el-form-item label="仓库id">
          <el-input v-model="newStock.store_id" type="number" />
        </el-form-item>
        <el-form-item label="商品id">
          <!-- <div v-for="(product, index) in newStock.products" :key="index"> -->
           <el-input v-model="newStock.products.product_id" type="number" /> 
          <!-- <el-input v-model="newStock.products[index].product_id" type="number" /> -->
          <!-- </div> -->
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="newStock.product_num" type="number" />
          <div v-for="(product, index) in newStock.products" :key="index">
          <!-- <el-input v-model="newStock.products[index].product_num" type="number" /> -->
          <el-input v-model="newStock.products.product_num" type="number" />
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addStock">增加</el-button>
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
  name: 'StockAdmin',
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
      selectedStock: null, // 用于存储选中的库存
      dialogVisible: false,
      addDialogVisible: false,
      editableStock: {
        stock_id: null,
        store_id: null,
        products: [
          {
            product_id: null,
            product_num: null
          }
        ]
      },
      newStock: {
        stock_id: null,
        store_id: null,
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
      stocks: 'stock/stocks' // 从stock模块获取stocks数据
    })
  },
  methods: {
    // 打开进货入库的弹窗
    openAddStockDialog() {
      this.newStock = { stock_id: '', store_id: '', products: '' }
      this.addDialogVisible = true
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 选择库存
    selectStock(stock) {
      this.selectedStock = stock
    },
    editStock(stock) {
    // 深拷贝当前库存信息，以便编辑
      this.editableStock = { ...stock }
      this.dialogVisible = true
    },
    // 保存编辑库存
    saveStock() {
      const index = this.stocks.findIndex(p => p.stock_id === this.editableStock.stock_id)
      if (index !== -1) {
        this.stocks.splice(index, 1, { ...this.editableStock })
      }
      this.dialogVisible = false
    },
    // 与后端交互的时候用下面这个销售出库
    // async modifyStock({ commit }, modifiedStockData) {
    // try {
        // const response = await axios.put('/store/modify', {
          // new_store_id: modifiedStockData.new_store_id,
          // new_products: modifiedStockData.new_products
        // })
        // commit('MODIFY_STOCK', response.data)
      // } catch (error) {
        // console.error('出库失败: ', error)
      // }
    // },
    // 增加库存                             //delete
    async addStock() {
      try {
        console.log('进货入库', this.newStock)
        const response = await this.$axios.post('/store/add', this.newStock)
        this.stocks.push(response.data) // 更新本地数据
        this.addDialogVisible = false
      } catch (error) {
        console.error('进货入库失败', error)
      }
    },
    // 查询库存（按仓库编号）
    async searchStocks() {
      try {
        const response = await this.$axios.get('/store/detail', {
          params: {
            store_id: this.searchStore_id
          }
        })
        this.stocks = response.data.items // 更新本地数据
      } catch (error) {
        console.error('查询库存失败', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.stock-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }                          //stocks

  .stock-list {
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
