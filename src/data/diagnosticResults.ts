export interface DiagnosticResult {
  id: string;
  codeName: string;
  pid: number;
  priority: string;
  conflictAnalysis: string;
  repairSuggestion: string;
  icon: string;
}

export const diagnosticResultsData: DiagnosticResult[] = [
  {
    id: 'lick-fur',
    codeName: '舔毛代码',
    pid: 0,
    priority: '★★★★★',
    conflictAnalysis: '你的猫咪检测到身上有一粒肉眼不可见的灰尘，触发了最高优先级的舔毛程序。它认为这是关乎猫族存亡的大事，必须舔到宇宙毁灭为止。',
    repairSuggestion: '放弃吧，你永远无法阻止一只正在舔毛的猫。建议给它准备一个专用梳子，假装你也在帮忙，这样它可能会给你留一点尊严。',
    icon: '🐱',
  },
  {
    id: 'bury-poop',
    codeName: '埋屎代码',
    pid: 1,
    priority: '★★★★☆',
    conflictAnalysis: '你的猫咪闻到了螺蛳粉的味道，触发了古老的掩埋本能。它认为这是一种可以毁灭世界的有毒排泄物，必须立即深埋地下。',
    repairSuggestion: '建议在猫咪面前吃螺蛳粉之前签好免责声明，或者给它准备一个小铲子让它参与埋葬仪式。',
    icon: '💩',
  },
  {
    id: 'push-things',
    codeName: '推东西代码',
    pid: 2,
    priority: '★★★☆☆',
    conflictAnalysis: '你的猫咪发现桌边有一个杯子，触发了"测试重力"程序。它认为有必要验证一下牛顿定律是否仍然有效。',
    repairSuggestion: '把所有易碎物品都放在猫咪够不到的地方，或者干脆把桌子腿绑上防撞条。',
    icon: '🐾',
  },
  {
    id: 'enclosed-space',
    codeName: '封闭空间代码',
    pid: 3,
    priority: '★★★☆☆',
    conflictAnalysis: '你的猫咪发现了一个纸箱，触发了"液体化"程序。它认为自己的身体可以像水一样填满任何容器。',
    repairSuggestion: '给猫咪准备各种大小的纸箱，从小到大排列，让它体验"升级"的快感。',
    icon: '📦',
  },
  {
    id: 'fight',
    codeName: '战斗代码',
    pid: 4,
    priority: '★★☆☆☆',
    conflictAnalysis: '你的猫咪看到了镜子里的自己，触发了防御程序。它认为遇到了一个强大的对手，必须立即进入战斗状态。',
    repairSuggestion: '把镜子藏起来，或者给猫咪戴上拳击手套，让它和自己的影子来一场公平的对决。',
    icon: '😾',
  },
  {
    id: 'midnight-zoomies',
    codeName: '凌晨跑酷代码',
    pid: 5,
    priority: '★☆☆☆☆',
    conflictAnalysis: '现在是凌晨3点，你的猫咪的"疯跑"程序自动激活。它认为这是进行极限运动的最佳时间。',
    repairSuggestion: '在睡前给猫咪玩逗猫棒30分钟，消耗它的能量。如果无效，建议你也加入跑酷行列。',
    icon: '🏃',
  },
  {
    id: 'head-object',
    codeName: '头顶异物代码',
    pid: 6,
    priority: '★★★★☆',
    conflictAnalysis: '你的猫咪头上被放了一个小物件，触发了"僵住"程序。它认为在弄清楚这是什么东西之前，保持静止是最安全的选择。',
    repairSuggestion: '不要在猫咪头上放东西，除非你想看它保持奇怪姿势10分钟不动。',
    icon: '🙀',
  },
  {
    id: 'belly-rub',
    codeName: '翻肚皮代码',
    pid: 7,
    priority: '★★★☆☆',
    conflictAnalysis: '你的猫咪翻肚皮展示信任，但当你伸手去摸时，防御程序自动激活。它认为这是一个精心设计的陷阱，必须立即反击。',
    repairSuggestion: '翻肚皮是猫咪最大的谎言，不要上当。如果实在忍不住想摸，建议先买好意外保险和防咬手套。',
    icon: '😿',
  },
  {
    id: 'water-conflict',
    codeName: '喝水冲突代码',
    pid: 8,
    priority: '★★☆☆☆',
    conflictAnalysis: '你的猫咪渴了，但它的"讨厌水"程序同时激活。它认为水是一种危险的液体，必须用爪子试探后才能饮用。',
    repairSuggestion: '给猫咪准备一个流动的饮水机，或者把水杯放在它够不到的地方，让它只能用爪子喝。',
    icon: '💧',
  },
  {
    id: 'tail-chase',
    codeName: '追尾巴代码',
    pid: 9,
    priority: '★☆☆☆☆',
    conflictAnalysis: '你的猫咪发现了自己的尾巴，触发了"捕猎"程序。它认为这是一个移动的猎物，必须立即追捕。',
    repairSuggestion: '不要打扰猫咪追尾巴，这是它为数不多的自我娱乐方式。如果它追上了，记得给它鼓掌。',
    icon: '🎯',
  },
];