import { useState, useRef, useCallback } from 'react';
import { DiagnosticResult } from '../data/diagnosticResults';

const API_BASE = 'https://api.siliconflow.cn/v1';
const MODEL = 'MiMo-VL-7B-RL';

export default function DiagnosticPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DiagnosticResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('mimo_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
        setAnalysisResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const parseAnalysisResult = (text: string): DiagnosticResult => {
    const similarityMatch = text.match(/相似度[：:]\s*(\d+)/);
    const hissMatch = text.match(/哈气概率[：:]\s*(\d+)/);
    const attackMatch = text.match(/攻击倾向[：:]\s*(低|中|高|极高)/);
    const codeMatch = text.match(/代码分析[：:]\s*([\s\S]*?)(?=驯服建议|$)/);
    const adviceMatch = text.match(/驯服建议[：:]\s*([\s\S]*?)$/);

    const getStars = (text: string): string => {
      const starMatch = text.match(/[★☆]+/);
      return starMatch ? starMatch[0] : '★★★☆☆';
    };

    return {
      similarity: similarityMatch ? parseInt(similarityMatch[1]) : Math.floor(Math.random() * 30) + 70,
      rebellionIndex: getStars(text),
      hissProbability: hissMatch ? parseInt(hissMatch[1]) : Math.floor(Math.random() * 50) + 50,
      attackTendency: attackMatch ? attackMatch[1] : '中',
      tamingDifficulty: getStars(text),
      codeAnalysis: codeMatch ? codeMatch[1].trim() : '检测到反骨代码已激活，喵星人控制系统处于待命状态。',
      tamingAdvice: adviceMatch ? adviceMatch[1].trim() : '建议直接投降并奉上最好的猫粮。',
    };
  };

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage) return;

    if (!apiKey) {
      setShowApiKeyInput(true);
      setError('请输入 API Key 以使用 AI 分析功能');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    localStorage.setItem('mimo_api_key', apiKey);

    try {
      const response = await fetch(`${API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: `你是一个搞笑的猫咪反骨指数分析专家。用户会上传猫咪图片，你需要分析猫咪的表情和姿态，生成一份幽默的"圆头耄耋反骨指数检测报告"。

请按以下格式输出：
圆头耄耋相似度：XX%
反骨指数：★★★★★（1-5星）
哈气概率：XX%
攻击倾向：低/中/高/极高
驯服难度：★★★★★（1-5星）
代码分析：（用程序员风格描述猫咪正在执行的"代码"，如"检测到强闯民宅代码已激活"）
驯服建议：（搞笑的建议，如"不要试图驯服它，建议直接投降"）

注意：输出要幽默搞笑，用程序员的梗，分析要基于猫咪的实际表情和姿态。`,
            },
            {
              role: 'user',
              content: [
                { type: 'image_url', image_url: { url: selectedImage } },
                { type: 'text', text: '请分析这只猫咪的反骨指数，生成一份搞笑的诊断报告。' },
              ],
            },
          ],
          max_tokens: 1024,
          temperature: 0.8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const result = parseAnalysisResult(content);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage, apiKey]);

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleShare = async () => {
    if (!resultRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 600;
      canvas.height = 800;
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#569cd6';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🐱 圆头耄耋反骨指数检测报告', canvas.width / 2, 50);

      ctx.fillStyle = '#6a9955';
      ctx.font = '16px monospace';
      ctx.fillText('// Generated by Hajimi Museum', canvas.width / 2, 80);

      if (analysisResult) {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ce9178';
        ctx.font = '20px monospace';
        ctx.fillText(`圆头耄耋相似度: ${analysisResult.similarity}%`, 40, 130);

        ctx.fillStyle = '#d4d4d4';
        ctx.fillText(`反骨指数: ${analysisResult.rebellionIndex}`, 40, 170);
        ctx.fillText(`哈气概率: ${analysisResult.hissProbability}%`, 40, 210);
        ctx.fillText(`攻击倾向: ${analysisResult.attackTendency}`, 40, 250);
        ctx.fillText(`驯服难度: ${analysisResult.tamingDifficulty}`, 40, 290);

        ctx.fillStyle = '#569cd6';
        ctx.font = '16px monospace';
        ctx.fillText('代码分析:', 40, 340);
        ctx.fillStyle = '#d4d4d4';
        const codeLines = analysisResult.codeAnalysis.split(/[，,]/);
        codeLines.forEach((line, i) => {
          ctx.fillText(`  ${line.trim()}`, 40, 370 + i * 25);
        });

        ctx.fillStyle = '#f44747';
        ctx.font = '16px monospace';
        ctx.fillText('驯服建议:', 40, 370 + codeLines.length * 25 + 30);
        ctx.fillStyle = '#d4d4d4';
        const adviceLines = analysisResult.tamingAdvice.split(/[，,]/);
        adviceLines.forEach((line, i) => {
          ctx.fillText(`  ${line.trim()}`, 40, 370 + codeLines.length * 25 + 60 + i * 25);
        });
      }

      ctx.fillStyle = '#858585';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('hajimi-museum.pages.dev', canvas.width / 2, canvas.height - 30);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = '反骨指数检测报告.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (err) {
      console.error('生成分享图片失败:', err);
    }
  };

  const getStarCount = (stars: string): number => {
    return (stars.match(/★/g) || []).length;
  };

  const getAttackColor = (tendency: string): string => {
    switch (tendency) {
      case '低': return '#6a9955';
      case '中': return '#d7ba7d';
      case '高': return '#f44747';
      case '极高': return '#ff0000';
      default: return '#d4d4d4';
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#ce9178]">圆头耄耋</span>
              <span className="text-[#d4d4d4]">反骨指数检测</span>
            </h1>
            <p className="text-[#6a9955] text-lg">
              // 上传猫咪照片，AI 帮你诊断它的反骨程度
            </p>
            <p className="text-[#858585] text-sm mt-2">
              基于 MiMo 多模态 AI 分析猫咪表情，生成专业的反骨指数报告
            </p>
          </div>

          <div className="bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#f44747]" />
                <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
              </div>
              <div className="ml-4 text-xs text-[#858585]">
                cat-rebellion-detector.exe
              </div>
            </div>

            <div className="p-6">
              {showApiKeyInput && (
                <div className="mb-6 p-4 bg-[#1e1e1e] rounded-lg border border-[#3c3c3c]">
                  <label className="block text-sm text-[#569cd6] mb-2">
                    // API Key (从 <a href="https://cloud.siliconflow.cn" target="_blank" rel="noopener noreferrer" className="underline">SiliconFlow</a> 获取)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="flex-1 px-4 py-2 bg-[#252526] border border-[#3c3c3c] rounded-lg text-[#d4d4d4] placeholder-[#858585] focus:outline-none focus:border-[#569cd6]"
                    />
                    <button
                      onClick={() => {
                        localStorage.setItem('mimo_api_key', apiKey);
                        setShowApiKeyInput(false);
                        setError(null);
                      }}
                      className="px-4 py-2 bg-[#569cd6] text-white rounded-lg hover:bg-[#569cd6]/80 transition-colors"
                    >
                      保存
                    </button>
                  </div>
                </div>
              )}

              <div
                className="border-2 border-dashed border-[#3c3c3c] rounded-lg p-8 text-center cursor-pointer hover:border-[#569cd6] transition-colors mb-6"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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
                    <p className="text-xs text-[#6a9955]">// 支持 JPG、PNG，越凶越好分析</p>
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

              {error && (
                <div className="mb-4 p-3 bg-[#f44747]/10 border border-[#f44747]/30 rounded-lg text-[#f44747] text-sm">
                  // Error: {error}
                </div>
              )}

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
                    <span>正在分析哈基米反骨代码...</span>
                  </div>
                ) : (
                  <span>{'>'} 开始检测 (./detect.sh)</span>
                )}
              </button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mt-8 bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#f44747]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                  <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
                </div>
                <div className="ml-4 text-xs text-[#858585]">
                  analysis-loading.log
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-[#6a9955]">
                    <span className="animate-pulse">{'>'}</span>
                    <span>正在扫描猫咪表情特征...</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#569cd6]">
                    <span className="animate-pulse">{'>'}</span>
                    <span>正在分析圆头耄耋相似度...</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#ce9178]">
                    <span className="animate-pulse">{'>'}</span>
                    <span>正在计算反骨指数...</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#d7ba7d]">
                    <span className="animate-pulse">{'>'}</span>
                    <span>正在生成驯服建议...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {analysisResult && (
            <div ref={resultRef} className="mt-8 bg-[#252526] rounded-lg border border-[#3c3c3c] overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#f44747]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                  <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
                </div>
                <div className="ml-4 text-xs text-[#858585]">
                  rebellion-report.log
                </div>
              </div>

              <div className="p-6">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">😾</div>
                  <h2 className="text-3xl font-bold text-[#569cd6] mb-2">
                    诊断结果
                  </h2>
                  <p className="text-[#6a9955] text-lg">
                    圆头耄耋相似度 {analysisResult.similarity}%
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                    <div className="text-sm text-[#858585] mb-2">反骨指数</div>
                    <div className="text-2xl text-[#f44747]">
                      {analysisResult.rebellionIndex}
                    </div>
                    <div className="mt-2 text-xs text-[#858585]">
                      {'#'.repeat(getStarCount(analysisResult.rebellionIndex))}
                      {'-'.repeat(5 - getStarCount(analysisResult.rebellionIndex))}
                    </div>
                  </div>

                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                    <div className="text-sm text-[#858585] mb-2">哈气概率</div>
                    <div className="text-2xl text-[#d7ba7d]">
                      {analysisResult.hissProbability}%
                    </div>
                    <div className="mt-2 h-2 bg-[#3c3c3c] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#d7ba7d] rounded-full transition-all duration-1000"
                        style={{ width: `${analysisResult.hissProbability}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                    <div className="text-sm text-[#858585] mb-2">攻击倾向</div>
                    <div className="text-2xl" style={{ color: getAttackColor(analysisResult.attackTendency) }}>
                      {analysisResult.attackTendency}
                    </div>
                    <div className="mt-2 text-xs text-[#858585]">
                      危险等级: {analysisResult.attackTendency === '极高' ? '🔴🔴🔴' : 
                                 analysisResult.attackTendency === '高' ? '🔴🔴' : 
                                 analysisResult.attackTendency === '中' ? '🟡' : '🟢'}
                    </div>
                  </div>

                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                    <div className="text-sm text-[#858585] mb-2">驯服难度</div>
                    <div className="text-2xl text-[#569cd6]">
                      {analysisResult.tamingDifficulty}
                    </div>
                    <div className="mt-2 text-xs text-[#858585]">
                      {'#'.repeat(getStarCount(analysisResult.tamingDifficulty))}
                      {'-'.repeat(5 - getStarCount(analysisResult.tamingDifficulty))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#569cd6] mb-3">
                    // 代码分析
                  </h3>
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                    <p className="text-[#d4d4d4] leading-relaxed">
                      {analysisResult.codeAnalysis}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#f44747] mb-3">
                    // 驯服建议
                  </h3>
                  <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#f44747]/30">
                    <p className="text-[#d4d4d4] leading-relaxed">
                      {analysisResult.tamingAdvice}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleShare}
                    className="flex-1 px-6 py-3 bg-[#6a9955] text-white rounded-lg hover:bg-[#6a9955]/80 transition-colors"
                  >
                    📥 保存报告图片
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-6 py-3 bg-[#569cd6] text-white rounded-lg hover:bg-[#569cd6]/80 transition-colors"
                  >
                    🔄 重新检测
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 bg-[#252526] rounded-lg border border-[#3c3c3c] p-6">
            <h3 className="text-lg font-semibold text-[#569cd6] mb-4">// 使用说明（如果你敢的话）</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📸</div>
                <h4 className="text-sm font-semibold text-[#d4d4d4] mb-2">第一步：上传照片</h4>
                <p className="text-xs text-[#858585]">拍一张猫咪的照片，越凶越准</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔍</div>
                <h4 className="text-sm font-semibold text-[#d4d4d4] mb-2">第二步：AI 分析</h4>
                <p className="text-xs text-[#858585]">MiMo 多模态 AI 分析反骨程度</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <h4 className="text-sm font-semibold text-[#d4d4d4] mb-2">第三步：查看报告</h4>
                <p className="text-xs text-[#858585]">获取专业的反骨指数报告</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
