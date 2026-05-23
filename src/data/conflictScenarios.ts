export interface ConflictScenario {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  codeA: string;
  codeB: string;
  conflictProcess: string[];
  crashBehavior: string;
}

export const conflictScenariosData: ConflictScenario[] = [
  {
    id: 'head-object',
    name: '头顶异物冲突',
    description: '当有东西放在猫咪头上时，猫咪会陷入"是否要甩掉它"的决策循环。这是最经典的猫咪代码冲突。',
    type: '最经典',
    icon: '🐱',
    codeA: `# 本能反应模块
def instinct_response():
    if object_on_head_detected():
        activate_shake_protocol()
        return "立即甩头"
    return "保持静止"`,
    codeB: `# 好奇心模块
def curiosity_module():
    if object_on_head_detected():
        freeze_and_assess()
        return "保持静止以观察"
    return "正常行动"`,
    conflictProcess: [
      '1. 头顶检测到异物',
      '2. 本能反应模块：立即甩头',
      '3. 好奇心模块：保持静止观察',
      '4. 两个模块同时执行',
      '5. 系统冲突！',
      '6. 猫咪僵住不动',
    ],
    crashBehavior: '猫咪瞬间僵住，保持诡异的姿势不动，眼睛瞪得像铜铃，仿佛被按了暂停键',
  },
  {
    id: 'belly-rub',
    name: '翻肚皮冲突',
    description: '猫咪翻肚皮露出腹部，但当你伸手去摸时，它又会攻击你。这是趋避型冲突的典型表现。',
    type: '趋避型',
    icon: '😿',
    codeA: `# 信任展示模块
def trust_display():
    if human_nearby():
        expose_belly()
        return "展示信任"
    return "保持警惕"`,
    codeB: `# 防御模块
def defense_module():
    if touch_detected_on_belly():
        activate_attack_mode()
        return "攻击入侵者"
    return "保持放松"`,
    conflictProcess: [
      '1. 猫咪翻肚皮展示信任',
      '2. 人类伸手触摸',
      '3. 防御模块检测到触摸',
      '4. 信任展示模块：继续展示',
      '5. 防御模块：立即攻击',
      '6. 系统冲突！',
      '7. 猫咪咬人后逃跑',
    ],
    crashBehavior: '猫咪先享受地翻肚皮，然后突然咬你一口，接着迅速逃跑',
  },
  {
    id: 'finger-point',
    name: '手指指向冲突',
    description: '当你用手指指向某个方向时，猫咪会困惑：是看手指还是看手指指向的方向？这是信息过载冲突。',
    type: '信息过载',
    icon: '🙀',
    codeA: `# 视觉跟踪模块
def visual_tracking():
    if finger_detected():
        focus_on_finger()
        return "盯着手指看"
    return "正常视觉"`,
    codeB: `# 方向理解模块
def direction_understanding():
    if pointing_direction_detected():
        look_at_direction()
        return "看向指向方向"
    return "忽略方向"`,
    conflictProcess: [
      '1. 人类伸出手指指向某处',
      '2. 视觉跟踪模块：检测到手指',
      '3. 方向理解模块：检测到指向',
      '4. 视觉跟踪模块：盯着手指',
      '5. 方向理解模块：看向方向',
      '6. 系统冲突！',
      '7. 猫咪困惑地看着手指',
    ],
    crashBehavior: '猫咪困惑地看着你的手指，完全忽略了你指向的东西',
  },
  {
    id: 'water-grooming',
    name: '喝水-舔毛冲突',
    description: '猫咪刚喝完水，嘴巴是湿的，但舔毛程序立即启动。这是目标匹配错误的典型表现。',
    type: '目标匹配错误',
    icon: '😹',
    codeA: `# 喝水模块
def drinking_module():
    if thirsty():
        drink_water()
        return "嘴巴湿润"
    return "嘴巴干燥"`,
    codeB: `# 舔毛模块
def grooming_module():
    if mouth_is_wet():
        start_grooming()
        return "开始舔毛"
    return "保持清洁"`,
    conflictProcess: [
      '1. 猫咪喝完水',
      '2. 喝水模块：嘴巴湿润',
      '3. 舔毛模块：检测到嘴巴湿润',
      '4. 舔毛模块：启动舔毛程序',
      '5. 喝水模块：嘴巴仍然湿润',
      '6. 系统冲突！',
      '7. 猫咪开始疯狂舔嘴',
    ],
    crashBehavior: '猫咪喝完水后疯狂舔嘴，仿佛嘴巴永远舔不干',
  },
  {
    id: 'tail-up',
    name: '尾巴竖起冲突',
    description: '当猫咪尾巴竖起时，表示高兴和友好，但尾巴竖起的姿势又触发了防御警报。这是状态强制修改冲突。',
    type: '状态强制修改',
    icon: '😸',
    codeA: `# 情绪状态模块
def emotion_state():
    if happy():
        tail_up()
        return "尾巴竖起表示高兴"
    return "尾巴自然下垂"`,
    codeB: `# 防御警报模块
def defense_alert():
    if tail_is_up():
        activate_alert_mode()
        return "进入警戒状态"
    return "保持放松"`,
    conflictProcess: [
      '1. 猫咪感到高兴',
      '2. 情绪状态模块：尾巴竖起',
      '3. 防御警报模块：检测到尾巴竖起',
      '4. 防御警报模块：激活警戒',
      '5. 情绪状态模块：仍然高兴',
      '6. 系统冲突！',
      '7. 猫咪在高兴和警戒间切换',
    ],
    crashBehavior: '猫咪尾巴竖起，但表情在高兴和警戒之间快速切换',
  },
  {
    id: 'escape-eat',
    name: '逃跑-干饭冲突',
    description: '当猫咪看到食物但同时感到害怕时，会在逃跑和吃饭之间犹豫。这是双趋型冲突的典型表现。',
    type: '双趋型',
    icon: '😻',
    codeA: `# 逃跑模块
def escape_module():
    if threat_detected():
        run_away()
        return "立即逃跑"
    return "保持静止"`,
    codeB: `# 进食模块
def eating_module():
    if food_detected():
        eat_food()
        return "立即进食"
    return "忽略食物"`,
    conflictProcess: [
      '1. 猫咪看到食物',
      '2. 同时检测到威胁',
      '3. 逃跑模块：立即逃跑',
      '4. 进食模块：立即进食',
      '5. 两个模块同时执行',
      '6. 系统冲突！',
      '7. 猫咪在食物和逃跑间犹豫',
    ],
    crashBehavior: '猫咪在食物旁边来回踱步，想吃又害怕，最终以迅雷不及掩耳之势叼走食物逃跑',
  },
];