export interface EpicConflict {
  id: string;
  name: string;
  level: string;
  description: string;
  icon: string;
  codeA: string;
  codeB: string;
  conflictProcess: string[];
  crashBehavior: string;
}

export const epicConflictsData: EpicConflict[] = [
  {
    id: 'yuantou-vs-baishoutao',
    name: '圆头耄耋 vs 白手套（人类）',
    level: 'SSS',
    description: '投喂者试图阻止偷吃，触发终极反骨代码',
    icon: '⚔️',
    codeA: `# 圆头耄耋 - 反骨偷吃模块 v99.0
class YuanTouMaoDie:
    def __init__(self):
        self.hunger = 9999
        self.fear = 0
        self.claw_damage = 999

    def steal_food(self):
        if human_approaching():
            self.hunger += 1000
            return "继续偷吃，管你是谁"
        return "悄悄靠近猫粮碗"

    def defense(self):
        if human_blocks_food():
            activate_claw_mode()
            return "让你知道什么叫反骨"
        return "假装无辜眨眨眼"`,
    codeB: `# 白手套人类 - 阻止偷吃模块 v1.0
class WhiteGloveHuman:
    def __init__(self):
        self.patience = 100
        self.hp = 100

    def block_cat(self):
        if cat_stealing_food():
            self.patience -= 30
            return "抓住后颈肉！"
        return "假装没看到"

    def medical_treatment(self):
        if scratched():
            self.hp -= 50
            return "赶紧去打狂犬疫苗"
        return "继续看猫"`,
    conflictProcess: [
      '圆头耄耋检测到猫粮',
      '人类伸手阻拦',
      '圆头耄耋激活反骨模块',
      '人类启动抓捕程序',
      '圆头耄耋释放终极技能：挠！',
      '人类血量 -50',
      '人类被迫启动：打狂犬疫苗',
    ],
    crashBehavior: '人类被抓伤，被迫去打狂犬疫苗，圆头耄耋成功偷吃完毕',
  },
  {
    id: 'yuantou-vs-hajimi',
    name: '圆头耄耋 vs 哈基米（温顺猫咪）',
    level: 'SS',
    description: '两种完全相反的代码体系碰撞',
    icon: '💥',
    codeA: `# 圆头耄耋 - 霸道抢粮模块 v88.0
class YuanTouMaoDie:
    def __init__(self):
        self.aggression = 999
        self.greed = 100

    def claim_bowl(self):
        if other_cat_nearby():
            activate_intimidation()
            return "这是我的碗，滚"
        return "霸占所有猫粮碗"

    def eat_all(self):
        while bowl_not_empty():
            eat()
        return "一粒不剩"`,

    codeB: `# 哈基米 - 温顺退让模块 v1.0
class HaJiMi:
    def __init__(self):
        self.fear_level = 0
        self.kindness = 999

    def yield_bowl(self):
        if scary_cat_approaching():
            self.fear_level += 100
            return "好的好的，给你吃"
        return "安静吃饭"

    def escape(self):
        if intimidation_detected():
            run_away()
            return "惹不起躲得起"
        return "继续发呆"`,
    conflictProcess: [
      '圆头耄耋锁定哈基米的猫粮碗',
      '圆头耄耋启动霸道靠近',
      '哈基米检测到威胁',
      '哈基米启动温顺退让',
      '圆头耄耋全力冲刺抢碗',
      '哈基米当场吓傻原地不动',
      '圆头耄耋成功霸占猫粮碗',
    ],
    crashBehavior: '哈基米当场吓傻，圆头耄耋霸占猫粮碗，哈基米只能在旁边瑟瑟发抖',
  },
  {
    id: 'yuantou-vs-strays',
    name: '圆头耄耋 vs 其他流浪猫',
    level: 'S',
    description: '地盘争夺战，一场史诗级的猫王争霸赛',
    icon: '👑',
    codeA: `# 圆头耄耋 - 猫王争霸模块 v77.0
class YuanTouMaoDie:
    def __init__(self):
        self.dominance = 999
        self.territory = set()

    def claim_territory(self):
        if other_cat_present():
            activate_boss_mode()
            return "这片地盘归我了"
        return "巡视领地"

    def battle(self):
        if cat_challenges():
            use_headbutt()
            return "谁才是真正的猫王"
        return "威风凛凛走过去"`,

    codeB: `# 其他流浪猫 - 求生本能模块 v0.1
class StrayCat:
    def __init__(self):
        self.courage = 10
        self.survival_instinct = 999

    def fight_or_flight(self):
        if boss_cat_detected():
            self.courage -= 200
            return "三十六计走为上"
        return "正常生活"

    def flee(self):
        if intimidation_level > 80():
            sprint_away()
            return "惹不起告辞"
        return "假装没看见"`,
    conflictProcess: [
      '圆头耄耋巡视领地',
      '发现其他流浪猫入侵',
      '圆头耄耋启动Boss模式',
      '其他猫检测到碾压级威胁',
      '圆头耄耋释放霸气侧漏',
      '其他猫勇气值归零',
      '圆头耄耋加冕为猫王',
    ],
    crashBehavior: '其他猫落荒而逃，圆头耄耋成为猫王，独享整条街的猫粮',
  },
  {
    id: 'yuantou-vs-door',
    name: '圆头耄耋 vs 关门代码',
    level: 'A',
    description: '人类试图关门阻止它进入，但门锁在它面前形同虚设',
    icon: '🚪',
    codeA: `# 圆头耄耋 - 强行破门模块 v66.0
class YuanTouMaoDie:
    def __init__(self):
        self.force = 999
        self.determination = 100

    def enter_room(self):
        if door_is_closed():
            self.force += 500
            return "门？什么门？不存在的"
        return "大摇大摆走进去"

    def warn_human(self):
        if human_annoys_me():
            activate_hissing()
            return "哈——气警告！"
        return "高冷路过"`,

    codeB: `# 人类 - 关门防御模块 v2.0
class Human:
    def __init__(self):
        self.effort = 50
        self.confidence = 30

    def close_door(self):
        if cat_outside():
            slam_door()
            return "这次绝对进不来"
        return "放心关门"

    def check_lock(self):
        if door_locked():
            return "应该没问题吧"
        return "心里发虚"`,
    conflictProcess: [
      '人类关门试图阻止圆头耄耋',
      '圆头耄耋检测到门被关闭',
      '圆头耄耋启动强行破门程序',
      '人类加固门锁',
      '圆头耄耋释放全力冲撞',
      '门锁发出惨叫',
      '门被撞开，人类被哈气警告',
    ],
    crashBehavior: '门被撞开，人类被哈气警告，圆头耄耋扬长而去',
  },
  {
    id: 'yuantou-vs-laser',
    name: '圆头耄耋 vs 激光笔代码',
    level: 'B',
    description: '激光笔试图吸引它的注意力，但圆头耄耋有自己的想法',
    icon: '🔴',
    codeA: `# 圆头耄耋 - 无视激光模块 v55.0
class YuanTouMaoDie:
    def __init__(self):
        self.interest = 0
        self.hunger = 999

    def react_to_laser(self):
        if laser_spotted():
            return "没兴趣，继续吃饭"
        return "专注干饭"

    def priority_check(self):
        priorities = ["猫粮", "睡觉", "猫粮", "再吃一口"]
        return priorities[0]  # 永远是猫粮`,

    codeB: `# 激光笔 - 吸引注意力模块 v3.0
class LaserPointer:
    def __init__(self):
        self.brightness = 100
        self.wiggle_speed = 999

    def attract_cat(self):
        if cat_not_interested():
            self.brightness += 50
            self.wiggle_speed += 200
            return "疯狂晃动激光点"
        return "正常晃动"

    def give_up(self):
        if attempts > 10:
            return "算了，它根本不理我"
        return "再试一次"`,
    conflictProcess: [
      '激光笔启动红色光点',
      '光点在地面疯狂晃动',
      '圆头耄耋看了一眼',
      '圆头耄耋判断：不如猫粮',
      '圆头耄耋继续埋头吃猫粮',
      '激光笔加大晃动力度',
      '圆头耄耋：完全无视',
    ],
    crashBehavior: '完全无视激光笔，继续吃猫粮，激光笔自闭',
  },
];
