import { useState, useRef } from 'react';
import { diagnosticResultsData, DiagnosticResult } from '../data/diagnosticResults';

export default function DiagnosticPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DiagnosticResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // 模拟分析过程
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * diagnosticResultsData.length);
      setAnalysisResult(diagnosticResultsData[randomIndex]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewDiagnosis = () => {
    setAnalysisResult(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      {/* 页面标题 */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#ce9178]">屎山代码</span>
              <span className="text-[#d4d4d4]">诊断器</span>
            </h1>
            <p className="text-[#6a9955] text-lg">
              // 上传猫咪照片，AI 帮你诊断它正在执行哪段 bug
            </p>
            <p className="text-[#858585] text-sm mt-2">
              通过反向工程分析猫咪当前运行的屎山代码，附赠一份永远不会执行的修复建议
            </p>
          </div>

          {/* 上传和分析区域 */}
          <div className="bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#f44747]" />
                <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
              </div>
              <div className="ml-4 text-xs text-[#858585]">
                cat-diagnostic.exe
              </div>
            </div>

            <div className="p-6">
              {/* 上传区域 */}
              <div
                className="border-2 border-dashed border-[#3c3c3c] rounded-lg p-8 text-center cursor-pointer hover:border-[#569cd6] transition-colors mb-6"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="上传的猫咪"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className="absolute top-2 right-2 p-1 bg-[#f44747] text-white rounded-full hover:bg-[#f44747]/80 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-4">🐱</div>
                    <p className="text-[#858585] mb-2">点击或拖拽上传猫咪照片</p>
                    <p className="text-xs text-[#6a9955]">// 支持 JPG、PNG、GIF，不支持猫毛模糊照</p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* 分析按钮 */}
              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                className={`w-full px-6 py-3 rounded-lg font-mono text-sm transition-all duration-200 ${
                  selectedImage && !isAnalyzing
                    ? 'bg-[#569cd6] text-white hover:bg-[#569cd6]/80'
                    : 'bg-[#3c3c3c] text-[#858585] cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>正在分析哈基米代码...</span>
                  </div>
                ) : (
                  <span>{'>'} 开始诊断 (./diagnose.sh)</span>
                )}
              </button>
            </div>
          </div>

          {/* 分析结果 */}
          {analysisResult && (
            <div className="mt-8 bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#f44747]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                  <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
                </div>
                <div className="ml-4 text-xs text-[#858585]">
                  diagnostic-result.log
                </div>
              </div>

              <div className="p-6">
                {/* 诊断结果标题 */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{analysisResult.icon}</div>
                  <h2 className="text-2xl font-bold text-[#569cd6] mb-2">诊断结果</h2>
                  <p className="text-[#858585]">触发了【{analysisResult.codeName}】(PID={analysisResult.pid})</p>
                </div>

                {/* 代码优先级 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#ce9178] mb-2">代码优先级</h3>
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                    <div className="text-2xl text-center">{analysisResult.priority}</div>
                  </div>
                </div>

                {/* 冲突分析 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#f44747] mb-2">冲突分析</h3>
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#f44747]">
                    <p className="text-[#d4d4d4]">{analysisResult.conflictAnalysis}</p>
                  </div>
                </div>

                {/* 修复建议 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#6a9955] mb-2">修复建议</h3>
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#6a9955]">
                    <p className="text-[#d4d4d4]">{analysisResult.repairSuggestion}</p>
                  </div>
                </div>

                {/* 重新诊断按钮 */}
                <div className="text-center">
                  <button
                    onClick={handleNewDiagnosis}
                    className="px-6 py-3 bg-[#6a9955] text-white rounded-lg hover:bg-[#6a9955]/80 transition-colors"
                  >
                    重新上传图片诊断
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 使用说明 */}
          <div className="mt-8 bg-[#252526] rounded-lg border border-[#3c3c3c] p-6">
            <h3 className="text-lg font-semibold text-[#569cd6] mb-4">// 使用说明（如果你需要的话）</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📸</div>
                <h4 className="text-sm font-semibold text-[#d4d4d4] mb-2">第一步：上传照片</h4>
                <p className="text-xs text-[#858585]">拍一张猫咪的照片，越迷惑越好诊断</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔍</div>
                <h4 className="text-sm font-semibold text-[#d4d4d4] mb-2">第二步：开始分析</h4>
                <p className="text-xs text-[#858585]">点击按钮，AI 将逆向工程猫咪的屎山代码</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="text-sm font-semibold text-[#d4d4d4] mb-2">第三步：查看结果</h4>
                <p className="text-xs text-[#858585]">查看触发的 bug 和永远不会被执行的修复建议</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}