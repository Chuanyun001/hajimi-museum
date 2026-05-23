export interface CoreCode {
  id: string;
  pid: number;
  name: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  code: string;
  trigger: string;
  logic: string;
  behavior: string;
  output: string;
  tags: string[];
  icon: string;
}

export const coreCodeData: CoreCode[] = [
  {
    id: 'lick_fur',
    pid: 0,
    name: '舔毛代码',
    description: '猫咪的舔毛本能，最高优先级，不可中断。这是猫咪最核心的清洁程序。',
    priority: 'HIGH',
    code: `# PID: 0 - 舔毛代码（最高优先级，不可中断）
def lick_fur():
    while True:
        if paw_near_mouth() or body_is_dirty():
            start_licking()
            # 直到被更高优先级代码打断
            while not higher_priority_code_triggered():
                continue_licking()
        else:
            sleep(0.1)

# 辅助函数
def paw_near_mouth():
    return distance(paw, mouth) < 5  # 像素

def body_is_dirty():
    return detect_dirt_level() > 0.3

def start_licking():
    activate_saliva_gland()
    move_tongue_to_target()
    set_licking_pattern("standard")

def continue_licking():
    maintain_licking_rhythm()
    check_cleanliness_level()`,
    trigger: '爪子靠近嘴巴 或 身体检测到脏污',
    logic: '启动唾液腺 → 移动舌头到目标区域 → 设置舔毛模式 → 持续舔毛直到干净',
    behavior: '猫咪会花费大量时间舔毛，即使在看似干净的情况下也会继续',
    output: '舔毛完成！清洁度 +100',
    tags: ['清洁', '最高优先级', '不可中断'],
    icon: '🐱',
  },
  {
    id: 'bury_poop',
    pid: 1,
    name: '埋屎代码',
    description: '猫咪的埋屎本能，第二优先级。这是猫咪掩埋排泄物的本能行为。',
    priority: 'HIGH',
    code: `# PID: 1 - 埋屎代码（第二优先级）
def bury_poop():
    if poop_detected():
        find_suitable_spot()
        dig_hole()
        poop()
        bury_poop_in_hole()
        clean_paws()
    else:
        wait_for_poop_signal()

# 辅助函数
def poop_detected():
    return bladder_full() or bowel_full()

def find_suitable_spot():
    # 寻找松软的地面
    return find_soft_ground()

def dig_hole():
    for i in range(3):
        scoop_with_paw()
        check_depth()

def bury_poop_in_hole():
    cover_with_dirt()
    pat_down()
    check_coverage()

def clean_paws():
    shake_paws()
    lick_paws()`,
    trigger: '膀胱或肠道满载信号',
    logic: '检测排泄需求 → 寻找合适地点 → 挖洞 → 排泄 → 埋屎 → 清理爪子',
    behavior: '猫咪会仔细掩埋排泄物，确保完全覆盖，仿佛在掩盖犯罪现场',
    output: '埋屎完成！卫生度 +50',
    tags: ['卫生', '高优先级', '生理需求'],
    icon: '💩',
  },
  {
    id: 'push_things',
    pid: 2,
    name: '推东西代码',
    description: '猫咪的推东西本能，第三优先级。桌边的东西不推下去，难道留着过年？',
    priority: 'MEDIUM',
    code: `# PID: 2 - 推东西代码（第三优先级）
def push_things():
    if object_on_edge_detected():
        approach_object()
        extend_paw()
        push_object()
        watch_it_fall()
    else:
        scan_for_objects()

# 辅助函数
def object_on_edge_detected():
    return find_objects_near_edge() > 0

def approach_object():
    walk_to_object()
    set_paw_position()

def extend_paw():
    extend_claws_partially()
    position_paw_under_object()

def push_object():
    apply_gentle_force()
    monitor_falling_trajectory()

def watch_it_fall():
    track_object_movement()
    record_impact_point()`,
    trigger: '检测到边缘附近的物体',
    logic: '扫描边缘物体 → 靠近物体 → 伸出爪子 → 推动物体 → 观察坠落',
    behavior: '猫咪会故意将桌边的物体推下去，然后冷静地观察',
    output: '推东西完成！混乱度 +20',
    tags: ['探索', '中优先级', '随机触发'],
    icon: '🐾',
  },
  {
    id: 'enclosed_space',
    pid: 3,
    name: '封闭空间代码',
    description: '猫咪的封闭空间本能，第四优先级。这是猫咪寻找和进入封闭空间的本能。',
    priority: 'MEDIUM',
    code: `# PID: 3 - 封闭空间代码（第四优先级）
def enclosed_space():
    if small_space_detected():
        approach_space()
        test_size()
        if fits_in_space():
            enter_space()
            curl_up()
            feel_safe()
        else:
            try_anyway()
    else:
        search_for_spaces()

# 辅助函数
def small_space_detected():
    return find_boxes() or find_bags() or find_drawers()

def test_size():
    # 测试空间大小
    return estimate_space_volume() > cat_volume * 0.8

def fits_in_space():
    # 猫咪无视物理定律
    return True  # 猫咪总是认为自己能fit

def enter_space():
    squeeze_into_space()
    adjust_position()

def curl_up():
    tuck_paws()
    wrap_tail()
    close_eyes()`,
    trigger: '检测到小空间（盒子、袋子、抽屉等）',
    logic: '扫描小空间 → 测试大小 → 进入空间 → 蜷缩 → 感到安全',
    behavior: '猫咪会尝试进入任何看起来能容纳自己的空间，即使明显太小',
    output: '进入封闭空间！安全感 +30',
    tags: ['安全', '中优先级', '环境触发'],
    icon: '📦',
  },
  {
    id: 'fight',
    pid: 4,
    name: '战斗代码',
    description: '猫咪的战斗本能，第五优先级。这是猫咪面对威胁时的防御程序。',
    priority: 'LOW',
    code: `# PID: 4 - 战斗代码（第五优先级）
def fight():
    if threat_detected():
        assess_threat_level()
        if threat_level > 5:
            activate_defense_mode()
            arch_back()
            puff_up_fur()
            hiss()
            if threat_persists():
                attack()
        else:
            monitor_threat()
    else:
        maintain_alertness()

# 辅助函数
def threat_detected():
    return detect_strange_cat() or detect_loud_noise()

def assess_threat_level():
    return calculate_threat_score()

def activate_defense_mode():
    raise_fur()
    flatten_ears()
    dilate_pupils()

def arch_back():
    curve_spine()
    raise_tail()

def attack():
    swipe_with_paw()
    bite_if_needed()`,
    trigger: '检测到威胁（陌生猫、噪音等）',
    logic: '评估威胁等级 → 激活防御模式 → 拱背 → 竖毛 → 嘶嘶叫 → 攻击',
    behavior: '猫咪会先警告，如果威胁持续才会攻击',
    output: '战斗完成！威慑力 +40',
    tags: ['防御', '低优先级', '威胁触发'],
    icon: '😾',
  },
  {
    id: 'midnight_zoomies',
    pid: 5,
    name: '凌晨跑酷代码',
    description: '猫咪的凌晨跑酷本能，第六优先级。凌晨3点不跑酷，难道等你睡着了再跑？',
    priority: 'LOW',
    code: `# PID: 5 - 凌晨跑酷代码（第六优先级）
def midnight_zoomies():
    if is_3am():
        activate_zoomies()
        run_at_full_speed()
        jump_on_furniture()
        knock_things_over()
        repeat_until_exhausted()
    else:
        wait_for_3am()

# 辅助函数
def is_3am():
    return current_time.hour == 3

def activate_zoomies():
    set_energy_level("maximum")
    disable_brakes()
    enable_ignore_mode()

def run_at_full_speed():
    for i in range(100):
        sprint()
        change_direction_randomly()

def jump_on_furniture():
    targets = ["sofa", "bed", "table", "counter"]
    for target in targets:
        jump_onto(target)
        pause_briefly()

def knock_things_over():
    objects = find_knockable_objects()
    for obj in objects:
        swipe_at(obj)`,
    trigger: '凌晨3点自动激活',
    logic: '检测时间 → 激活跑酷模式 → 全速奔跑 → 跳上家具 → 打翻物品 → 重复直到精疲力尽',
    behavior: '猫咪会在凌晨突然爆发能量，在房间里疯狂奔跑',
    output: '凌晨跑酷完成！混乱度 +100',
    tags: ['运动', '低优先级', '时间触发'],
    icon: '🏃',
  },
];