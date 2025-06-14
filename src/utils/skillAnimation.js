export class SkillAnimation {
  constructor() {
    this.animations = new Map()
  }

  // 播放技能动画
  playAnimation(skillId, target) {
    const skillData = skillDatabase[skillId]
    if (!skillData || !skillData.animation) return

    const animation = this.createAnimation(skillData.animation, target)
    this.animations.set(skillId, animation)
    
    return new Promise(resolve => {
      animation.onfinish = () => {
        this.animations.delete(skillId)
        resolve()
      }
    })
  }

  // 创建动画元素
  createAnimation(animationType, target) {
    const element = document.createElement('div')
    element.className = `skill-animation ${animationType}`
    
    // 设置动画属性
    switch (animationType) {
      case 'magicBall':
        element.style.animation = 'magicBall 1.5s ease-in-out'
        break
      case 'lightning':
        element.style.animation = 'lightning 0.5s ease-out'
        break
      // ... 其他动画类型
    }

    target.appendChild(element)
    return element
  }
} 