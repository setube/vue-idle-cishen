<template>
  <div class="main-menu">
    <h3 class="panel-title">主菜单</h3>
    <div class="menu-buttons">
      <n-button type="primary" size="large" class="menu-btn" @click="$router.push('/heroes')">角色</n-button>
      <n-button type="error" size="large" class="menu-btn" @click="$router.push('/skills')">技能</n-button>
      <n-button type="success" size="large" class="menu-btn" @click="$router.push('/pets')">宠物</n-button>
      <n-button type="info" size="large" class="menu-btn" @click="$router.push('/territory')">领地</n-button>
      <n-button type="warning" size="large" class="menu-btn" @click="$router.push('/dungeon')">副本</n-button>
      <n-button @click="$router.push('/equipment')" size="large" block>装备</n-button>
      <n-button @click="$router.push('/summon')" size="large" block>召唤</n-button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
