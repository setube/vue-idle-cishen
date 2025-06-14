import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    // 资源数据
    resources: {
      gold: 1000,
      soulStone: 100,
      diamond: 50,
      experience: 0,
      expCrystal: 10, // 经验水晶
      summonTicket: 10 // 召唤券
    },
    // 召唤系统
    summon: {
      // 各类别召唤等级和经验
      levels: {
        pet: { level: 1, experience: 0 },
        skill: { level: 1, experience: 0 },
        equipment: { level: 1, experience: 0 }
      },
    },
    // 任务数据
    quests: {
      // 当前任务列表（最多显示3个任务）
      currentQuests: [
        {
          id: 1,
          type: 'upgrade', // upgrade, stage, summon
          name: '任务1',
          description: '升级攻击',
          target: 'attack',
          currentProgress: 0,
          totalProgress: 5,
          reward: { type: 'soulStone', amount: 150 },
          completed: false
        }
      ],
      // 已完成的任务数量
      completedCount: 0,
      // 下一个任务ID
      nextTaskId: 2,
      // 任务统计（用于生成任务）
      stats: {
        attributeUpgrades: 0,
        stagesCleared: 0,
        summonCounts: {
          skill: 0,
          pet: 0,
          equipment: 0
        }
      }
    },
    // 角色属性等级和数值
    character: {
      level: 1,
      // 基础属性等级
      attributes: {
        attack: { level: 1, baseValue: 100 },
        health: { level: 1, baseValue: 1000 },
        healthRecover: { level: 1, baseValue: 10 },
        attackSpeed: { level: 0, baseValue: 1, unlocked: false },
        critical: { level: 1, baseValue: 5 },
        criticalDamage: { level: 1, baseValue: 150 },
        multiShot: { level: 1, baseValue: 1, unlocked: false },
        tripleShot: { level: 0, baseValue: 0, unlocked: false }
      },
      currentHealth: 1000,
      maxHealth: 1000
    },
    // 战斗系统
    battle: {
      isInBattle: false,
      enemy: {
        name: '哥布林',
        level: 1,
        maxHealth: 500,
        currentHealth: 500,
        attack: 50,
        goldReward: 100,
        expReward: 10
      },
      battleLog: [],
      lastAttackTime: 0,
      lastEnemyAttackTime: 0
    },
    // 宠物系统
    pets: {
      // 拥有的宠物列表
      ownedPets: [
        {
          id: 1,
          level: 1,
          attack: 50,
          experience: 0,
          nextLevelExp: 100
        }
      ],
      // 宠物碎片
      fragments: {
        1: 5 // 小蝙蝠碎片
      },
      // 当前上阵的宠物（最多5只）
      activePets: [1],
      // 解锁的宠物槽位数量（初始为1）
      unlockedSlots: 1
    },
    // 角色系统
    heroes: {
      // 拥有的角色列表
      ownedHeroes: [
        {
          id: 'hero_001',
          level: 1,
          experience: 0,
          breakthrough: { stage: 'star', level: 0 }
        }
      ],
      // 角色碎片
      fragments: {
        'hero_001': 5 // 剑士碎片
      },
      // 当前选中的角色阵容
      formation: {
        frontTank: null,
        frontDps: 'hero_001',
        backDps: null,
        backSupport: null
      },
      // 全局增益效果
      globalBuffs: {
        healthBonus: 0,
        attackBonus: 0,
        pvpDamageBonus: 0,
        pvpDefenseBonus: 0
      },
      // 羁绊效果
      bondEffects: {}
    },
    // 技能系统
    skills: {
      // 拥有的技能列表
      ownedSkills: [
        {
          id: 'skill_001',
          level: 1,
          experience: 0
        }
      ],
      // 技能碎片
      fragments: {
        'skill_001': 3
      },
      // 装备的技能（最多6个，初始只能装备3个）
      equippedSkills: ['skill_001'],
      // 解锁的技能槽位数量（初始为3，最大为6）
      unlockedSkillSlots: 3,
      // 技能槽位解锁条件（关卡进度）
      slotUnlockRequirements: {
        4: { chapter: 1, stage: 10 }, // 第4个槽位需要通过1-10
        5: { chapter: 2, stage: 5 },  // 第5个槽位需要通过2-5
        6: { chapter: 3, stage: 1 }   // 第6个槽位需要通过3-1
      }
    },
    // 装备系统
    equipment: {
      // 拥有的装备列表
      ownedEquipment: [
        {
          id: 'weapon_001',
          level: 1,
          experience: 0
        },
        {
          id: 'armor_001',
          level: 1,
          experience: 0
        }
      ],
      // 装备碎片
      fragments: {},
      // 当前装备的装备
      equippedEquipment: {
        weapon: 'weapon_001',
        armor: 'armor_001'
      }
    },
    // 自动战斗状态
    autoBattle: true,
    // 游戏时间
    gameTime: Date.now(),
    // 关卡系统
    stages: {
      // 当前关卡信息
      currentStage: {
        difficulty: 'normal', // normal, hard, super, terror, nightmare, hell
        chapter: 1,
        stage: 1,
        enemy: 1 // 当前小关中的敌人编号 (1-5, 5是boss)
      },
      // 关卡进度记录
      progress: {
        normal: { maxChapter: 1, maxStage: 1 },
        hard: { maxChapter: 0, maxStage: 0 },
        super: { maxChapter: 0, maxStage: 0 },
        terror: { maxChapter: 0, maxStage: 0 },
        nightmare: { maxChapter: 0, maxStage: 0 },
        hell: { maxChapter: 0, maxStage: 0 }
      },
      // boss战败状态
      bossDefeatState: {
        isDefeated: false,
        showDangerButton: false,
        canChallengeBoss: true
      }
    },
    // 全局增益效果
    globalBuffs: {
      healthBonus: 0,
      attackBonus: 0,
      pvpDamageBonus: 0,
      pvpDefenseBonus: 0
    },
    // 羁绊效果
    bondEffects: {}
  }),
  persist: {
    key: 'game',
    storage: localStorage,
    serializer: {
      serialize: state => JSON.stringify(state),
      deserialize: value => JSON.parse(value)
    }
  }
})