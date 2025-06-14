<template>
  <div class="home-container">
    <!-- 顶部资源栏 -->
    <div class="top-section">
      <TopResourceBar />
    </div>
    <div class="top-section">
      <QuestPanel />
    </div>
    <!-- 战斗区域 -->
    <div class="battle-section">
      <BattlePanel />
    </div>
    <!-- 数值升级区域 -->
    <div class="upgrade-section">
      <AttributeUpgrade />
    </div>
    <!-- 中部区域 -->
    <div class="middle-section">
      <!-- 左侧任务进度 -->
      <div class="left-panel"></div>
      <!-- 右侧功能入口 -->
      <div class="right-panel">
        <FeaturePanel />
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="bottom-section">
      <!-- 左侧角色属性和强化 -->
      <div class="left-panel"></div>
      <!-- 右侧主菜单 -->
      <div class="right-panel">
        <MainMenu />
      </div>
    </div>
  </div>
</template>

<script setup>
  import TopResourceBar from '../components/TopResourceBar.vue'
  import BattlePanel from '../components/BattlePanel.vue'
  import AttributeUpgrade from '../components/AttributeUpgrade.vue'
  import QuestPanel from '../components/QuestPanel.vue'
  import FeaturePanel from '../components/FeaturePanel.vue'
  import MainMenu from '../components/MainMenu.vue'
</script>

<style scoped>
  .top-section,
  .battle-section,
  .pet-section,
  .upgrade-section {
    margin-bottom: 16px;
  }

  .middle-section,
  .bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .left-panel,
  .right-panel {
    min-height: 200px;
  }

  @media (max-width: 768px) {
    .middle-section,
    .bottom-section {
      grid-template-columns: 1fr;
    }
  }
</style>
