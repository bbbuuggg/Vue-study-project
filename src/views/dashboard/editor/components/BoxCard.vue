<!--
 * @Author: lsl
 * @Date: 2024-09-23 19:23:04
 * @LastEditors: lsl
 * @LastEditTime: 2024-09-24 22:23:11
 * @Description: 请填写简介
-->
<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <!-- 动态商品图片 -->
    <div slot="header" class="box-card-header">
      <img :src="product.image" :alt="product.name">
    </div>
    <div style="position:relative;">
      <!-- <pan-thumb :image="product.avatar" class="panThumb" /> -->
      <!-- 商品名称 -->
      <mallki class-name="mallki-text" :text="product.name" />
      <!-- 商品描述 -->
      <div style="padding-top:35px;" class="progress-item">
        <span><strong>描述:</strong> {{ product.description }}</span>
      </div>
      <!-- 商品类别 -->
      <div class="progress-item">
        <span><strong>类别:</strong> {{ product.category }}</span>
      </div>
      <!-- 商品价格 -->
      <div class="progress-item">
        <span><strong>零售价:</strong> ¥{{ product.price }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
// import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { Mallki },
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        image: '',
        avatar: '',
        feature1: '',
        feature1Percentage: 0,
        feature2: '',
        feature2Percentage: 0,
        feature3: '',
        feature3Percentage: 0,
        feature4: '',
        feature4Percentage: 0
      })
    }
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -8px; // 调整卡片的对齐方式
}

.box-card-component {
  width: calc(20% - 16px); // 控制每个box-card的宽度
  margin-left: 8px;
  margin-bottom: 20px;

  .box-card-header {
    position: relative;
    height: 220px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>

