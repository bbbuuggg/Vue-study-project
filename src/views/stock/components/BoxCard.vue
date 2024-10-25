<!--
-->
<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div style="position:relative;">
      <!-- 库存id -->
      <mallki class-name="mallki-text" :text="stock.stock_id" />
      <!-- 仓库id -->
      <div style="padding-top:35px;" class="progress-item">
        <span><strong>仓库id:</strong> {{ stock.store_id }}</span>
      </div>
      <!-- 商品id -->
      <div class="progress-item">
        <span><strong>商品id:</strong> {{ stock.product_id }}</span>
      </div>
      <!-- 商品数量 -->
      <div class="progress-item">
        <span><strong>商品数量:</strong> {{ stock.product_num }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
// import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  // PanThumb,
  components: { Mallki },
  props: {
    stock: {
      type: Object,
      required: true,
      default: () => ({
        stock_id: '',
        store_id: '',
        product_id: '',
        product_num: ''
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
.customer-list {
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

