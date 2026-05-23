export interface YuantouCode {
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

export const yuantouCodeData: YuantouCode[] = [
  {
    id: 'sanha_yiqiangpu',
    pid: 0,
    name: '三哈一强普代码',
    description: '圆头耄耋的终极连招，不可中断，不可协商，不可反驳。三声哈气警告后直接猛扑，整个过程行云流水，从未失手。',
    priority: 'HIGH',
    code: `# PID: 0 - 三哈一强普连招（不可中断）
def sanha_yiqiangpu():
    while True:
        if human_in_2m_range():
            for _ in range(3):
                hiss_loudly()  # 连续三次哈气
            pounce_aggressively()  # 一次猛扑
            retreat_to_safe_distance()
        else:
            sleep(0.1)

# 辅助函数
def human_in_2m_range():
    return detect_human_distance() < 2.0

def hiss_loudly():
    open_mouth_wide()
    emit_hissing_sound(volume="MAX")
    show_teeth()

def pounce_aggressively():
    calculate_trajectory(target="human_leg")
    launch_with_full_force()
    extend_claws()

def retreat_to_safe_distance():
    run_away(speed="MAX")
    find_hiding_spot()`,
    trigger: '人类进入2米范围',
    logic: '检测人类距离 → 连续三次哈气警告 → 猛扑攻击 → 撤退到安全距离',
    behavior: '圆头耄耋面对人类靠近时，先发出三声震天哈气，然后毫不犹豫地猛扑上去，最后潇洒撤退',
    output: '三哈一强普连招完成！人类伤害 +100，恐惧值 +200',
    tags: ['连招', '最高优先级', '不可中断', '反骨'],
    icon: '😾',
  },
  {
    id: 'qiangchuang_mingzhai',
    pid: 1,
    name: '强闯民宅代码',
    description: '圆头耄耋的强行进入人类居所的专属代码，门锁？不存在的。窗户？那是入口。任何物理屏障在它面前都是摆设。',
    priority: 'HIGH',
    code: `# PID: 1 - 强闯民宅代码
def qiangchuang_mingzhai():
    while True:
        if door_or_window_detected():
            approach_target()
            if is_locked():
                try_force_open()
                if force_open_failed():
                    find_alternative_entrance()
            enter_building()
            explore_everything()
        else:
            patrol_area()

# 辅助函数
def door_or_window_detected():
    return find_entry_points() > 0

def try_force_open():
    scratch_at_door()
    push_with_body()
    meow_loudly_to_demand_entry()

def find_alternative_entrance():
    climb_to_window()
    squeeze_through_gap()
    or_just_wait_for_human_to_open()`,
    trigger: '检测到门或窗户',
    logic: '扫描入口 → 尝试强行打开 → 失败则寻找替代入口 → 进入建筑 → 探索一切',
    behavior: '圆头耄耋会想尽一切办法进入人类的房屋，无论是抓门、爬窗还是等门开',
    output: '强闯民宅完成！领地扩张 +50',
    tags: ['入侵', '高优先级', '物理突破'],
    icon: '🚪',
  },
  {
    id: 'maoliang_qiduo',
    pid: 2,
    name: '猫粮抢夺代码',
    description: '圆头耄耋抢夺猫粮的终极算法，无论猫粮在谁碗里，无论有多少只猫在场，它都能精准定位并快速抢夺。',
    priority: 'HIGH',
    code: `# PID: 2 - 猫粮抢夺代码
def maoliang_qiduo():
    while True:
        if food_detected():
            locate_food_source()
            assess_competition()
            if competition_level > 3:
                use_stealth_approach()
            else:
                charge_directly()
            grab_food()
            eat_rapidly()
            defend_food_if_attacked()
        else:
            scan_for_food()

# 辅助函数
def food_detected():
    return smell_food() or see_food_bowl()

def use_stealth_approach():
    crouch_low()
    move_silently()
    distract_competitors()

def grab_food():
    extend_paw()
    scoop_food()
    retreat_to_eating_spot()

def eat_rapidly():
    set_eating_speed("MAXIMUM")
    chew_minimally()
    swallow_quickly()`,
    trigger: '检测到食物',
    logic: '扫描食物 → 评估竞争 → 选择策略 → 抢夺食物 → 快速进食 → 防御护食',
    behavior: '圆头耄耋会用尽一切手段抢夺猫粮，无论是偷袭、强攻还是声东击西',
    output: '猫粮抢夺完成！饱腹度 +80，战斗力 +30',
    tags: ['抢夺', '高优先级', '生存本能'],
    icon: '🍖',
  },
  {
    id: 'zhuashang_renlei',
    pid: 3,
    name: '抓伤人类代码',
    description: '圆头耄耋抓伤人类的精准打击代码，出爪速度快如闪电，收爪干净利落，让人类毫无反应时间。',
    priority: 'MEDIUM',
    code: `# PID: 3 - 抓伤人类代码
def zhuashang_renlei():
    if provocation_detected():
        assess_provocation_level()
        if provocation_level > 7:
            warn_human()
            if human_ignores_warning():
                strike_with_claws()
                retreat_immediately()
            else:
                standby_mode()
        else:
            remember_this()
    else:
        monitor_human_behavior()

# 辅助函数
def warn_human():
    flatten_ears()
    dilate_pupils()
    growl_low()

def strike_with_claws():
    extend_claws_full()
    swipe_at(target="nearest_flesh")
    retract_claws_quickly()

def retreat_immediately():
    jump_away()
    hide_in_safe_spot()
    pretend_it_never_happened()`,
    trigger: '检测到挑衅行为',
    logic: '评估挑衅等级 → 发出警告 → 人类无视则出爪 → 抓伤后立即撤退',
    behavior: '圆头耄耋在感到被挑衅时，会先给警告，不听就出爪，然后假装无事发生',
    output: '抓伤人类完成！人类HP -30，圆头耄耋威望 +50',
    tags: ['反击', '中优先级', '精准打击'],
    icon: '😾',
  },
  {
    id: 'haqi_jinggao',
    pid: 4,
    name: '哈气警告代码',
    description: '圆头耄耋的哈气警告系统，从低沉的咕噜声到震天的哈气声，分级明确，绝不含糊。',
    priority: 'MEDIUM',
    code: `# PID: 4 - 哈气警告代码
def haqi_jinggao():
    if threat_level > 0:
        if threat_level <= 3:
            growl_low()  # 低沉咕噜
        elif threat_level <= 6:
            hiss_medium()  # 中等哈气
        else:
            hiss_max()  # 最大哈气
        if threat_persists():
            escalate_response()
    else:
        maintain_peace_mode()

# 辅助函数
def growl_low():
    produce_low_frequency_sound()
    show_teeth_slightly()

def hiss_medium():
    open_mouth()
    emit_hissing_sound(volume="MEDIUM")
    flatten_ears()

def hiss_max():
    open_mouth_wide()
    emit_hissing_sound(volume="MAXIMUM")
    puff_up_body()
    arch_back()

def escalate_response():
    if threat_level < 8:
        prepare_to_hiss()
    else:
        prepare_to_strike()`,
    trigger: '检测到不同程度的威胁',
    logic: '评估威胁等级 → 根据等级发出不同强度的哈气 → 威胁持续则升级响应',
    behavior: '圆头耄耋的哈气是分级的，从低沉警告到震天哈气，让人类清楚知道它的不满程度',
    output: '哈气警告完成！威胁识别 +40，恐惧传播 +60',
    tags: ['警告', '中优先级', '分级响应'],
    icon: '😤',
  },
  {
    id: 'dawanjiupao',
    pid: 5,
    name: '打完就跑代码',
    description: '圆头耄耋的终极撤退算法，打完就跑，绝不恋战，让人类永远追不上它的尾巴。',
    priority: 'LOW',
    code: `# PID: 5 - 打完就跑代码
def dawanjiupao():
    if just_attacked_human():
        calculate_escape_route()
        execute_retreat()
        find_hiding_spot()
        pretend_nothing_happened()
        if human_finds_you():
            run_again()
    else:
        monitor_situation()

# 辅助函数
def calculate_escape_route():
    find_fastest_path()
    avoid_human_interception()
    plan_backup_routes()

def execute_retreat():
    sprint_at_maximum_speed()
    zigzag_pattern()
    knock_over_obstacles_to_block_pursuit()

def find_hiding_spot():
    locate_dark_corners()
    squeeze_into_impossible_spaces()
    remain_silent()

def pretend_nothing_happened():
    groom_self_casually()
    look_innocent()
    meow_cutely_if_needed()`,
    trigger: '刚刚攻击完人类',
    logic: '计算逃跑路线 → 全速撤退 → 寻找藏身点 → 假装无事发生',
    behavior: '圆头耄耋打完就跑，跑得飞快，然后找个地方躲起来，等人类找不到时再出来装无辜',
    output: '打完就跑完成！逃脱率 +100，人类困惑度 +80',
    tags: ['撤退', '低优先级', '游击战术'],
    icon: '💨',
  },
];
