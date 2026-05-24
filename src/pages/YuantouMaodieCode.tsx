import { useState } from 'react';
import CodeHighlight from '../components/CodeHighlight';
import CatAnimation from '../components/CatAnimation';
import { SCRIPTS } from '../animation/scripts';
import { yuantouCodeData, YuantouCode } from '../data/yuantoumaodieCode';

export default function YuantouMaodieCode() {
  const [selectedCode, setSelectedCode] = useState<YuantouCode | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-[#f44747] text-white';
      case 'MEDIUM':
        return 'bg-[#ffcc00] text-[#1e1e1e]';
      case 'LOW':
        return 'bg-[#6a9955] text-white';
      default:
        return 'bg-[#858585] text-white';
    }
  };

  const getPidColor = (pid: number) => {
    if (pid <= 1) return 'text-[#f44747]';
    if (pid <= 3) return 'text-[#ffcc00]';
    return 'text-[#6a9955]';
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      {/* 页面标题 */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#ce9178]">圆头耄耋</span>
              <span className="text-[#569cd6]">专属代码库</span>
            </h1>
            <p className="text-[#6a9955] text-lg">
              // 猫界反骨代码天花板，运行了千万年的野生屎山代码
            </p>
            <p className="text-[#858585] text-sm mt-2">
              这些代码从未被人类驯服，每一行都写满了反骨和倔强
            </p>
          </div>

          {/* 代码卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yuantouCodeData.map((code) => (
              <div
                key={code.id}
                className="bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden hover:border-[#ce9178] transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedCode(code)}
              >
                {/* 卡片头部 */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{code.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-[#d4d4d4]">
                          {code.name}
                        </h3>
                        <span className={`text-xs font-mono ${getPidColor(code.pid)}`}>
                          PID={code.pid}
                        </span>
                      </div>
                      <p className="text-xs text-[#858585]">{code.id}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded ${getPriorityColor(
                      code.priority
                    )}`}
                  >
                    {code.priority}
                  </span>
                </div>

                {/* 卡片内容 */}
                <div className="p-4">
                  <p className="text-sm text-[#858585] mb-3 line-clamp-2">
                    {code.description}
                  </p>

                  {/* 动画预览 */}
                  <div className="bg-[#1e1e1e] rounded mb-3 overflow-hidden border border-[#3c3c3c]">
                    {SCRIPTS[code.id] ? (
                      <CatAnimation
                        script={SCRIPTS[code.id]}
                        width={160}
                        height={88}
                        className="w-full"
                      />
                    ) : (
                      <div className="h-[88px] flex items-center justify-center text-[#858585] text-xs">
                        {code.icon} 动画加载中...
                      </div>
                    )}
                  </div>

                  {/* 触发条件 */}
                  <div className="mb-3">
                    <div className="text-xs text-[#569cd6] mb-1">触发条件:</div>
                    <div className="text-xs text-[#858585]">{code.trigger}</div>
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2">
                    {code.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-[#3c3c3c] text-[#858585] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 悬停效果 */}
                <div className="px-4 py-2 bg-[#2d2d2d] border-t border-[#3c3c3c] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-[#ce9178]">
                    点击查看完整代码 →
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 代码详情模态框 */}
      {selectedCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="w-full max-w-4xl max-h-[90vh] bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
            {/* 模态框头部 */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{selectedCode.icon}</span>
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold text-[#d4d4d4]">
                      {selectedCode.name}
                    </h2>
                    <span className={`text-sm font-mono ${getPidColor(selectedCode.pid)}`}>
                      PID={selectedCode.pid}
                    </span>
                  </div>
                  <p className="text-sm text-[#858585]">
                    {selectedCode.id}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded ${getPriorityColor(
                    selectedCode.priority
                  )}`}
                >
                  {selectedCode.priority}
                </span>
              </div>
              <button
                onClick={() => setSelectedCode(null)}
                className="p-2 text-[#858585] hover:text-[#d4d4d4] transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 模态框内容 */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* 描述 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  功能描述
                </h3>
                <p className="text-[#d4d4d4]">{selectedCode.description}</p>
              </div>

              {/* 代码 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  源代码
                </h3>
                <CodeHighlight
                  code={selectedCode.code}
                  language="python"
                  showLineNumbers={true}
                />
              </div>

              {/* 触发条件 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  触发条件
                </h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <p className="text-[#ce9178] font-mono">
                    {selectedCode.trigger}
                  </p>
                </div>
              </div>

              {/* 执行逻辑 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  执行逻辑
                </h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <p className="text-[#6a9955] font-mono">
                    {selectedCode.logic}
                  </p>
                </div>
              </div>

              {/* 典型表现 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  典型表现
                </h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <p className="text-[#d4d4d4]">
                    {selectedCode.behavior}
                  </p>
                </div>
              </div>

              {/* 运行结果 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  运行结果
                </h3>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <p className="text-[#6a9955] font-mono">
                    {'>'} {selectedCode.output}
                  </p>
                </div>
              </div>

              {/* 标签 */}
              <div>
                <h3 className="text-lg font-semibold text-[#569cd6] mb-2">
                  标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCode.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-[#3c3c3c] text-[#858585] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
