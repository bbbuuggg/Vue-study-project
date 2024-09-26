<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <h2>挂出商品</h2>
    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button type="primary" @click="openAddProductDialog">增加商品</el-button>
      <!-- <el-button type="danger" :disabled="!selectedProduct" @click="deleteSelectedProduct">删除商品</el-button> -->
      <!-- <el-input v-model="searchCategory" placeholder="请输入类别" @change="searchProducts" /> -->
    </div>
    <div class="product-list">
      <box-card v-for="product in products" :key="product.product_id" :product="product" @click.native="editProduct(product)" />
    </div>
    <!-- 管理员端修改商品信息（直接修改的product.js中的信息） -->
    <el-dialog :visible.sync="dialogVisible" title="编辑商品信息">
      <el-form :model="editableProduct">
        <el-form-item label="商品名称">
          <el-input v-model="editableProduct.name" />
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="editableProduct.category" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editableProduct.price" type="number" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editableProduct.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
        <el-button type="danger" @click.stop="confirmDelete(editableProduct.product_id)">删除商品</el-button>
      </span>
    </el-dialog>
    <!-- 增加商品弹窗 -->
    <el-dialog :visible.sync="addDialogVisible" title="增加商品">
      <el-form :model="newProduct">
        <el-form-item label="商品名称">
          <el-input v-model="newProduct.product_name" />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="newProduct.product_description" />
        </el-form-item>
        <el-form-item label="商品类别">
          <el-input v-model="newProduct.category" />
        </el-form-item>
        <el-form-item label="进货价格">
          <el-input v-model="newProduct.purchase_price" type="number" />
        </el-form-item>
        <el-form-item label="零售价格">
          <el-input v-model="newProduct.retail_price" type="number" />
        </el-form-item>
        <el-form-item label="批发价格">
          <el-input v-model="newProduct.wholesale_price" type="number" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addProduct">增加</el-button>
      </span>
    </el-dialog>
    <!-- 删除商品弹窗 -->
    <!-- <el-popconfirm
      title="确定删除该商品吗？"
      @confirm="deleteSelectedProduct"
      @cancel="deleteDialogVisible = false"
    ><el-button slot="reference" type="danger">删除商品</el-button>
    </el-popconfirm> -->
    <el-dialog :visible.sync="deleteDialogVisible" title="确认删除" :z-index="3000">
      <span>确认删除商品 {{ selectedProduct ? selectedProduct.name : '' }} 吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteSelectedProduct">确认</el-button>
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
      selectedProduct: null, // 用于存储选中的商品
      deleteDialogVisible: false, // 控制删除确认对话框显示
      dialogVisible: false,
      addDialogVisible: false,
      editableProduct: {
        product_id: null,
        name: '',
        category: '',
        price: 0,
        description: ''
      },
      newProduct: {
        product_name: '',
        product_description: '',
        category: '',
        purchase_price: null,
        retail_price: '',
        wholesale_price: ''
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
    // 打开增加商品的弹窗
    openAddProductDialog() {
      this.newProduct = { name: '', category: '', price: 0, description: '' }
      this.addDialogVisible = true
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    // 选择商品
    selectProduct(product) {
      this.selectedProduct = product
    },
    editProduct(product) {
    // 深拷贝当前商品信息，以便编辑
      this.editableProduct = { ...product }
      this.dialogVisible = true
    },
    // 保存编辑商品
    saveProduct() {
      const index = this.products.findIndex(p => p.product_id === this.editableProduct.product_id)
      if (index !== -1) {
        this.products.splice(index, 1, { ...this.editableProduct })
      }
      this.dialogVisible = false
    },
    // 与后端交互的时候用下面这个修改货品
    // async modifyProduct({ commit }, modifiedProductData) {
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
    // 点击删除按钮，弹出确认对话框
    confirmDelete(productId) {
      console.log('try to delete')
      console.log('product_id: ', productId)
      const product = this.products.find(p => p.product_id === productId)
      this.dialogVisible = false
      this.deleteDialogVisible = true
      if (product) {
        this.selectedProduct = product
      }
    },
    // 确认删除商品
    deleteSelectedProduct() {
      const productId = this.selectedProduct?.product_id
      if (productId) {
        // 调用后端接口进行删除
        this.$axios.delete(`/good/delete`, { params: { id: productId }})
          .then(() => {
            // 删除成功后更新本地 products 列表
            this.products = this.products.filter(p => p.product_id !== productId)
            this.deleteDialogVisible = false
            this.selectedProduct = null
          })
          .catch(err => {
            console.error('删除商品失败:', err)
          })
      }
    },
    // 增加商品
    async addProduct() {
      try {
        console.log('增加商品', this.newProduct)
        const response = await this.$axios.post('/good/add', this.newProduct)
        this.products.push(response.data) // 更新本地数据
        this.addDialogVisible = false
      } catch (error) {
        console.error('增加商品失败', error)
      }
    },
    // 查询商品（按类别）
    async searchProducts() {
      try {
        const response = await this.$axios.get('/good/list', {
          params: {
            pageNum: 1, // 默认第一页
            pageSize: 10, // 默认显示10个
            category: this.searchCategory
          }
        })
        this.products = response.data.items // 更新本地数据
      } catch (error) {
        console.error('查询商品失败', error)
      }
    }
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
