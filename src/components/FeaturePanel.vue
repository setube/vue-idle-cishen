<template>
  <div class="feature-panel">
    <div class="feature-buttons">
      <n-icon size="30" v-for="(item, index) in menuList" :key="index" class="menu-btn" @click="goUrl(item.url)">
        <component :is="route.path !== item.url ? item.icon : HomeOutline" />
      </n-icon>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import {
    PersonOutline,
    ReceiptOutline,
    PawOutline,
    ShirtOutline,
    StorefrontOutline,
    HomeOutline,
    SettingsOutline
  } from '@vicons/ionicons5'

  const route = useRoute()
  const router = useRouter()

  const menuList = [
    {
      icon: PersonOutline,
      url: '/heroes'
    },
    {
      icon: ReceiptOutline,
      url: '/skills'
    },
    {
      icon: PawOutline,
      url: '/pets'
    },
    {
      icon: ShirtOutline,
      url: '/equipment'
    },
    {
      icon: StorefrontOutline,
      url: '/summon'
    },
    {
      icon: SettingsOutline,
      url: '/setting'
    }
  ]

  const goUrl = url => {
    router.push(route.path !== url ? url : '/')
  }
</script>

<style scoped>
  .menu-btn {
    width: 15%;
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
