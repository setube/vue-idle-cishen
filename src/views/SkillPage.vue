<template>
  <div class="skill-page">
    <n-card>
      <div class="skill-header">
        <n-space justify="space-between" align="center">
          <n-h2>技能管理</n-h2>
          <n-space>
            <n-text>
              已装备: {{ gameStore.skills.equippedSkills.length }} / {{ gameStore.skills.unlockedSkillSlots }}
            </n-text>
            <n-button type="primary" @click="batchUpgrade" :disabled="!canBatchUpgrade">一键升级</n-button>
          </n-space>
        </n-space>
      </div>
      <!-- 装备的技能槽位 -->
      <n-card title="装备的技能" class="equipped-skills">
        <n-grid :cols="mobile ? 3 : 6" :x-gap="12">
          <n-grid-item v-for="slotIndex in 6" :key="slotIndex">
            <n-card
              :class="{
                'skill-slot': true,
                unlocked: slotIndex <= gameStore.skills.unlockedSkillSlots,
                equipped: gameStore.skills.equippedSkills[slotIndex - 1]
              }"
            >
              <template v-if="slotIndex <= gameStore.skills.unlockedSkillSlots">
                <template v-if="gameStore.skills.equippedSkills[slotIndex - 1]">
                  <n-space vertical align="center">
                    <n-text>{{ getSkillData(gameStore.skills.equippedSkills[slotIndex - 1])?.name }}</n-text>
                    <n-text type="primary">
                      Lv.{{ getOwnedSkill(gameStore.skills.equippedSkills[slotIndex - 1])?.level }}
                    </n-text>
                    <n-button
                      size="small"
                      type="error"
                      @click="unequipSkill(gameStore.skills.equippedSkills[slotIndex - 1])"
                    >
                      卸下
                    </n-button>
                  </n-space>
                </template>
                <template v-else>
                  <n-text class="empty-slot">空槽位</n-text>
                </template>
              </template>
              <template v-else>
                <n-text class="locked-slot">未解锁</n-text>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-card>
      <!-- 技能列表 -->
      <n-card title="所有技能" class="skill-list">
        <div class="skill-list-box">
          <n-card
            v-for="skill in allSkills"
            :key="skill.id"
            :class="`skill-card quality-${skill.quality}`"
            @click="showSkillDetail(skill)"
            hoverable
          >
            <n-space vertical style="width: 100%; height: 100%; justify-content: space-between">
              <n-space
                :justify="!getOwnedSkill(skill.id) ? 'center' : 'space-between'"
                align="center"
                style="width: 100%; margin-bottom: 5px"
              >
                <n-text style="font-size: 16px; font-weight: bold">{{ skill.name }}</n-text>
                <n-text v-if="getOwnedSkill(skill.id)" type="primary" style="font-size: 14px; margin-bottom: 2px">
                  等级 {{ getOwnedSkill(skill.id).level }}
                </n-text>
              </n-space>
              <template v-if="getOwnedSkill(skill.id)">
                <n-space vertical style="width: 100%; flex-grow: 1; justify-content: flex-end">
                  <n-progress
                    :percentage="getExpPercentage(skill.id)"
                    :height="16"
                    :border-radius="4"
                    color="#39F5FF"
                    :show-indicator="true"
                    processing
                    status="success"
                  >
                    <span class="progress-text-list">
                      {{ getOwnedSkill(skill.id).experience }}/{{
                        calculateSkillExpRequired(skill.id, getOwnedSkill(skill.id).level)
                      }}
                    </span>
                  </n-progress>
                  <n-button
                    type="info"
                    size="small"
                    block
                    @click.stop="upgradeSkill(skill.id)"
                    :disabled="!canUpgradeSkill(getOwnedSkill(skill.id), gameStore.skills.fragments)"
                    style="margin-top: 8px"
                  >
                    强化
                  </n-button>
                </n-space>
              </template>
              <template v-else>
                <n-space vertical style="width: 100%; flex-grow: 1; justify-content: flex-end">
                  <n-progress
                    :percentage="getExpPercentage(skill.id)"
                    :height="16"
                    :border-radius="4"
                    :color="getProgressColor(skill.id)"
                    :show-indicator="true"
                    processing
                    status="success"
                  >
                    <span class="progress-text-list">{{ gameStore.skills.fragments[skill.id] || 0 }}/ 2</span>
                  </n-progress>
                  <n-button
                    type="primary"
                    size="small"
                    block
                    @click.stop="synthesizeSkill(skill.id)"
                    :disabled="!canSynthesize(skill.id)"
                    style="margin-top: 8px"
                  >
                    合成
                  </n-button>
                </n-space>
              </template>
            </n-space>
          </n-card>
        </div>
      </n-card>
    </n-card>
    <!-- 技能详情弹窗 -->
    <n-modal
      v-model:show="showDetail"
      preset="card"
      :style="{ width: mobile ? '90%' : '400px', borderRadius: '12px' }"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      :show-icon="false"
    >
      <template #header>
        <n-space justify="space-between" align="start" style="width: 100%">
          <!-- 中间内容：名称、品质、等级、经验 -->
          <n-space vertical :size="2" style="flex: 1; margin-left: 10px">
            <!-- 技能名称和品质 -->
            <n-space align="center" style="width: 100%">
              <n-h3 style="margin: 0; font-size: 20px">{{ selectedSkill.name }}</n-h3>
              <n-tag :type="getQualityTagType(selectedSkill.quality)" size="small">
                {{ SKILL_QUALITIES[selectedSkill.quality].name }}
              </n-tag>
            </n-space>
            <!-- 技能等级和经验进度条 (仅当拥有技能时显示) -->
            <template v-if="getOwnedSkill(selectedSkill.id)">
              <n-space vertical :size="2">
                <n-space align="center" style="width: 100%">
                  <n-text :style="{ fontSize: '13px', fontWeight: 'bold' }">
                    等级 {{ getOwnedSkill(selectedSkill.id).level }}
                  </n-text>
                  <n-progress
                    :percentage="getExpPercentage(selectedSkill.id)"
                    :height="16"
                    :border-radius="8"
                    color="#39F5FF"
                    :show-indicator="true"
                    processing
                    status="success"
                    style="flex: 1; min-width: 200px"
                  >
                    <span class="progress-text">
                      {{ getOwnedSkill(selectedSkill.id).experience }}
                      /
                      {{ calculateSkillExpRequired(selectedSkill.id, getOwnedSkill(selectedSkill.id).level) }}
                    </span>
                  </n-progress>
                </n-space>
              </n-space>
            </template>
          </n-space>
        </n-space>
      </template>

      <template v-if="selectedSkill">
        <n-space vertical :size="mobile ? 'small' : 'medium'">
          <n-divider style="margin: 10px 0" />

          <!-- 技能介绍 -->
          <n-card :bordered="false" size="small" class="skill-description-card">
            <n-text class="description-text">{{ selectedSkill.description }}</n-text>
          </n-card>

          <n-card :bordered="false" size="small" class="skill-cooldown-effect">
            <n-space justify="space-between" align="center">
              <n-text type="info" :style="{ fontSize: mobile ? '14px' : '16px' }">
                <n-icon :component="TimeOutline" />
                {{ selectedSkill.cooldown }}秒
              </n-text>
              <!-- 技能效果 -->
              <template v-if="getOwnedSkill(selectedSkill.id)">
                <n-tag
                  size="large"
                  :bordered="false"
                  style="background-color: #e6ffe6; color: #18a058; font-weight: bold; border-radius: 8px"
                >
                  拥有效果 {{ formatEffect(selectedSkill, getOwnedSkill(selectedSkill.id).level) }}
                </n-tag>
              </template>
            </n-space>
          </n-card>

          <n-divider style="margin: 10px 0" />

          <!-- 操作按钮 -->
          <n-grid v-if="getOwnedSkill(selectedSkill.id)" :cols="2" x-gap="15">
            <n-grid-item>
              <n-button
                v-if="!gameStore.skills.equippedSkills.includes(selectedSkill.id)"
                type="primary"
                size="large"
                block
                style="height: 48px; border-radius: 12px"
                @click="equipSkill(selectedSkill.id)"
                :disabled="gameStore.skills.equippedSkills.length >= gameStore.skills.unlockedSkillSlots"
              >
                装备
              </n-button>
              <n-button
                v-else
                type="success"
                size="large"
                block
                style="height: 48px; border-radius: 12px"
                @click="unequipSkill(selectedSkill.id)"
              >
                卸下
              </n-button>
            </n-grid-item>
            <n-grid-item>
              <n-button
                type="default"
                size="large"
                block
                style="height: 48px; border-radius: 12px"
                @click="upgradeSkill(selectedSkill.id)"
                :disabled="!canUpgradeSkill(getOwnedSkill(selectedSkill.id), gameStore.skills.fragments)"
              >
                强化
              </n-button>
            </n-grid-item>
          </n-grid>
          <n-space v-else justify="center">
            <n-button
              type="primary"
              size="large"
              style="width: 200px; height: 48px; border-radius: 12px"
              @click="synthesizeSkill(selectedSkill.id)"
              :disabled="!canSynthesize(selectedSkill.id)"
            >
              合成
            </n-button>
          </n-space>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useGameStore } from '../stores/gameStore.js'
  import { skillDatabase, SKILL_QUALITIES } from '../data/skillData.js'
  import {
    calculateSkillFragmentRequired,
    calculateSkillEffect,
    canUpgradeSkill,
    upgradeSkill as upgradeSkillUtil,
    batchUpgradeSkills,
    synthesizeSkill as synthesizeSkillUtil,
    equipSkill as equipSkillUtil,
    unequipSkill as unequipSkillUtil,
    calculateSkillExpRequired
  } from '../utils/skillUtils.js'
  import { formatLargeNumber } from '../utils/numberFormat.js'
  import {
    NCard,
    NSpace,
    NButton,
    NText,
    NGrid,
    NGridItem,
    NTag,
    NModal,
    NDivider,
    NH2,
    NProgress,
    NIcon,
    NH3
  } from 'naive-ui'
  import { TimeOutline, CloseOutline } from '@vicons/ionicons5'

  const gameStore = useGameStore()
  const selectedSkill = ref(null)
  const showDetail = ref(false)

  // 最高技能等级，根据图片显示为15
  const MAX_SKILL_LEVEL = 15

  // 替换 useWindowSize 的实现
  const windowWidth = ref(window.innerWidth)
  const mobile = computed(() => windowWidth.value < 768)

  // 添加窗口大小变化监听
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  // 所有技能列表
  const allSkills = computed(() => Object.values(skillDatabase))

  // 获取拥有的技能
  const getOwnedSkill = skillId => {
    return gameStore.skills.ownedSkills.find(s => s.id === skillId)
  }

  // 获取技能数据
  const getSkillData = skillId => {
    return skillDatabase[skillId]
  }

  // 获取技能状态
  const getSkillStatus = skillId => {
    if (getOwnedSkill(skillId)) return '已拥有'
    if (canSynthesize(skillId)) return '可合成'
    return '未拥有'
  }

  // 获取品质标签类型
  const getQualityTagType = quality => {
    const types = {
      common: 'default',
      advanced: 'success',
      rare: 'info',
      epic: 'warning',
      legendary: 'error',
      mythical: 'success',
      transcendent: 'error'
    }
    return types[quality] || 'default'
  }

  // 获取状态标签类型
  const getStatusTagType = skillId => {
    if (getOwnedSkill(skillId)) return 'success'
    if (canSynthesize(skillId)) return 'info'
    return 'default'
  }

  // 检查是否可以合成
  const canSynthesize = skillId => {
    const fragments = gameStore.skills.fragments[skillId] || 0
    return fragments >= 2 && !getOwnedSkill(skillId)
  }

  // 检查是否可以批量升级
  const canBatchUpgrade = computed(() => {
    return gameStore.skills.ownedSkills.some(skill => canUpgradeSkill(skill, gameStore.skills.fragments))
  })

  // 显示技能详情
  const showSkillDetail = skill => {
    selectedSkill.value = skill
    showDetail.value = true
  }

  // 格式化效果显示
  const formatEffect = (skill, level) => {
    const effectValue = calculateSkillEffect(skill.id, level)
    const effect = skill.baseEffect

    switch (effect.type) {
      case 'attack':
        return `攻击力+${(effectValue * 100).toFixed(1)}%`
      case 'health':
        return `生命值+${(effectValue * 100).toFixed(1)}%`
      case 'attackSpeed':
        return `攻击速度+${(effectValue * 100).toFixed(1)}%`
      case 'critical':
        return `暴击率+${(effectValue * 100).toFixed(1)}%`
      case 'multiShot':
        return `多重射击+${effectValue.toFixed(0)}`
      case 'allStats':
        return `全属性+${(effectValue * 100).toFixed(1)}%`
      default:
        return `效果+${(effectValue * 100).toFixed(1)}%`
    }
  }

  // 装备技能
  const equipSkill = skillId => {
    if (equipSkillUtil(gameStore, skillId)) {
      // 装备成功
    }
  }

  // 卸下技能
  const unequipSkill = skillId => {
    if (unequipSkillUtil(gameStore, skillId)) {
      // 卸下成功
    }
  }

  // 升级技能
  const upgradeSkill = skillId => {
    if (upgradeSkillUtil(gameStore, skillId)) {
      // 升级成功
    }
  }

  // 合成技能
  const synthesizeSkill = skillId => {
    if (synthesizeSkillUtil(gameStore, skillId)) {
      // 合成成功
    }
  }

  // 批量升级
  const batchUpgrade = () => {
    const upgradedCount = batchUpgradeSkills(gameStore)
    if (upgradedCount > 0) {
      // 显示升级成功信息
    }
  }

  // 计算经验百分比 (此函数用于经验进度条)
  const getExpPercentage = skillId => {
    const skill = getOwnedSkill(skillId)
    if (!skill) return 0
    const requiredExp = calculateSkillExpRequired(skillId, skill.level)
    // 避免除以零或经验不足导致进度条显示问题
    return requiredExp === 0 ? 0 : (skill.experience / requiredExp) * 100
  }

  // 获取进度条颜色 (现在基于经验进度)
  const getProgressColor = skillId => {
    const percentage = getExpPercentage(skillId)
    if (percentage >= 100) return '#18a058' // 经验满，绿色
    if (percentage >= 80) return '#2080f0' // 经验高，蓝色
    if (percentage >= 50) return '#f0a020' // 经验中，橙色
    return '#d03050' // 经验低，红色
  }
</script>

<style scoped>
  .skill-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .skill-header {
    margin-bottom: 20px;
  }

  .skill-slot {
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .skill-slot.unlocked {
    border-color: #28a745;
  }

  .skill-slot.equipped {
    border-color: #007bff;
  }

  .empty-slot {
    color: #999;
  }

  .locked-slot {
    color: #ccc;
  }

  .skill-list {
    margin-top: 10px;
  }

  .skill-list-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .skill-card {
    cursor: pointer;
    transition: all 0.3s;
    width: calc(33% - 10px);
    margin: 5px;
    padding: 10px;
    box-sizing: border-box;
  }

  .skill-card:hover {
    transform: translateY(-2px);
  }

  .quality-common {
    border-color: #e3e1cf;
  }

  .quality-advanced {
    border-color: #b2df6d;
  }

  .quality-rare {
    border-color: #21afe0;
  }

  .quality-epic {
    border-color: #cc38f1;
  }

  .quality-legendary {
    border-color: #fa7b2f;
  }

  .quality-mythical {
    border-color: #55edc0;
  }

  .quality-transcendent {
    border-color: #ff4040;
  }

  :deep(.n-progress.n-progress--line .n-progress-custom-content) {
    margin-left: 0;
  }

  /* 进度条样式 */
  :deep(.n-progress) {
    margin: 4px 0;
    width: 100%; /* 确保进度条在弹窗中宽度正常 */
  }

  :deep(.n-progress-bar) {
    transition: all 0.3s ease;
  }

  /* 技能详情弹窗特定样式 */
  .skill-level-progress {
    width: 100%;
  }

  .selectedSkill-name {
    width: 100px;
  }

  .skill-level-progress .n-progress {
    flex: 1; /* 进度条占据剩余空间 */
  }

  .skill-level-progress .n-text {
    flex-shrink: 0;
    margin-right: 8px;
  }

  .progress-text {
    font-size: 12px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    -webkit-text-stroke: 0.5px #000;
  }

  .skill-description-card {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 12px !important;
  }

  .description-text {
    font-size: 14px;
    color: #444;
    line-height: 1.5;
  }

  .skill-cooldown-effect {
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 12px !important;
  }

  .skill-cooldown-effect .n-icon {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
  }

  .progress-text-list {
    font-size: 11px;
    color: #fff;
    font-weight: bold;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
    -webkit-text-stroke: 0.5px #000;
  }

  @media screen and (max-width: 768px) {
    .skill-page {
      padding: 10px;
    }

    /* 调整卡片内边距 */
    :deep(.n-card-header) {
      padding: 12px;
    }

    :deep(.n-card__content) {
      padding: 12px;
    }

    /* 调整按钮大小 */
    :deep(.n-button) {
      font-size: 12px;
      padding: 0 12px;
      height: 28px;
    }

    /* 调整标签大小 */
    :deep(.n-tag) {
      font-size: 12px;
      padding: 0 8px;
      height: 24px;
    }

    /* 调整网格间距 */
    :deep(.n-grid) {
      gap: 8px !important;
    }
    .skill-card {
      width: calc(50% - 10px);
    }
    .n-modal-body {
      padding: 10px !important;
    }

    .skill-description-card,
    .skill-cooldown-effect {
      padding: 8px !important;
    }
  }
</style>
