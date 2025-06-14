<template>
  <div class="feature-panel">
    <h3 class="panel-title">功能入口</h3>
    <div class="feature-buttons">
      <n-button type="primary" size="large" class="feature-btn" @click="openFeature('giant-screen')">巨幕</n-button>
      <n-button type="info" size="large" class="feature-btn" @click="openFeature('competition')">竞赛</n-button>
      <n-button type="warning" size="large" class="feature-btn" @click="openFeature('activity')">活动</n-button>
    </div>
  </div>
</template>

<script setup>
  import { NButton } from 'naive-ui'

  const openFeature = featureType => {
    console.log(`打开功能: ${featureType}`)
    // 这里可以添加路由跳转或弹窗逻辑
  }
</script>

<style scoped>
  .feature-panel {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    border: 2px solid #e9ecef;
  }

  .panel-title {
    margin: 0 0 12px 0;
    color: #495057;
    font-size: 16px;
  }

  .feature-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-btn {
    width: 100%;
    height: 48px;
  }
</style>
