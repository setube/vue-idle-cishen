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
  </div>
</template>

<script setup>
  import TopResourceBar from '../components/TopResourceBar.vue'
  import BattlePanel from '../components/BattlePanel.vue'
  import AttributeUpgrade from '../components/AttributeUpgrade.vue'
  import QuestPanel from '../components/QuestPanel.vue'
</script>

<style scoped>
  .top-section,
  .battle-section,
  .pet-section,
  .upgrade-section {
    margin-bottom: 16px;
  }

  .middle-section{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .middle-section {
      grid-template-columns: 1fr;
    }
  }
</style>
