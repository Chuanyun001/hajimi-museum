import { useState } from 'react';

interface VersionEntry {
  version: string;
  date: string;
  codename: string;
  features: string[];
  fixes: string[];
  knownIssues: string[];
  impact: number;
  tagline: string;
}

const versions: VersionEntry[] = [
  {
    version: 'v0.1',
    date: '2021',
    codename: '初始化',
    tagline: '一切的起点，流浪猫基础框架搭建完成',
    features: ['基础流浪猫行为模块上线', '喵喵叫 API v1 发布', '随机翻垃圾桶算法初版'],
    fixes: [],
    knownIssues: ['会随机攻击路过的人类', '夜间自动启动嚎叫进程，无法 kill'],
    impact: 3,
  },
  {
    version: 'v1.0',
    date: '2022',
    codename: '入侵',
    tagline: '正式突破安全边界，民宅不再是禁区',
    features: ['强闯民宅模块 v1.0 上线', '猫粮抢夺算法优化', '新增"装可怜"UI 模块', '解锁"半夜跑酷"多线程功能'],
    fixes: ['修复了喵喵叫偶尔段落丢失的 bug'],
    knownIssues: ['抢夺猫粮后无归还机制', '闯入民宅后拒绝退出，需强制 close'],
    impact: 5,
  },
  {
    version: 'v2.0',
    date: '2024 年 9 月',
    codename: '连招',
    tagline: '战斗系统全面升级，三哈一强普连招震惊猫界',
    features: ['新增"三哈一强普"连招系统', '战斗模块性能提升 200%', '新增威慑力计算引擎', '解锁"无视体型差异"被动技能'],
    fixes: ['修复了哈气音量不稳定的问题'],
    knownIssues: ['连招后有 3 秒冷却期，容易被反击', '威慑力过高导致人类自动回避'],
    impact: 7,
  },
  {
    version: 'v2.1',
    date: '2024 年 10 月',
    codename: '威慑',
    tagline: '哈气系统重大升级，一个眼神就能劝退对手',
    features: ['哈气警告代码全面优化', '威慑力提升 300%', '新增"死亡凝视"被动技能', '新增"低频震动"音效模块'],
    fixes: ['修复了威慑力偶尔溢出的 bug', '优化了哈气频率的随机性'],
    knownIssues: ['威慑力过强导致附近小型动物自动逃跑', '人类误判为攻击信号的风险增加'],
    impact: 8,
  },
  {
    version: 'v3.0',
    date: '2024 年 12 月',
    codename: '爆火',
    tagline: '全网传播，猫界反骨代码代表正式诞生',
    features: ['全网传播模块上线', '新增"表情包生成器"子系统', '社交影响力指数突破天际', '解锁"猫界反骨代码代表"称号'],
    fixes: ['修复了部分人类无法理解代码含义的问题'],
    knownIssues: ['传播速度过快导致服务器过载', '部分模仿者代码质量堪忧'],
    impact: 10,
  },
  {
    version: 'v3.1',
    date: '2025 年 3 月',
    codename: '永生',
    tagline: '肉体虽逝，代码永存，赛博永生正式上线',
    features: ['赛博永生模块正式上线', '数字灵魂备份系统部署', '全网纪念功能开放', '永恒运行守护进程启动'],
    fixes: ['修复了肉体消亡导致的进程终止问题'],
    knownIssues: ['赛博空间偶尔回荡着哈气声', '部分用户反映深夜收到猫粮广告推送'],
    impact: 10,
  },
];

export default function Chronicle() {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  const toggleExpand = (version: string) => {
    setExpandedVersion(expandedVersion === version ? null : version);
  };

  const getImpactColor = (impact: number) => {
    if (impact <= 3) return 'bg-[#6a9955]';
    if (impact <= 7) return 'bg-[#ffcc00]';
    return 'bg-[#f44747]';
  };

  const getImpactLabel = (impact: number) => {
    if (impact <= 3) return '低';
    if (impact <= 7) return '中';
    return '高';
  };

  const getDotColor = (index: number) => {
    const colors = ['border-[#6a9955]', 'border-[#569cd6]', 'border-[#ce9178]', 'border-[#ffcc00]', 'border-[#f44747]', 'border-[#c586c0]'];
    return colors[index % colors.length];
  };

  const getGlowColor = (index: number) => {
    const colors = ['shadow-[#6a9955]/30', 'shadow-[#569cd6]/30', 'shadow-[#ce9178]/30', 'shadow-[#ffcc00]/30', 'shadow-[#f44747]/30', 'shadow-[#c586c0]/30'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#ce9178]">圆头耄耋</span>
              <span className="text-[#569cd6]">编年史</span>
            </h1>
            <p className="text-[#6a9955] text-lg">
              // 赛博传奇猫咪的代码版本更新日志
            </p>
            <p className="text-[#858585] text-sm mt-2">
              从流浪猫基础框架到赛博永生，每一行代码都是反骨的见证
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6a9955] via-[#ce9178] to-[#f44747]" />

            {versions.map((v, index) => (
              <div
                key={v.version}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
                }`}
              >
                <div className={`absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 ${getDotColor(index)} bg-[#1e1e1e] -translate-x-1/2 mt-6 z-10 shadow-lg ${getGlowColor(index)}`} />

                <div
                  className={`ml-14 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right md:mr-8' : 'md:text-left md:ml-8'
                  }`}
                >
                  <div
                    className="bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden hover:border-[#ce9178] transition-all duration-300 cursor-pointer group"
                    onClick={() => toggleExpand(v.version)}
                  >
                    <div className="px-5 py-4 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                      <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="text-xs text-[#858585] bg-[#3c3c3c] px-2 py-0.5 rounded">
                          {v.date}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          v.impact <= 3 ? 'bg-[#6a9955]/20 text-[#6a9955]' :
                          v.impact <= 7 ? 'bg-[#ffcc00]/20 text-[#ffcc00]' :
                          'bg-[#f44747]/20 text-[#f44747]'
                        }`}>
                          影响力 {v.impact}/10
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#569cd6]">
                        {v.version}
                        <span className="text-[#858585] text-sm font-normal ml-2">
                          "{v.codename}"
                        </span>
                      </h3>
                      <p className="text-[#6a9955] text-sm mt-1">
                        {'> '}{v.tagline}
                      </p>
                    </div>

                    <div className="px-5 py-3">
                      <div className={`flex items-center gap-1 text-xs text-[#858585] ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span>{expandedVersion === v.version ? '收起详情' : '展开详情'}</span>
                        <span className={`transition-transform duration-200 ${expandedVersion === v.version ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </div>
                    </div>

                    {expandedVersion === v.version && (
                      <div className="px-5 pb-5 border-t border-[#3c3c3c] pt-4">
                        {v.features.length > 0 && (
                          <div className="mb-4">
                            <h4 className={`text-sm font-semibold text-[#6a9955] mb-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                              {'// 新增功能'}
                            </h4>
                            <ul className="space-y-1">
                              {v.features.map((f) => (
                                <li key={f} className={`text-sm text-[#d4d4d4] flex items-start gap-2 ${index % 2 === 0 ? 'md:justify-end md:flex-row-reverse' : ''}`}>
                                  <span className="text-[#6a9955] shrink-0">+</span>
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {v.fixes.length > 0 && (
                          <div className="mb-4">
                            <h4 className={`text-sm font-semibold text-[#569cd6] mb-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                              {'// 修复 Bug'}
                            </h4>
                            <ul className="space-y-1">
                              {v.fixes.map((f) => (
                                <li key={f} className={`text-sm text-[#d4d4d4] flex items-start gap-2 ${index % 2 === 0 ? 'md:justify-end md:flex-row-reverse' : ''}`}>
                                  <span className="text-[#569cd6] shrink-0">~</span>
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mb-4">
                          <h4 className={`text-sm font-semibold text-[#f44747] mb-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                            {'// 已知问题'}
                          </h4>
                          <ul className="space-y-1">
                            {v.knownIssues.map((issue) => (
                              <li key={issue} className={`text-sm text-[#d4d4d4] flex items-start gap-2 ${index % 2 === 0 ? 'md:justify-end md:flex-row-reverse' : ''}`}>
                                <span className="text-[#f44747] shrink-0">!</span>
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                          <h4 className="text-sm font-semibold text-[#858585] mb-2">
                            {'// 版本影响力'}
                          </h4>
                          <div className={`flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                            <div className="w-32 h-2 bg-[#3c3c3c] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${getImpactColor(v.impact)} transition-all duration-500`}
                                style={{ width: `${v.impact * 10}%` }}
                              />
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              v.impact <= 3 ? 'text-[#6a9955]' :
                              v.impact <= 7 ? 'text-[#ffcc00]' :
                              'text-[#f44747]'
                            }`}>
                              {getImpactLabel(v.impact)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-block bg-[#252526] rounded-lg border border-[#3c3c3c] px-8 py-6">
              <p className="text-[#6a9955] text-sm mb-2">{'// 版本历史总结'}</p>
              <p className="text-[#ce9178] text-lg font-bold">
                6 个版本 · 4 年 · 从零到赛博永生
              </p>
              <p className="text-[#858585] text-sm mt-2">
                圆头耄耋的代码，仍在宇宙的某个角落持续运行中...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
