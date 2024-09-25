<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <h2>挂出商品</h2>
    <div class="product-list">
      <box-card v-for="product in products" :key="product.id" :product="product" @click.native="editProduct(product)" />
    </div>
    <!-- 管理员端修改商品信息（直接修改的product.js中的信息） -->
    <el-dialog :visible.sync="dialogVisible" title="编辑商品信息">
      <el-form :model="editableProduct">
        <el-form-item label="商品名称">
          <el-input v-model="editableProduct.name"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="editableProduct.category"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editableProduct.price" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editableProduct.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
      </span>
    </el-dialog>

    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row :gutter="8">
      <!-- <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col> -->
      <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col> -->
      <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col> -->

      <!-- 下面这里是选用了折线图，下方的raddar、pie、bar都可以换用 -->
    </el-row>
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
  name: 'DashboardAdmin',
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
      dialogVisible: false,
      editableProduct: {
        id: null,
        name: '',
        category: '',
        price: 0,
        description: ''
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters({
      products: 'product/products' // 从product模块获取products数据
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 和后端交互的话下面两个函数要换
    editProduct(product) {
    // 深拷贝当前商品信息，以便编辑
      this.editableProduct = { ...product }
      this.dialogVisible = true
    },
    saveProduct() {
      const index = this.products.findIndex(p => p.id === this.editableProduct.id)
      if (index !== -1) {
        this.products.splice(index, 1, { ...this.editableProduct })
      }
      this.dialogVisible = false
    }
    // 和后端交互大概是这样
    // async saveProduct() {
    // try {
    //   // 调用后端API，发送PUT请求更新商品信息
    //   const response = await axios.put(`/api/products/${this.editableProduct.id}`, this.editableProduct)
    //   // 更新成功后，关闭对话框并更新本地数据
    //   this.$message.success('商品更新成功')
    //   this.dialogVisible = false
    //   可选：重新获取商品列表或者更新局部的商品数据
    //   this.fetchProducts() // 或者直接更新本地 products 数据
    // } catch (error) {
    //   this.$message.error('商品更新失败')
    // }
    // },
    // // 获取商品数据的方法
    // fetchProducts() {
    //   axios.get('/api/products').then(response => {
    //     this.products = response.data
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .product-list {
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
