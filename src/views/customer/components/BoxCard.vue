<!--
 
-->
<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div style="position:relative;">
      <!-- <pan-thumb :image="product.avatar" class="panThumb" /> -->
      <!-- 客户名称 -->
      <mallki class-name="mallki-text" :text="customer.name" />
      <!-- 客户性别 -->
      <div style="padding-top:35px;" class="progress-item">
        <span><strong>性别:</strong> {{ customer.sex }}</span>
      </div>
      <!-- 客户电话 -->
      <div class="progress-item">
        <span><strong>电话号码:</strong> {{ customer.telephone }}</span>
      </div>
      <!-- 客户种类 -->
      <div class="progress-item">
        <span><strong>类型:</strong> {{ customer.type }}</span>
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
    customer: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        sex: '',
        telephone: '',
        type: '',
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

