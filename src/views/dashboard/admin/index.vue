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
      <box-card v-for="product in products" :key="product.id" :product="product" @click.native="editProduct(product)" />
    </div>
    <!-- 管理员端修改商品信息（直接修改的product.js中的信息） -->
    <el-dialog :visible.sync="dialogVisible" title="编辑商品信息">
      <el-form :model="editableProduct">
        <el-form-item label="商品名称">
          <el-input v-model="editableProduct.productName" />
        </el-form-item>
        <el-form-item label="类别id">
          <el-input v-model.number="editableProduct.category" type="number" />
        </el-form-item>
        <el-form-item label="进货价格">
          <el-input v-model="editableProduct.purchase_price" type="number" />
        </el-form-item>
        <el-form-item label="零售价格">
          <el-input v-model="editableProduct.retail_price" type="number" />
        </el-form-item>
        <el-form-item label="批发价格">
          <el-input v-model="editableProduct.wholesale_price" type="number" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editableProduct.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
        <el-button type="danger" @click.stop="confirmDelete(editableProduct.productId)">删除商品</el-button>
      </span>
    </el-dialog>
    <!-- 增加商品弹窗 -->
    <el-dialog :visible.sync="addDialogVisible" title="增加商品">
      <el-form :model="newProduct">
        <el-form-item label="商品名称">
          <el-input v-model="newProduct.productName" />
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="newProduct.productDesc" />
        </el-form-item>
        <el-form-item label="商品类别id">
          <el-input v-model="newProduct.categoryId" type="number" /> <!-- 假设用户输入类别ID为数字 -->
        </el-form-item>
        <el-form-item label="进货价格">
          <el-input v-model="newProduct.purchasePrice" type="number" />
        </el-form-item>
        <el-form-item label="零售价格">
          <el-input v-model="newProduct.retailPrice" type="number" />
        </el-form-item>
        <el-form-item label="批发价格">
          <el-input v-model="newProduct.wholesalePrice" type="number" />
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
        product_id: null, // 商品 ID
        productName: '', // 商品名称
        categoryId: 0, // 商品类别
        purchase_price: null, // 进货价格
        retail_price: null, // 零售价格
        wholesale_price: null, // 批发价格
        description: '' // 商品描述
      },
      newProduct: {
        productName: '',        // 商品名称
        productDesc: '',       // 商品描述
        categoryId: null,      // 类别ID
        purchasePrice: null,   // 进货价格
        retailPrice: null,     // 零售价格
        wholesalePrice: null    // 批发价格
      },
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    ...mapGetters('product', {
      products: 'productList' // 从product模块获取products数据
    })
  },
  created() {
    console.log('admin roles', this.roles)
    console.log('this.store.roles', this.$store.state.user.roles)
    console.log('editorIndex product', this.$store.state.product)
    // this.$store.dispatch('product/fetchProducts') // 确保在创建时获取数据
    this.$store.dispatch('product/getProductList', {
      pageNum: 1, // 第1页
      pageSize: 100 // 每页显示10条数据
    })
  },
  methods: {
    fetchProducts() {
      // 这里可以根据需要修改分页参数
      this.$store.dispatch('product/getProductList', {
        pageNum: 1, // 第1页
        pageSize: 100 // 每页显示100条数据
      })
    },
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
      console.log('editab', this.editableProduct)
      this.dialogVisible = true
    },
    // 保存编辑商品
    async saveProduct() {
      // const index = this.products.findIndex(p => p.product_id === this.editableProduct.product_id)
      // if (index !== -1) {
      //   this.products.splice(index, 1, { ...this.editableProduct })
      // }
      // this.dialogVisible = false
      // 保存编辑商品
      try {
        // 构建请求体
        const modifiedProductData = {
          productId: this.editableProduct.productId,
          productName: this.editableProduct.productName,
          productDesc: this.editableProduct.description,
          categoryId: this.editableProduct.category,
          purchasePrice: this.editableProduct.purchase_price,
          retailPrice: this.editableProduct.retail_price,
          wholesalePrice: this.editableProduct.wholesale_price
        };
        console.log('modifiedProductData', modifiedProductData)
        // 发送请求到后端
        const response = await this.$axios.put('/good/update', modifiedProductData);
        
        // 更新本地 products 列表
        const index = this.products.findIndex(p => p.product_id === this.editableProduct.product_id);
        if (index !== -1) {
          this.products.splice(index, 1, response.data); // 使用后端返回的最新数据
        }
        // 重新获取商品列表
        this.fetchProducts(); // 重新获取商品列表
        // 关闭对话框
        this.dialogVisible = false;
      } catch (error) {
        console.error('修改商品失败:', error);
      }
    },
    // 点击删除按钮，弹出确认对话框
    confirmDelete(productId) {
      console.log('try to delete')
      console.log('productId: ', productId)
      const product = this.products.find(p => p.productId === productId)
      this.dialogVisible = false
      this.deleteDialogVisible = true
      if (product) {
        this.selectedProduct = product
      }
    },
    // 确认删除商品
    deleteSelectedProduct() {
      const productId = this.selectedProduct?.productId
      if (productId) {
        // 调用后端接口进行删除
        this.$axios.delete(`/good/delete`, { params: { id: productId }})
          .then(response => {
          console.log('删除商品成功:', response.data); // 打印后端响应
          // 重新获取商品列表
          this.fetchProducts(); // 重新获取商品列表
          // 调用 Vuex 的 action 来更新 products 列表
          // this.$store.dispatch('product/removeProduct', productId);
          this.deleteDialogVisible = false; // 关闭删除确认对话框
          this.selectedProduct = null; // 重置选中的商品
        })
        .catch(err => {
          console.error('删除商品失败:', err); // 打印错误信息
        });
        }
    },
    // 增加商品
    async addProduct() {
      try {
        console.log('增加商品', this.newProduct);
        
        // 构建请求体
        const requestBody = {
          productName: this.newProduct.productName,
          productDesc: this.newProduct.productDesc,
          categoryId: this.newProduct.categoryId, // 确保这个值是一个有效的数字
          purchasePrice: this.newProduct.purchasePrice,
          retailPrice: this.newProduct.retailPrice,
          wholesalePrice: this.newProduct.wholesalePrice
        };

        // 发送 POST 请求
        const response = await this.$axios.post('/good/add', requestBody);
        
        // 更新本地数据
        // this.products.push(response.data); // 假设后端返回新添加的商品数据
        this.fetchProducts(); // 重新获取商品列表
        this.addDialogVisible = false; // 关闭添加商品的对话框
        this.newProduct = {             // 重置 newProduct
          productName: '',
          productDesc: '',
          categoryId: null,
          purchasePrice: null,
          retailPrice: null,
          wholesalePrice: null
        };
      } catch (error) {
        console.error('增加商品失败', error); // 打印错误信息
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
