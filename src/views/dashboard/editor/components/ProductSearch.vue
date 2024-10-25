<!--
 * @Author: lsl
 * @Date: 2024-09-23 19:18:23
 * @LastEditors: lsl
 * @LastEditTime: 2024-10-19 15:32:09
 * @Description: 请填写简介
-->
<template>
  <div>
    <el-input v-model="searchQuery" placeholder="请输入货品名称"></el-input>
    <el-button @click="handleSearch">查询</el-button>

    <el-table :data="filteredProducts" style="width: 100%">
      <el-table-column prop="productName" label="货品名称" width="180"></el-table-column>
      <el-table-column prop="wholesalePrice" label="价格" width="180"></el-table-column>
      <el-table-column prop="productDesc" label="描述" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchQuery: '' // 查询关键词
    }
  },
  computed: {
    ...mapGetters('product', {
      products: 'productList' // 从product模块获取products数据
    }),
    filteredProducts() {
      return this.products.filter(product => product.productName.includes(this.searchQuery))
    }
  },
  methods: {
    handleSearch() {
      // 在这里可以添加其他搜索逻辑
      console.log('Searching for:', this.searchQuery)
      console.log('Filtered Products:', this.filteredProducts) // 打印匹配的产品
    }
  }
}
</script>
