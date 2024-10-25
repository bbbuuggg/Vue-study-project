<!--
 * @Author: lsl
 * @Date: 2024-10-17 19:22:04
 * @LastEditors: lsl
 * @LastEditTime: 2024-10-18 00:34:48
 * @Description: 请填写简介
-->
<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div style="position:relative;">
      
      <!-- 销售单id -->
      <mallki class-name="mallki-text" :text="sale.slip_id" />
      <!-- 客户id -->
      <div style="padding-top:35px;" class="progress-item">
        <span><strong>客户id:</strong> {{ sale.customer_id }}</span>
      </div>
      <!-- 仓库id -->
      <div class="progress-item">
        <span><strong>仓库id:</strong> {{ sale.store_id }}</span>
      </div>
      <!-- 用户id -->
      <div class="progress-item">
        <span><strong>用户id:</strong> {{ sale.user_id }}</span>
      </div>
      <!-- 销售单状态 -->
      <div class="progress-item">
        <span><strong>销售单状态:</strong> {{ sale.state }}</span>
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
    sale: {
      type: Object,
      required: true,
      default: () => ({
        slip_id: '',
        customer_id: '',
        store_id: '',
        user_id: '',
        state: ''
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
.sale-list {
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

