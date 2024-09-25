<!--
 * @Author: lsl
 * @Date: 2024-09-23 19:18:23
 * @LastEditors: lsl
 * @LastEditTime: 2024-09-23 19:18:36
 * @Description: 请填写简介
-->
<template>
  <div>
    <el-input v-model="searchQuery" placeholder="请输入货品名称"></el-input>
    <el-button @click="handleSearch">查询</el-button>

    <el-table :data="filteredProducts" style="width: 100%">
      <el-table-column prop="name" label="货品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="价格" width="180"></el-table-column>
      <el-table-column prop="quantity" label="数量" width="180"></el-table-column>
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
    ...mapGetters({
      products: 'product/products' // 从Vuex中获取商品信息
    }),
    filteredProducts() {
      return this.products.filter(product => product.name.includes(this.searchQuery))
    }
  },
  methods: {
    handleSearch() {
      // 可根据需要在此处增加搜索逻辑
    }
  }
}
</script>
