<template>
  <div class="feature-panel">
    <div class="feature-buttons">
      <n-button
        v-for="(item, index) in menuList"
        :key="index"
        :type="item.type"
        size="large"
        class="menu-btn"
        @click="goUrl(item.url)"
      >
        {{ route.path !== item.url ? item.name : '首页' }}
      </n-button>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  const menuList = [
    {
      name: '角色',
      url: '/heroes',
      type: 'primary'
    },
    {
      name: '技能',
      url: '/skills',
      type: 'error'
    },
    {
      name: '宠物',
      url: '/pets',
      type: 'success'
    },
    {
      name: '装备',
      url: '/equipment',
      type: 'warning'
    },
    {
      name: '召唤',
      url: '/summon',
      type: 'info'
    }
  ]

  const goUrl = url => {
    router.push(route.path !== url ? url : '/')
  }
</script>

<style scoped>
  .menu-btn {
    margin-right: 5px;
  }

  .feature-panel {
    background: #f8f9fa;
    padding: 16px 0;
    border: 2px solid #e9ecef;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .panel-title {
    margin: 0 0 12px 0;
    color: #495057;
    font-size: 16px;
  }

  .feature-buttons {
    display: flex;
    justify-content: center;
  }

  .feature-btn {
    width: 100%;
    height: 48px;
  }
</style>
