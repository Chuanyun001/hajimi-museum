import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Level {
  id: number;
  title: string;
  description: string;
  buggyCode: string[];
  options: { id: string; code: string[]; isCorrect: boolean }[];
  explanation: string;
  crashMessage: string;
}

const levels: Level[] = [
  {
    id: 1,
    title: '修复无限哈气 bug',
    description: '圆头耄耋的哈气模块陷入了无限循环，导致整个猫系统资源耗尽',
    buggyCode: [
      'class YuantouMaodie {',
      '  constructor() {',
      '    this.hissCount = 0;',
      '    this.anger = 100;',
      '  }',
      '',
      '  hiss() {',
      '    while (this.anger > 0) {',
      '      console.log("嘶————！！！");',
      '      this.hissCount++;',
      '      // BUG: 忘记减少愤怒值',
      '    }',
      '  }',
      '}',
    ],
    options: [
      {
        id: 'a',
        code: ['  hiss() {', '    while (this.anger > 0) {', '      console.log("嘶————！！！");', '      this.hissCount++;', '      this.anger -= 10;', '    }', '  }'],
        isCorrect: true,
      },
      {
        id: 'b',
        code: ['  hiss() {', '    if (this.anger > 0) {', '      console.log("嘶————！！！");', '      this.hissCount++;', '    }', '  }'],
        isCorrect: false,
      },
      {
        id: 'c',
        code: ['  hiss() {', '    while (this.anger > 0) {', '      console.log("嘶————！！！");', '      this.hissCount++;', '      this.anger += 10;', '    }', '  }'],
        isCorrect: false,
      },
    ],
    explanation: '需要在循环中减少 anger 值，否则哈气永不停止！',
    crashMessage: '猫咪宕机：无限哈气导致声带过载 🔊💥',
  },
  {
    id: 2,
    title: '解决猫粮抢夺优先级过高',
    description: '圆头耄耋的猫粮抢夺代码优先级设置过高，导致其他所有行为都被阻塞',
    buggyCode: [
      'const behaviorPriority = {',
      '  stealFood:    9999,  // 优先级过高！',
      '  sleep:        10,',
      '  play:         5,',
      '  groom:        3,',
      '  ignore_human: 1,',
      '};',
      '',
      'function selectBehavior(cat) {',
      '  // BUG: 总是选择优先级最高的行为',
      '  return Object.keys(behaviorPriority)',
      '    .sort((a, b) => behaviorPriority[b] - behaviorPriority[a])[0];',
      '}',
    ],
    options: [
      {
        id: 'a',
        code: ['function selectBehavior(cat) {', '  const randomFactor = Math.random() * 100;', '  return Object.keys(behaviorPriority)', '    .filter(b => behaviorPriority[b] <= randomFactor)', '    .sort((a, b) => behaviorPriority[b] - behaviorPriority[a])[0] || "sleep";', '}'],
        isCorrect: false,
      },
      {
        id: 'b',
        code: ['const behaviorPriority = {', '  stealFood:    15,', '  sleep:        10,', '  play:         8,', '  groom:        5,', '  ignore_human: 3,', '};'],
        isCorrect: true,
      },
      {
        id: 'c',
        code: ['function selectBehavior(cat) {', '  if (cat.isHungry) return "stealFood";', '  return "sleep";', '}'],
        isCorrect: false,
      },
    ],
    explanation: '将 stealFood 的优先级调整到合理范围，让其他行为也有机会执行',
    crashMessage: '猫咪宕机：猫粮抢夺模块占用了 99.9% 的 CPU 🍖💀',
  },
  {
    id: 3,
    title: '优化三哈一强普连招伤害',
    description: '圆头耄耋的连招系统存在伤害计算错误，导致输出严重不足',
    buggyCode: [
      'function comboAttack(cat) {',
      '  let totalDamage = 0;',
      '  const combo = ["hiss", "hiss", "hiss", "strongAttack"];',
      '',
      '  combo.forEach((skill, index) => {',
      '    let damage = skill === "strongAttack" ? 100 : 20;',
      '    // BUG: 连击加成计算错误',
      '    let comboBonus = index * 0.1;',
      '    totalDamage += damage * comboBonus;',
      '  });',
      '',
      '  return totalDamage;',
      '}',
    ],
    options: [
      {
        id: 'a',
        code: ['  combo.forEach((skill, index) => {', '    let damage = skill === "strongAttack" ? 100 : 20;', '    let comboBonus = 1 + index * 0.1;', '    totalDamage += damage * comboBonus;', '  });'],
        isCorrect: true,
      },
      {
        id: 'b',
        code: ['  combo.forEach((skill, index) => {', '    let damage = skill === "strongAttack" ? 200 : 40;', '    let comboBonus = index * 0.1;', '    totalDamage += damage * comboBonus;', '  });'],
        isCorrect: false,
      },
      {
        id: 'c',
        code: ['  combo.forEach((skill, index) => {', '    let damage = skill === "strongAttack" ? 100 : 20;', '    let comboBonus = index + 1;', '    totalDamage += damage + comboBonus;', '  });'],
        isCorrect: false,
      },
    ],
    explanation: '连击加成应该是 1 + index * 0.1，而不是 index * 0.1，否则第一击伤害为 0！',
    crashMessage: '猫咪宕机：连招系统输出溢出，伤害变成了负数 📉😾',
  },
  {
    id: 4,
    title: '修复抓伤人类误触发',
    description: '圆头耄耋的抓伤代码在被摸肚子时误触发，连友好的人类也被攻击',
    buggyCode: [
      'class ClawSystem {',
      '  shouldAttack(human) {',
      '    const threatLevel = human.isStranger ? 80 : 20;',
      '    const pettingZone = human.pettingArea;',
      '',
      '    // BUG: 摸肚子时误判为攻击',
      '    if (pettingZone === "belly") {',
      '      return true;  // 任何摸肚子都触发攻击',
      '    }',
      '',
      '    return threatLevel > 50;',
      '  }',
      '}',
    ],
    options: [
      {
        id: 'a',
        code: ['  shouldAttack(human) {', '    const threatLevel = human.isStranger ? 80 : 20;', '    const trustLevel = human.trustLevel || 0;', '', '    if (human.pettingArea === "belly") {', '      return trustLevel < 50;', '    }', '', '    return threatLevel > 50;', '  }'],
        isCorrect: true,
      },
      {
        id: 'b',
        code: ['  shouldAttack(human) {', '    const threatLevel = human.isStranger ? 80 : 20;', '', '    if (human.pettingArea === "belly") {', '      return false;  // 永不攻击', '    }', '', '    return threatLevel > 50;', '  }'],
        isCorrect: false,
      },
      {
        id: 'c',
        code: ['  shouldAttack(human) {', '    const threatLevel = human.isStranger ? 80 : 20;', '', '    if (human.pettingArea === "belly" && human.isStranger) {', '      return true;', '    }', '', '    return threatLevel > 50;', '  }'],
        isCorrect: false,
      },
    ],
    explanation: '需要检查信任等级！信任度高的铲屎官可以摸肚子，陌生人不行',
    crashMessage: '猫咪宕机：爪子系统过载，误伤了正在铲屎的无辜人类 🐾😱',
  },
  {
    id: 5,
    title: '终极挑战：尝试驯服圆头耄耋',
    description: '这是一段理论上可以驯服圆头耄耋的代码... 理论上',
    buggyCode: [
      'function tryToTame(maodie) {',
      '  const attempts = [',
      '    "提供小鱼干",',
      '    "温柔抚摸",',
      '    "陪它玩耍",',
      '    "给它买玩具"',
      '  ];',
      '',
      '  attempts.forEach(attempt => {',
      '    const result = maodie.react(attempt);',
      '    if (result === "success") {',
      '      return "驯服成功！";  // BUG: return 只退出了 forEach',
      '    }',
      '  });',
      '',
      '  return "驯服失败，它跑了";',
      '}',
    ],
    options: [
      {
        id: 'a',
        code: ['function tryToTame(maodie) {', '  const attempts = ["提供小鱼干", "温柔抚摸", "陪它玩耍", "给它买玩具"];', '  for (const attempt of attempts) {', '    const result = maodie.react(attempt);', '    if (result === "success") {', '      return "驯服成功！";', '    }', '  }', '  return "驯服失败，它跑了";', '}'],
        isCorrect: false,
      },
      {
        id: 'b',
        code: ['function tryToTame(maodie) {', '  // 圆头耄耋无法被驯服', '  return "Error: 驯服不可能成功，这是圆头耄耋";', '}'],
        isCorrect: true,
      },
      {
        id: 'c',
        code: ['function tryToTame(maodie) {', '  let tamed = false;', '  const attempts = ["提供小鱼干", "温柔抚摸", "陪它玩耍", "给它买玩具"];', '  attempts.forEach(attempt => {', '    if (maodie.react(attempt) === "success") tamed = true;', '  });', '  return tamed ? "驯服成功！" : "驯服失败，它跑了";', '}'],
        isCorrect: false,
      },
    ],
    explanation: '圆头耄耋是不可驯服的！这是宇宙的基本法则之一。正确答案是承认这个事实 😾',
    crashMessage: '系统崩溃：检测到不可能完成的任务，猫脑已过载 🧠💥',
  },
];

function CodeLine({ line, lineNum }: { line: string; lineNum: number }) {
  const highlight = (text: string) => {
    let result = text;
    const keywords = ['class', 'constructor', 'function', 'const', 'let', 'var', 'return', 'if', 'else', 'while', 'for', 'forEach', 'new', 'this', 'true', 'false', 'null', 'undefined'];
    keywords.forEach(kw => {
      result = result.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="text-[#569cd6]">${kw}</span>`);
    });
    result = result.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-[#ce9178]">$&</span>');
    result = result.replace(/\/\/.*$/gm, '<span class="text-[#6a9955]">$&</span>');
    result = result.replace(/\b\d+\.?\d*\b/g, '<span class="text-[#b5cea8]">$&</span>');
    result = result.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="text-[#dcdcaa]">$1</span>(');
    return result;
  };

  return (
    <div className="flex hover:bg-[#264f78]/30 transition-colors duration-150">
      <span className="w-10 text-right pr-4 text-[#858585] select-none shrink-0">{lineNum}</span>
      <span className="flex-1" dangerouslySetInnerHTML={{ __html: highlight(line) || '&nbsp;' }} />
    </div>
  );
}

function CrashAnimation({ message, onRetry }: { message: string; onRetry: () => void }) {
  const [glitch, setGlitch] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setGlitch(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className={`bg-[#1e1e1e] border-2 border-[#f44747] rounded-lg p-8 max-w-md mx-4 ${glitch ? 'animate-glitch' : ''}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">💥</div>
          <h3 className="text-2xl font-bold text-[#f44747] mb-4">猫咪宕机！</h3>
          <div className="bg-[#f44747]/10 border border-[#f44747]/30 rounded-lg p-4 mb-6">
            <p className="text-[#f44747] text-sm font-mono">{message}</p>
          </div>
          <div className="text-[#858585] text-xs mb-6">
            <p>{'>'} cat.exe 已停止运行</p>
            <p>{'>'} 正在重启猫咪系统...</p>
            <p className="animate-pulse">{'>'} 请稍候...</p>
          </div>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-[#f44747] text-white rounded-lg hover:bg-[#f44747]/80 transition-colors"
          >
            重启猫咪 (./restart.sh)
          </button>
        </div>
      </div>
    </div>
  );
}

function VictoryScreen({ onRestart }: { onRestart: () => void }) {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 500);
    const t2 = setTimeout(() => setShowDetails(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-[#252526] rounded-lg border border-[#6a9955] overflow-hidden shadow-2xl">
          <div className="flex items-center px-4 py-2 bg-[#6a9955]/20 border-b border-[#6a9955]/30">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#f44747]" />
              <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
              <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
            </div>
            <div className="ml-4 text-xs text-[#6a9955]">
              achievement-unlocked.exe
            </div>
          </div>

          <div className="p-8">
            <div className={`text-center transition-all duration-1000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-6xl mb-6">🏆</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#6a9955]">恭喜通关！</span>
              </h1>
              <div className="bg-[#569cd6]/10 border border-[#569cd6]/30 rounded-lg p-4 mb-6 inline-block">
                <p className="text-[#569cd6] text-xl">获得称号：</p>
                <p className="text-[#d7ba7d] text-2xl font-bold mt-2">「资深猫奴程序员」</p>
              </div>
            </div>

            {showDetails && (
              <div className="mt-8 space-y-4 animate-fadeIn">
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <p className="text-[#6a9955] text-sm mb-2">// 通关评价</p>
                  <p className="text-[#d4d4d4]">
                    你成功修复了圆头耄耋的 5 个致命 bug，虽然最后一个 bug 的修复方案是承认它不可驯服...
                  </p>
                </div>

                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <p className="text-[#ce9178] text-sm mb-2">// 获得技能</p>
                  <div className="flex flex-wrap gap-2">
                    {['无限哈气防御', '猫粮优先级调整', '连招伤害优化', '误触发修复', '接受现实'].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-[#569cd6]/20 text-[#569cd6] rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f44747]/10 rounded-lg p-4 border border-[#f44747]/30">
                  <p className="text-[#f44747] text-sm mb-2">// 警告</p>
                  <p className="text-[#d4d4d4] text-sm">
                    即使你修复了所有 bug，圆头耄耋依然我行我素。这不是代码的问题，是猫的问题。
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={onRestart}
                    className="flex-1 px-6 py-3 bg-[#569cd6] text-white rounded-lg hover:bg-[#569cd6]/80 transition-colors"
                  >
                    🔄 再次挑战
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 px-6 py-3 bg-[#3c3c3c] text-[#d4d4d4] rounded-lg hover:bg-[#3c3c3c]/80 transition-colors"
                  >
                    🏠 返回首页
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CodeDebugger() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showCrash, setShowCrash] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const level = levels[currentLevel];

  const handleOptionSelect = useCallback((optionId: string) => {
    if (selectedOption) return;
    setSelectedOption(optionId);

    const option = level.options.find(o => o.id === optionId);
    if (option?.isCorrect) {
      setShowExplanation(true);
      setScore(prev => prev + 1);
    } else {
      setShowCrash(true);
    }
  }, [selectedOption, level]);

  const handleNextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setGameComplete(true);
    }
  }, [currentLevel]);

  const handleRetry = useCallback(() => {
    setSelectedOption(null);
    setShowCrash(false);
    setShowHint(false);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentLevel(0);
    setSelectedOption(null);
    setShowCrash(false);
    setShowExplanation(false);
    setGameComplete(false);
    setScore(0);
    setShowHint(false);
  }, []);

  if (gameComplete) {
    return <VictoryScreen onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      {showCrash && (
        <CrashAnimation message={level.crashMessage} onRetry={handleRetry} />
      )}

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-[#569cd6]">圆头耄耋</span>
              <span className="text-[#d4d4d4]">代码调试器</span>
            </h1>
            <p className="text-[#6a9955]">// 修复 bug，拯救猫咪系统</p>
          </div>

          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center space-x-2">
              {levels.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < currentLevel
                      ? 'bg-[#6a9955] text-white'
                      : i === currentLevel
                      ? 'bg-[#569cd6] text-white'
                      : 'bg-[#3c3c3c] text-[#858585]'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="text-sm text-[#858585]">
              得分: <span className="text-[#6a9955]">{score}</span>/{levels.length}
            </div>
          </div>

          <div className="bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden mb-6">
            <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#f44747]" />
                <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
              </div>
              <div className="ml-4 text-xs text-[#858585]">
                level-{level.id}-buggy-code.js
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[#d7ba7d] mb-2">
                  关卡 {level.id}: {level.title}
                </h2>
                <p className="text-[#858585] text-sm">{level.description}</p>
              </div>

              <div className="bg-[#1e1e1e] rounded-lg border border-[#f44747]/30 overflow-hidden">
                <div className="px-4 py-2 bg-[#f44747]/10 border-b border-[#f44747]/20">
                  <span className="text-[#f44747] text-xs">⚠ 检测到 bug</span>
                </div>
                <div className="p-4 text-sm overflow-x-auto">
                  {level.buggyCode.map((line, i) => (
                    <CodeLine key={i} line={line} lineNum={i + 1} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
            <div className="px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <span className="text-[#569cd6] text-sm">选择修复方案：</span>
            </div>
            <div className="p-4 space-y-4">
              {level.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = option.isCorrect;
                const showResult = selectedOption !== null;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      showResult
                        ? isSelected && isCorrect
                          ? 'border-[#6a9955] bg-[#6a9955]/10'
                          : isSelected && !isCorrect
                          ? 'border-[#f44747] bg-[#f44747]/10'
                          : 'border-[#3c3c3c] opacity-50'
                        : 'border-[#3c3c3c] hover:border-[#569cd6] hover:bg-[#264f78]/20'
                    }`}
                  >
                    <div className="px-4 py-2 bg-[#1e1e1e] border-b border-[#3c3c3c] flex items-center justify-between">
                      <span className="text-[#858585] text-xs">方案 {option.id.toUpperCase()}</span>
                      {showResult && isSelected && (
                        <span className={isCorrect ? 'text-[#6a9955]' : 'text-[#f44747]'}>
                          {isCorrect ? '✓ 正确' : '✗ 错误'}
                        </span>
                      )}
                    </div>
                    <div className="p-3 text-xs overflow-x-auto">
                      {option.code.map((line, i) => (
                        <CodeLine key={i} line={line} lineNum={i + 1} />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className="mt-6 bg-[#6a9955]/10 border border-[#6a9955]/30 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-[#6a9955] font-bold mb-2">修复成功！</h3>
                  <p className="text-[#d4d4d4] text-sm">{level.explanation}</p>
                  <button
                    onClick={handleNextLevel}
                    className="mt-4 px-6 py-2 bg-[#6a9955] text-white rounded-lg hover:bg-[#6a9955]/80 transition-colors"
                  >
                    {currentLevel < levels.length - 1 ? '进入下一关 →' : '查看通关结果 🏆'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {!showExplanation && !showCrash && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 text-sm text-[#858585] hover:text-[#d4d4d4] transition-colors"
              >
                {showHint ? '隐藏提示' : '💡 需要提示？'}
              </button>
            </div>
          )}

          {showHint && (
            <div className="mt-4 bg-[#d7ba7d]/10 border border-[#d7ba7d]/30 rounded-lg p-4">
              <p className="text-[#d7ba7d] text-sm">
                💡 提示：仔细阅读代码中的注释，bug 通常就在注释标记的地方
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 text-sm text-[#858585] hover:text-[#d4d4d4] transition-colors"
            >
              ← 返回首页
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(5px, -5px); }
          60% { transform: translate(-3px, -3px); }
          80% { transform: translate(3px, 3px); }
        }
        .animate-glitch {
          animation: glitch 0.3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}