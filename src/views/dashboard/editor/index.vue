<!--
 * @Author: lsl
 * @Date: 2024-10-17 19:22:04
 * @LastEditors: lsl
 * @LastEditTime: 2024-10-19 15:25:11
 * @Description: 请填写简介
-->
<template>
  <div class="dashboard-editor-container">
    <h2>商品展示</h2>
    <div class="product-list">
      <box-card v-for="product in products" :key="product.id" :product="product" />
    </div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <product-search :products="products" /> <!-- 传递产品列表 -->
    </el-row>
  </div>
</template>

<script>
// 引入货品管理和查询组件
// import ProductManagement from './components/ProductManagement'
import { mapGetters } from 'vuex'
import BoxCard from './components/BoxCard.vue'
import ProductSearch from './components/ProductSearch'

export default {
  name: 'EditorDashboard',
  components: {
    ProductSearch,
    BoxCard
  },
  computed: {
    ...mapGetters('product', {
      products: 'productList' // 从product模块获取products数据
    })
  },
  created() {
    console.log('editor roles', this.roles)
    console.log('this.store.roles', this.$store.state.user.roles)
    console.log('editorIndex product', this.$store.state.product)
    // this.$store.dispatch('product/fetchProducts') // 确保在创建时获取数据
    this.$store.dispatch('product/getProductList', {
      pageNum: 1, // 第1页
      pageSize: 100 // 每页显示10条数据
    })
    if (!this.$store.state.user.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    fetchProducts() {
      // 这里可以根据需要修改分页参数
      this.$store.dispatch('product/getProductList', {
        pageNum: 1, // 第1页
        pageSize: 100 // 每页显示100条数据
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; // 控制卡片之间的间距
  max-height: 600px; // 根据需要设置列表容器的最大高度
  overflow-y: auto; // 添加垂直滚动条
 }

 .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
 }
</style>
