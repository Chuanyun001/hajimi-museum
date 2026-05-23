import { useState, useEffect } from 'react';
import CodeHighlight from '../components/CodeHighlight';
import { conflictScenariosData, ConflictScenario } from '../data/conflictScenarios';

export default function ConflictLabPage() {
  const [selectedScenario, setSelectedScenario] = useState<ConflictScenario | null>(null);
  const [animationState, setAnimationState] = useState<'idle' | 'running' | 'conflict' | 'restarted'>('idle');
  const [isShaking, setIsShaking] = useState(false);

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
    <div className={`min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono ${isShaking ? 'animate-shake' : ''}`}>
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
                className={`bg-[#252526] rounded-lg border overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedScenario?.id === scenario.id
                    ? 'border-[#f44747] shadow-lg shadow-[#f44747]/20'
                    : 'border-[#3c3c3c] hover:border-[#f44747]'
                }`}
                onClick={() => {
                  setSelectedScenario(scenario);
                  setAnimationState('idle');
                }}
              >
                {/* 卡片头部 */}
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

                {/* 卡片内容 */}
                <div className="p-4">
                  <p className="text-sm text-[#858585] mb-4 line-clamp-2">
                    {scenario.description}
                  </p>

                  {/* 冲突双方预览 */}
                  <div className="flex space-x-2 mb-4">
                    <div className="flex-1 bg-[#1e1e1e] rounded p-2">
                      <div className="text-xs text-[#569cd6] mb-1">模块A</div>
                      <div className="text-xs text-[#858585] line-clamp-2">
                        {scenario.codeA.split('\n')[1]}
                      </div>
                    </div>
                    <div className="flex-1 bg-[#1e1e1e] rounded p-2">
                      <div className="text-xs text-[#f44747] mb-1">模块B</div>
                      <div className="text-xs text-[#858585] line-clamp-2">
                        {scenario.codeB.split('\n')[1]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部提示 */}
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