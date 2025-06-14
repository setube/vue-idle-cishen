<template>
  <div class="hero-page">
    <div class="page-header">
      <h2>角色管理</h2>
    </div>

    <n-tabs v-model:value="activeTab" type="line" animated>
      <n-tab-pane name="heroes" tab="角色列表">
        <div class="hero-grid">
          <div 
            v-for="hero in gameStore.heroes.ownedHeroes" 
            :key="hero.id" 
            class="hero-card"
            @click="showHeroDetailModal(hero)"
          >
            <div class="hero-avatar">
              <div class="hero-icon">{{ getHeroData(hero.id).avatar }}</div>
              <div class="hero-quality" :class="getQualityClass(hero.id)">
                {{ getHeroData(hero.id).quality }}
              </div>
            </div>
            <div class="hero-info">
              <div class="hero-name">{{ getHeroData(hero.id).name }}</div>
              <div class="hero-level">等级: {{ hero.level }}</div>
              <div class="hero-position">{{ getPositionName(getHeroData(hero.id).position) }}</div>
              <div class="hero-breakthrough">
                {{ getBreakthroughStageName(hero.breakthrough ? hero.breakthrough.stage : 0) }} 
                {{ hero.breakthrough ? hero.breakthrough.level : 0 }}
              </div>
            </div>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="fragments" tab="碎片">
        <div class="fragments-grid">
          <div v-for="(count, heroId) in gameStore.heroes.fragments" :key="heroId" class="fragment-item">
            <div class="fragment-icon">{{ getHeroData(heroId).avatar }}</div>
            <div class="fragment-info">
              <div class="fragment-name">{{ getHeroData(heroId).name }}</div>
              <div class="fragment-count">碎片: {{ count }}</div>
            </div>
          </div>
        </div>
      </n-tab-pane>

      <n-tab-pane name="formation" tab="阵容">
        <div class="formation-panel">
          <div class="formation-grid">
            <div class="formation-slot front-tank">
              <div class="slot-label">前排坦克</div>
              <div v-if="gameStore.heroes.formation.frontTank" class="hero-in-slot">
                <div class="hero-icon">{{ getHeroData(gameStore.heroes.formation.frontTank).avatar }}</div>
                <div class="hero-name">{{ getHeroData(gameStore.heroes.formation.frontTank).name }}</div>
              </div>
              <div v-else class="empty-slot">空</div>
            </div>
            <div class="formation-slot front-dps">
              <div class="slot-label">前排输出</div>
              <div v-if="gameStore.heroes.formation.frontDps" class="hero-in-slot">
                <div class="hero-icon">{{ getHeroData(gameStore.heroes.formation.frontDps).avatar }}</div>
                <div class="hero-name">{{ getHeroData(gameStore.heroes.formation.frontDps).name }}</div>
              </div>
              <div v-else class="empty-slot">空</div>
            </div>
            <div class="formation-slot back-dps">
              <div class="slot-label">后排输出</div>
              <div v-if="gameStore.heroes.formation.backDps" class="hero-in-slot">
                <div class="hero-icon">{{ getHeroData(gameStore.heroes.formation.backDps).avatar }}</div>
                <div class="hero-name">{{ getHeroData(gameStore.heroes.formation.backDps).name }}</div>
              </div>
              <div v-else class="empty-slot">空</div>
            </div>
            <div class="formation-slot back-support">
              <div class="slot-label">后排辅助</div>
              <div v-if="gameStore.heroes.formation.backSupport" class="hero-in-slot">
                <div class="hero-icon">{{ getHeroData(gameStore.heroes.formation.backSupport).avatar }}</div>
                <div class="hero-name">{{ getHeroData(gameStore.heroes.formation.backSupport).name }}</div>
              </div>
              <div v-else class="empty-slot">空</div>
            </div>
          </div>
        </div>
      </n-tab-pane>

      <n-tab-pane name="bonds" tab="羁绊">
        <div class="bonds-panel">
          <div class="bond-list">
            <div class="bond-item">
              <div class="bond-name">战士羁绊</div>
              <div class="bond-description">拥有2个战士角色时，全体攻击力+10%</div>
              <div class="bond-status">未激活</div>
            </div>
            <div class="bond-item">
              <div class="bond-name">人类羁绊</div>
              <div class="bond-description">拥有3个人类角色时，全体生命值+15%</div>
              <div class="bond-status">未激活</div>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>

    <!-- 角色详情弹窗 -->
    <n-modal v-model:show="showHeroDetail" preset="card" style="width: 600px;" title="角色详情">
      <div v-if="selectedHero" class="hero-detail">
        <div class="detail-header">
          <div class="hero-avatar-large">
            <div class="hero-icon-large">{{ getHeroData(selectedHero.id).avatar }}</div>
            <div class="hero-quality-badge" :class="getQualityClass(selectedHero.id)">
              {{ getHeroData(selectedHero.id).quality }}
            </div>
          </div>
          <div class="hero-info-detail">
            <h3>{{ getHeroData(selectedHero.id).name }}</h3>
            <div class="hero-stats">
              <div class="stat-row">
                <span>等级:</span>
                <span>{{ selectedHero.level }}</span>
              </div>
              <div class="stat-row">
                <span>定位:</span>
                <span>{{ getPositionName(getHeroData(selectedHero.id).position) }}</span>
              </div>
              <div class="stat-row">
                <span>突破:</span>
                <span>{{ getBreakthroughStageName(selectedHero.breakthrough ? selectedHero.breakthrough.stage : 0) }} {{ selectedHero.breakthrough ? selectedHero.breakthrough.level : 0 }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="hero-skills">
          <h4>技能</h4>
          <div v-for="skillLink in getHeroData(selectedHero.id).skills" :key="skillLink.skillId" class="skill-item">
            <template v-if="selectedHero.level >= skillLink.levelUnlock">
              <div class="skill-name-unlocked">
                <n-text class="skill-icon-small">{{ getHeroSkillDetails(skillLink.skillId).icon }}</n-text>
                <n-text strong>{{ getHeroSkillDetails(skillLink.skillId).name }}</n-text>
              </div>
              <div class="skill-description">{{ getHeroSkillDetails(skillLink.skillId).description }}</div>
              <div class="skill-cooldown" v-if="getHeroSkillDetails(skillLink.skillId).cooldown > 0">
                冷却: {{ getHeroSkillDetails(skillLink.skillId).cooldown }}秒
              </div>
            </template>
            <template v-else>
              <div class="skill-name-locked">
                <n-text class="skill-icon-small">🔒</n-text>
                <n-text type="info">{{ getHeroSkillDetails(skillLink.skillId).name }} ({{ skillLink.levelUnlock }}级解锁)</n-text>
              </div>
              <div class="skill-description-locked">达到{{ skillLink.levelUnlock }}级可解锁此技能</div>
            </template>
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NTabs, NTabPane, NModal, NText, NIcon } from 'naive-ui'
import { useGameStore } from '../stores/gameStore'
import { heroDatabase, heroSkillDatabase } from '../data/heroData'
import { formatLargeNumber } from '../utils/numberFormat'
import { getBreakthroughStageName, getHeroSkillDetails, getHeroUnlockedSkills } from '../utils/heroUtils'

const gameStore = useGameStore()
const activeTab = ref('heroes')
const showHeroDetail = ref(false)
const selectedHero = ref(null)

const getHeroData = heroId => {
  return heroDatabase[heroId] || {}
}

const getQualityClass = heroId => {
  const quality = getHeroData(heroId).quality
  return `quality-${quality?.toLowerCase()}`
}

const getPositionName = position => {
  const positions = {
    frontTank: '前排坦克',
    frontDps: '前排输出',
    backDps: '后排输出',
    backSupport: '后排辅助'
  }
  return positions[position] || '未知'
}

const showHeroDetailModal = hero => {
  selectedHero.value = hero
  showHeroDetail.value = true
}
</script>

<style scoped>
.hero-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 20px;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.hero-card {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
}

.hero-avatar {
  margin-bottom: 10px;
  position: relative;
}

.hero-icon {
  font-size: 32px;
  margin-bottom: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #eee;
}

.hero-quality {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  z-index: 1;
}

.quality-a { background-color: #28a745; }
.quality-s { background-color: #007bff; }
.quality-ss { background-color: #6f42c1; }
.quality-sss { background-color: #fd7e14; }

.hero-info {
  flex-grow: 1;
  width: 100%;
  text-align: center;
}

.hero-name {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
}

.hero-level, .hero-position, .hero-breakthrough {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 3px;
}

.fragments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.fragment-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.fragment-icon {
  font-size: 24px;
}

.formation-panel {
  padding: 20px;
}

.formation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.formation-slot {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slot-label {
  font-weight: bold;
  margin-bottom: 10px;
  color: #495057;
}

.hero-in-slot .hero-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.empty-slot {
  color: #6c757d;
  font-style: italic;
}

.bonds-panel {
  padding: 20px;
}

.bond-item {
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 10px;
  background: #f8f9fa;
}

.bond-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.bond-description {
  color: #6c757d;
  margin-bottom: 5px;
}

.bond-status {
  color: #dc3545;
  font-size: 12px;
}

.hero-detail {
  padding: 20px;
}

.detail-header {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.hero-avatar-large {
  text-align: center;
  position: relative;
  flex-shrink: 0;
}

.hero-icon-large {
  font-size: 64px;
  margin-bottom: 10px;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #f0f0f0;
}

.hero-quality-badge {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  transform: translate(50%, -50%);
}

.hero-info-detail {
  flex-grow: 1;
}

.hero-info-detail h3 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #333;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
}

.hero-skills h4 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.skill-item {
  padding: 10px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  margin-bottom: 8px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.skill-name-unlocked {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 5px;
  color: #007bff;
}

.skill-name-locked {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 5px;
  color: #6c757d;
}

.skill-icon-small {
  font-size: 20px;
  margin-right: 8px;
}

.skill-description {
  color: #555;
  font-size: 14px;
  line-height: 1.5;
}

.skill-description-locked {
  color: #999;
  font-size: 13px;
  font-style: italic;
}

.skill-cooldown {
  font-size: 13px;
  color: #888;
  margin-top: 5px;
}
</style>
