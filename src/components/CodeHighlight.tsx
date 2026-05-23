import { useState, useEffect } from 'react';

interface CodeHighlightProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeHighlight({
  code,
  language = 'python',
  showLineNumbers = true,
  className = '',
}: CodeHighlightProps) {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // 语法高亮
    const highlight = (text: string) => {
      let result = text;
      
      // Python关键字高亮
      const pythonKeywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None'];
      
      pythonKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        result = result.replace(regex, `<span class="text-[#569cd6]">${keyword}</span>`);
      });
      
      // JavaScript关键字高亮（备用）
      const jsKeywords = ['function', 'const', 'let', 'var', 'class', 'new', 'this', 'throw', 'try', 'catch', 'async', 'await', 'import', 'export', 'default', 'from'];
      jsKeywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        result = result.replace(regex, `<span class="text-[#569cd6]">${keyword}</span>`);
      });
      
      // 字符串高亮
      result = result.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-[#ce9178]">$&</span>');
      
      // Python注释高亮
      result = result.replace(/#.*$/gm, '<span class="text-[#6a9955]">$&</span>');
      
      // JavaScript注释高亮
      result = result.replace(/\/\/.*$/gm, '<span class="text-[#6a9955]">$&</span>');
      result = result.replace(/\/\*[\s\S]*?\*\//g, '<span class="text-[#6a9955]">$&</span>');
      
      // 数字高亮
      result = result.replace(/\b\d+\.?\d*\b/g, '<span class="text-[#b5cea8]">$&</span>');
      
      // 函数名高亮
      result = result.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="text-[#dcdcaa]">$1</span>(');
      
      // Python内置函数高亮
      const builtins = ['print', 'len', 'range', 'type', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'bool', 'input', 'open', 'file', 'abs', 'all', 'any', 'bin', 'chr', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'filter', 'format', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'isinstance', 'issubclass', 'iter', 'locals', 'map', 'max', 'min', 'next', 'oct', 'ord', 'pow', 'property', 'repr', 'reversed', 'round', 'setattr', 'slice', 'sorted', 'staticmethod', 'sum', 'super', 'vars', 'zip'];
      builtins.forEach(builtin => {
        const regex = new RegExp(`\\b${builtin}\\b`, 'g');
        result = result.replace(regex, `<span class="text-[#dcdcaa]">${builtin}</span>`);
      });
      
      return result;
    };

    setHighlightedCode(highlight(code));
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className={`bg-[#1e1e1e] rounded-lg border border-[#3c3c3c] overflow-hidden ${className}`}>
      {/* 代码头部 */}
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#3c3c3c]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#f44747]" />
          <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
          <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
        </div>
        <div className="ml-4 text-xs text-[#858585]">
          {language}
        </div>
      </div>
      
      {/* 代码内容 */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            {showLineNumbers && (
              <div className="flex">
                <div className="pr-4 text-right text-[#858585] select-none">
                  {lines.map((_, index) => (
                    <div key={index} className="leading-relaxed">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, index) => (
                    <div
                      key={index}
                      className="leading-relaxed hover:bg-[#264f78]/30 transition-colors duration-150"
                      dangerouslySetInnerHTML={{
                        __html: highlightedCode.split('\n')[index] || '',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {!showLineNumbers && (
              <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}