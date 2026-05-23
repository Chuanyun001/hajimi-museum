import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import PixelCat from '../components/PixelCat';
import TerminalButton from '../components/TerminalButton';

const CODE_CHARS = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'cat.meow()', 'cat.sleep()', 'cat.hunt()', 'cat.purr()',
  '{}', '[]', '()', '=>', '===', '!==', '&&', '||',
  'async', 'await', 'new', 'class', 'import', 'export',
  'null', 'undefined', 'true', 'false',
  'meow.wav', 'hunt.exe', 'sleep.dll', 'purrr.js',
  'cat.nap()', 'cat.zoomies()', 'cat.knock()',
];

function FloatingChar({ char, style }: { char: string; style: React.CSSProperties }) {
  return (
    <span
      className="absolute text-[#6a9955]/20 text-xs font-mono whitespace-nowrap pointer-events-none select-none floating-char"
      style={style}
    >
      {char}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [floatingChars, setFloatingChars] = useState<
    { id: number; char: string; style: React.CSSProperties }[]
  >([]);

  const spawnChar = useCallback(() => {
    const id = Date.now() + Math.random();
    const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 2;
    const size = 10 + Math.random() * 6;

    setFloatingChars((prev) => {
      const next = [...prev, { id, char, style: {
        left: `${left}%`,
        bottom: '-20px',
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity: 0.15 + Math.random() * 0.25,
      }}];
      return next.length > 30 ? next.slice(-30) : next;
    });

    setTimeout(() => {
      setFloatingChars((prev) => prev.filter((c) => c.id !== id));
    }, (duration + delay) * 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnChar, 800);
    return () => clearInterval(interval);
  }, [spawnChar]);

  const handleStart = () => {
    navigate('/core-code');
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-transparent to-[#1e1e1e] z-10" />
        <div className="code-rain opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-[#6a9955] text-xs whitespace-nowrap"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {`const cat${i} = new Cat();`}
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
        {floatingChars.map((item) => (
          <FloatingChar key={item.id} char={item.char} style={item.style} />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl bg-[#252526] rounded-lg border border-[#3c3c3c] shadow-2xl overflow-hidden">
          <div className="flex items-center px-4 py-2 bg-[#3c3c3c] border-b border-[#3c3c3c]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#f44747]" />
              <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
              <div className="w-3 h-3 rounded-full bg-[#6a9955]" />
            </div>
            <div className="ml-4 text-xs text-[#858585]">
              cat@hajimi-museum:~/home
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8 text-sm">
              <div className="text-[#6a9955]">// 正在加载猫の灵魂...</div>
              <div className="text-[#569cd6]">Loading cat.exe... (99% 假装在加载)</div>
              <div className="text-[#ce9178]">Initializing feline neural network... (单核跑满)</div>
              <div className="text-[#d4d4d4]">Cat system ready. (才怪)</div>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-[#569cd6]">哈基米</span>
                <span className="text-[#d4d4d4]">屎山代码博物馆</span>
              </h1>
              <p className="text-[#6a9955] text-lg">
                // 用程序员的视角，解码猫の迷惑行为
              </p>
              <p className="text-[#858585] text-sm mt-2">
                猫咪 = 运行着千万年屎山代码的单核处理器生物，内存泄漏严重，经常大脑宕机
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="relative">
                <PixelCat className="w-32 h-32 md:w-48 md:h-48" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#858585]">
                  cat.exe - 运行中
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <TerminalButton onClick={handleStart}>
                {'>'} 启动程序 (./start.sh)
              </TerminalButton>
            </div>

            <div className="mt-12 text-xs text-[#858585]">
              <div>System: CatOS v∞.0.0 (屎山版本，从不更新)</div>
              <div>Memory: 999MB / 1024MB (内存泄漏中...)</div>
              <div>CPU: 单核处理器 (专注摸鱼模式)</div>
              <div>Status: 正在运行 hunt.exe, sleep.dll, meow.wav, knock_over_cup.sh</div>
              <div className="text-[#f44747] mt-1">⚠ 警告: 检测到 {Math.floor(Math.random() * 9999)} 个未修复的 bug</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#858585]">
          <p>按任意键继续... 或者假装没看到这个按钮</p>
          <p className="mt-2 text-xs">
            // 这是一个展示猫咪底层屎山代码的博物馆，建议使用猫脑浏览器访问
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
