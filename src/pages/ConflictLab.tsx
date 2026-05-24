import { useState } from 'react';
import CodeHighlight from '../components/CodeHighlight';
import CatAnimation from '../components/CatAnimation';
import { SCRIPTS } from '../animation/scripts';
import { conflictScenariosData, ConflictScenario } from '../data/conflictScenarios';
import { epicConflictsData, EpicConflict } from '../data/epicConflicts';

function getPreviewLine(code: string): string {
  const lines = code.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
      return trimmed.length > 40 ? trimmed.slice(0, 40) + '...' : trimmed;
    }
  }
  return lines[0]?.trim() || '';
}

export default function ConflictLabPage() {
  const [selectedScenario, setSelectedScenario] = useState<ConflictScenario | null>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'running' | 'conflict' | 'restarted'>('idle');
  const [isShaking, setIsShaking] = useState(false);
  const [selectedEpic, setSelectedEpic] = useState<EpicConflict | null>(null);
  const [epicAnimState, setEpicAnimState] = useState<'idle' | 'running' | 'conflict' | 'restarted'>('idle');
  const [isEpicShaking, setIsEpicShaking] = useState(false);

  const handleRunCode = () => {
    if (animationState !== 'idle') return;
    
    setAnimationState('running');
    
    // 模拟代码执行
    setTimeout(() => {
      setAnimationState('conflict');
      setIsShaking(true);
      
      // 屏幕抖动效果
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
      
      // 显示系统重启
      setTimeout(() => {
        setAnimationState('restarted');
      }, 2000);
    }, 1500);
  };

  const handleRestart = () => {
    setAnimationState('idle');
  };

  const handleEpicRunCode = () => {
    if (epicAnimState !== 'idle') return;
    setEpicAnimState('running');
    setTimeout(() => {
      setEpicAnimState('conflict');
      setIsEpicShaking(true);
      setTimeout(() => setIsEpicShaking(false), 500);
      setTimeout(() => setEpicAnimState('restarted'), 2000);
    }, 1500);
  };

  const handleEpicRestart = () => {
    setEpicAnimState('idle');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'SSS':
        return 'bg-[#ff0000] text-white shadow-lg shadow-[#ff0000]/30';
      case 'SS':
        return 'bg-[#ff6600] text-white shadow-lg shadow-[#ff6600]/30';
      case 'S':
        return 'bg-[#ffcc00] text-[#1e1e1e]';
      case 'A':
        return 'bg-[#569cd6] text-white';
      case 'B':
        return 'bg-[#6a9955] text-white';
      default:
        return 'bg-[#858585] text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '最经典':
        return 'bg-[#f44747] text-white';
      case '趋避型':
        return 'bg-[#ffcc00] text-[#1e1e1e]';
      case '信息过载':
        return 'bg-[#569cd6] text-white';
      case '目标匹配错误':
        return 'bg-[#ce9178] text-white';
      case '状态强制修改':
        return 'bg-[#6a9955] text-white';
      case '双趋型':
        return 'bg-[#dcdcaa] text-[#1e1e1e]';
      default:
        return 'bg-[#858585] text-white';
    }
  };

  return (
    <div className={`min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono ${(isShaking || isEpicShaking) ? 'animate-shake' : ''}`}>
      {/* 页面标题 */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#f44747]">代码冲突</span>
              <span className="text-[#d4d4d4]">实验室</span>
            </h1>
            <p className="text-[#6a9955] text-lg">
              // 6大经典代码冲突场景，带交互式大脑宕机演示
            </p>
            <p className="text-[#858585] text-sm mt-2">
              当猫咪的屎山代码发生冲突，就会触发经典的"大脑宕机"和"僵住不动"症状
            </p>
          </div>

          {/* 冲突场景网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conflictScenariosData.map((scenario) => (
              <div
                key={scenario.id}
                className={`bg-[#252526] rounded-lg border overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                  selectedScenario?.id === scenario.id
                    ? 'border-[#f44747] shadow-lg shadow-[#f44747]/20'
                    : 'border-[#3c3c3c] hover:border-[#f44747]'
                }`}
                onClick={() => {
                  setSelectedScenario(scenario);
                  setAnimationState('idle');
                }}
              >
                <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{scenario.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#d4d4d4]">
                        {scenario.name}
                      </h3>
                      <p className="text-xs text-[#858585]">冲突场景</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${getTypeColor(scenario.type)}`}>
                    {scenario.type}
                  </span>
                </div>

                <div className="p-4 flex-1">
                  <p className="text-sm text-[#858585] mb-3 line-clamp-2">
                    {scenario.description}
                  </p>

                  {/* 动画预览 */}
                  <div className="bg-[#1e1e1e] rounded mb-3 overflow-hidden border border-[#3c3c3c]">
                    {SCRIPTS[scenario.id] ? (
                      <CatAnimation
                        script={SCRIPTS[scenario.id]}
                        width={160}
                        height={88}
                        className="w-full"
                      />
                    ) : (
                      <div className="h-[88px] flex items-center justify-center text-[#858585] text-xs">
                        {scenario.icon} 动画加载中...
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <div className="flex-1 bg-[#1e1e1e] rounded p-2 min-h-[40px]">
                      <div className="text-xs text-[#569cd6] mb-1">模块A</div>
                      <div className="text-xs text-[#858585] truncate">
                        {getPreviewLine(scenario.codeA)}
                      </div>
                    </div>
                    <div className="flex-1 bg-[#1e1e1e] rounded p-2 min-h-[40px]">
                      <div className="text-xs text-[#f44747] mb-1">模块B</div>
                      <div className="text-xs text-[#858585] truncate">
                        {getPreviewLine(scenario.codeB)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2 bg-[#2d2d2d] border-t border-[#3c3c3c]">
                  <p className="text-xs text-[#f44747]">
                    点击查看详情 →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 史诗级代码冲突专区 */}
      <div className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-[#ff0000] text-2xl">🔥</span>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-[#ff0000]">史诗级</span>
                <span className="text-[#d4d4d4]">代码冲突</span>
              </h2>
              <span className="px-2 py-1 text-xs bg-[#ff0000] text-white rounded animate-pulse">
                NEW
              </span>
            </div>
            <p className="text-[#6a9955] text-lg">
              // 圆头耄耋の传说：当反骨代码遇上万物，宇宙为之颤抖
            </p>
            <p className="text-[#858585] text-sm mt-2">
              ⚠️ 警告：以下冲突等级过高，可能导致人类、猫咪、物品同时宕机
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {epicConflictsData.map((conflict) => (
              <div
                key={conflict.id}
                className={`bg-[#252526] rounded-lg border overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                  selectedEpic?.id === conflict.id
                    ? 'border-[#ff0000] shadow-lg shadow-[#ff0000]/20'
                    : 'border-[#3c3c3c] hover:border-[#ff0000]'
                }`}
                onClick={() => {
                  setSelectedEpic(conflict);
                  setEpicAnimState('idle');
                }}
              >
                <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{conflict.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#d4d4d4]">
                        {conflict.name}
                      </h3>
                      <p className="text-xs text-[#858585]">史诗级冲突</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded font-bold ${getLevelColor(conflict.level)}`}>
                    {conflict.level} 级
                  </span>
                </div>

                <div className="p-4 flex-1">
                  <p className="text-sm text-[#858585] mb-3 line-clamp-2">
                    {conflict.description}
                  </p>

                  {/* 动画预览 */}
                  <div className="bg-[#1e1e1e] rounded mb-3 overflow-hidden border border-[#3c3c3c]">
                    {SCRIPTS[conflict.id] ? (
                      <CatAnimation
                        script={SCRIPTS[conflict.id]}
                        width={160}
                        height={88}
                        className="w-full"
                      />
                    ) : (
                      <div className="h-[88px] flex items-center justify-center text-[#858585] text-xs">
                        {conflict.icon} 动画加载中...
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <div className="flex-1 bg-[#1e1e1e] rounded p-2 min-h-[40px]">
                      <div className="text-xs text-[#569cd6] mb-1">⚔️ 方A</div>
                      <div className="text-xs text-[#858585] truncate">
                        {getPreviewLine(conflict.codeA)}
                      </div>
                    </div>
                    <div className="flex-1 bg-[#1e1e1e] rounded p-2 min-h-[40px]">
                      <div className="text-xs text-[#f44747] mb-1">🛡️ 方B</div>
                      <div className="text-xs text-[#858585] truncate">
                        {getPreviewLine(conflict.codeB)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2 bg-[#2d2d2d] border-t border-[#3c3c3c]">
                  <p className="text-xs text-[#ff0000]">
                    点击查看详情 →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 冲突详情模态框 */}
      {selectedScenario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-6xl max-h-[90vh] bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{selectedScenario.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-[#d4d4d4]">
                    {selectedScenario.name}
                  </h2>
                  <p className="text-sm text-[#858585]">{selectedScenario.type}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded ${getTypeColor(selectedScenario.type)}`}>
                  {selectedScenario.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedScenario(null)}
                className="p-2 text-[#858585] hover:text-[#d4d4d4] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* 描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">冲突描述</h3>
                <p className="text-[#d4d4d4]">{selectedScenario.description}</p>
              </div>

              {/* 冲突双方代码 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#569cd6] mb-2">模块A代码</h3>
                  <CodeHighlight code={selectedScenario.codeA} language="python" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f44747] mb-2">模块B代码</h3>
                  <CodeHighlight code={selectedScenario.codeB} language="python" />
                </div>
              </div>

              {/* 冲突过程流程图 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">冲突过程</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  {selectedScenario.conflictProcess.map((step, index) => (
                    <div key={index} className="flex items-center mb-2 last:mb-0">
                      <div className="w-6 h-6 rounded-full bg-[#3c3c3c] flex items-center justify-center mr-3">
                        <span className="text-xs text-[#d4d4d4]">{index + 1}</span>
                      </div>
                      <span className={`text-sm ${
                        step.includes('冲突') ? 'text-[#f44747] font-bold' : 'text-[#d4d4d4]'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 宕机表现 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#f44747] mb-2">宕机表现</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#f44747]">
                  <p className="text-[#f44747]">{selectedScenario.crashBehavior}</p>
                </div>
              </div>

              {/* 动画演示区域 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">动画演示</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#3c3c3c]">
                  {/* 动画状态显示 */}
                  <div className="text-center mb-6">
                    {animationState === 'idle' && (
                      <div className="text-[#858585]">
                        <p>点击下方按钮，见证猫咪大脑宕机的全过程</p>
                        <p className="text-sm mt-2">温馨提示：后果自负，猫咪概不负责</p>
                      </div>
                    )}
                    
                    {animationState === 'running' && (
                      <div className="text-[#569cd6] animate-pulse">
                        <p className="text-lg font-bold">正在执行屎山代码...</p>
                        <p className="text-sm mt-2">模块A和模块B正在互相打架</p>
                      </div>
                    )}
                    
                    {animationState === 'conflict' && (
                      <div className="text-[#f44747]">
                        <p className="text-2xl font-bold animate-blink">💥 代码冲突！大脑宕机！</p>
                        <p className="text-sm mt-2">系统检测到不可调和的矛盾，猫咪已进入僵住模式</p>
                        <div className="mt-4 p-3 bg-[#f44747]/10 rounded border border-[#f44747]">
                          <p className="text-[#f44747]">FATAL ERROR: BrainNotFoundException</p>
                          <p className="text-[#858585] text-sm">两个模块同时执行，CPU 已被猫毛堵住</p>
                        </div>
                      </div>
                    )}
                    
                    {animationState === 'restarted' && (
                      <div className="text-[#6a9955]">
                        <p className="text-lg font-bold">系统已重启（大概）</p>
                        <p className="text-sm mt-2">猫咪恢复正常状态（假装什么都没发生）</p>
                        <div className="mt-4 p-3 bg-[#6a9955]/10 rounded border border-[#6a9955]">
                          <p className="text-[#6a9955]">System: Recovery successful (maybe)</p>
                          <p className="text-[#858585] text-sm">所有模块已重置，但 bug 依然存在</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 控制按钮 */}
                  <div className="flex justify-center space-x-4">
                    {animationState === 'idle' && (
                      <button
                        onClick={handleRunCode}
                        className="px-6 py-3 bg-[#569cd6] text-white rounded-lg hover:bg-[#569cd6]/80 transition-colors"
                      >
                        运行代码
                      </button>
                    )}
                    
                    {animationState === 'restarted' && (
                      <button
                        onClick={handleRestart}
                        className="px-6 py-3 bg-[#6a9955] text-white rounded-lg hover:bg-[#6a9955]/80 transition-colors"
                      >
                        重启系统
                      </button>
                    )}
                    
                    {(animationState === 'running' || animationState === 'conflict') && (
                      <div className="px-6 py-3 bg-[#3c3c3c] text-[#858585] rounded-lg cursor-not-allowed">
                        处理中...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 史诗级冲突详情模态框 */}
      {selectedEpic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-6xl max-h-[90vh] bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{selectedEpic.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-[#d4d4d4]">
                    {selectedEpic.name}
                  </h2>
                  <p className="text-sm text-[#858585]">史诗级冲突</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded font-bold ${getLevelColor(selectedEpic.level)}`}>
                  {selectedEpic.level} 级
                </span>
              </div>
              <button
                onClick={() => setSelectedEpic(null)}
                className="p-2 text-[#858585] hover:text-[#d4d4d4] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">冲突描述</h3>
                <p className="text-[#d4d4d4]">{selectedEpic.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#569cd6] mb-2">⚔️ 方A代码</h3>
                  <CodeHighlight code={selectedEpic.codeA} language="python" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f44747] mb-2">🛡️ 方B代码</h3>
                  <CodeHighlight code={selectedEpic.codeB} language="python" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">冲突过程</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  {selectedEpic.conflictProcess.map((step, index) => (
                    <div key={index} className="flex items-center mb-2 last:mb-0">
                      <div className="w-6 h-6 rounded-full bg-[#3c3c3c] flex items-center justify-center mr-3">
                        <span className="text-xs text-[#d4d4d4]">{index + 1}</span>
                      </div>
                      <span className={`text-sm ${
                        step.includes('冲突') || step.includes('警告') || step.includes('猫王') ? 'text-[#f44747] font-bold' : 'text-[#d4d4d4]'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#f44747] mb-2">宕机表现</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#f44747]">
                  <p className="text-[#f44747]">{selectedEpic.crashBehavior}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">动画演示</h3>
                <div className="bg-[#1e1e1e] rounded-lg p-6 border border-[#3c3c3c]">
                  <div className="text-center mb-6">
                    {epicAnimState === 'idle' && (
                      <div className="text-[#858585]">
                        <p>点击下方按钮，见证圆头耄耋的史诗级力量</p>
                        <p className="text-sm mt-2">温馨提示：此冲突等级过高，后果自负</p>
                      </div>
                    )}
                    {epicAnimState === 'running' && (
                      <div className="text-[#569cd6] animate-pulse">
                        <p className="text-lg font-bold">正在执行屎山代码...</p>
                        <p className="text-sm mt-2">圆头耄耋正在加载反骨模块</p>
                      </div>
                    )}
                    {epicAnimState === 'conflict' && (
                      <div className="text-[#f44747]">
                        <p className="text-2xl font-bold animate-blink">💥 史诗级冲突！万物宕机！</p>
                        <p className="text-sm mt-2">圆头耄耋的反骨代码已突破天际</p>
                        <div className="mt-4 p-3 bg-[#f44747]/10 rounded border border-[#f44747]">
                          <p className="text-[#f44747]">EPIC ERROR: YuanTouInvincibleException</p>
                          <p className="text-[#858585] text-sm">反骨模块已超频，CPU 被猫毛和怨念同时堵塞</p>
                        </div>
                      </div>
                    )}
                    {epicAnimState === 'restarted' && (
                      <div className="text-[#6a9955]">
                        <p className="text-lg font-bold">系统已重启（大概）</p>
                        <p className="text-sm mt-2">圆头耄耋已吃饱，暂时恢复和平（假的）</p>
                        <div className="mt-4 p-3 bg-[#6a9955]/10 rounded border border-[#6a9955]">
                          <p className="text-[#6a9955]">System: Recovery successful (maybe)</p>
                          <p className="text-[#858585] text-sm">圆头耄耋打了个嗝，表示下次还会再来</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-4">
                    {epicAnimState === 'idle' && (
                      <button
                        onClick={handleEpicRunCode}
                        className="px-6 py-3 bg-[#ff0000] text-white rounded-lg hover:bg-[#ff0000]/80 transition-colors font-bold"
                      >
                        🔥 运行代码
                      </button>
                    )}
                    {epicAnimState === 'restarted' && (
                      <button
                        onClick={handleEpicRestart}
                        className="px-6 py-3 bg-[#6a9955] text-white rounded-lg hover:bg-[#6a9955]/80 transition-colors"
                      >
                        重启系统
                      </button>
                    )}
                    {(epicAnimState === 'running' || epicAnimState === 'conflict') && (
                      <div className="px-6 py-3 bg-[#3c3c3c] text-[#858585] rounded-lg cursor-not-allowed">
                        处理中...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 抖动动画样式 */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}