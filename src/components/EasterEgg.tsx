import { useState, useEffect, useCallback, useRef } from 'react';

const CAT_EMOJIS = ['🐱', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐈', '🐾', '😺'];
const PAW_EMOJIS = ['🐾', '🐾', '🐾', '🐾', '🐾'];

function PawPrint({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <span
      className="fixed text-2xl pointer-events-none z-[9999] animate-paw-appear"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {PAW_EMOJIS[Math.floor(Math.random() * PAW_EMOJIS.length)]}
    </span>
  );
}

function HachimiEffect() {
  const [paws, setPaws] = useState<{ id: number; x: number; y: number }[]>([]);
  const [textCats, setTextCats] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPaws(prev => {
        const next = [...prev, {
          id: Date.now() + Math.random(),
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
        }];
        return next.length > 25 ? next.slice(-25) : next;
      });
    }, 150);

    setTimeout(() => setTextCats(true), 500);

    const timer = setTimeout(() => {
      setPaws([]);
      setTextCats(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const removePaw = useCallback((id: number) => {
    setPaws(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {paws.map(p => (
        <PawPrint key={p.id} x={p.x} y={p.y} onDone={() => removePaw(p.id)} />
      ))}

      {textCats && (
        <div className="fixed inset-0 z-[9997] flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🐱</div>
            <div className="text-2xl text-[#569cd6] font-bold animate-pulse">
              ハチミ～～～！🩷
            </div>
            <div className="text-sm text-[#858585] mt-2">
              哈基米哈基米哈基米～
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes paw-appear {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          20% { transform: scale(1.2) rotate(10deg); opacity: 1; }
          40% { transform: scale(1) rotate(-5deg); opacity: 1; }
          100% { transform: scale(0.8) rotate(0deg); opacity: 0; }
        }
        .animate-paw-appear {
          animation: paw-appear 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function FishWarning({ onClose }: { onClose: () => void }) {
  const [catPos, setCatPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatPos(prev => (prev + 2) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-[#252526] border border-[#f44747] rounded-lg p-6 max-w-sm w-full mx-4 shadow-2xl shadow-[#f44747]/30">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="text-lg font-bold text-[#f44747]">摸鱼检测器 v1.0</h3>
        </div>
        <div className="bg-[#1e1e1e] rounded p-4 mb-4 border border-[#3c3c3c]">
          <p className="text-[#d4d4d4] text-sm text-center">
            检测到你已经在这个页面摸鱼 <span className="text-[#f44747] font-bold">5 分钟</span>了！
          </p>
          <p className="text-[#858585] text-xs text-center mt-2">
            哈基米提醒你：该干活了！再不干活就没小鱼干吃了！
          </p>
        </div>
        <div className="relative h-12 bg-[#1e1e1e] rounded overflow-hidden mb-4 border border-[#3c3c3c]">
          <div
            className="absolute top-1/2 -translate-y-1/2 text-xl transition-all duration-30"
            style={{ left: `${catPos}%` }}
          >
            🐱
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-lg">
            🐟
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-[#569cd6] text-white rounded hover:bg-[#569cd6]/80 transition-colors text-sm font-mono"
        >
          {'>'} 我这就去干活！(git push --force)
        </button>
      </div>
    </div>
  );
}

function SecretCat({ onClick, clickCount }: { onClick: () => void; clickCount: number }) {
  return (
    <div
      className="fixed bottom-4 right-4 z-[9990] cursor-pointer select-none opacity-20 hover:opacity-60 transition-opacity duration-300"
      onClick={onClick}
      title={clickCount < 10 ? `🐱 (${10 - clickCount} 次)` : '🐱'}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6" style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="8" width="16" height="10" fill="#d4d4d4" />
        <rect x="6" y="4" width="12" height="6" fill="#d4d4d4" />
        <rect x="6" y="2" width="4" height="4" fill="#d4d4d4" />
        <rect x="14" y="2" width="4" height="4" fill="#d4d4d4" />
        <rect x="8" y="6" width="2" height="2" fill="#569cd6" />
        <rect x="14" y="6" width="2" height="2" fill="#569cd6" />
        <rect x="11" y="8" width="2" height="1" fill="#ce9178" />
        <rect x="10" y="9" width="4" height="1" fill="#1e1e1e" />
        <rect x="6" y="16" width="4" height="2" fill="#d4d4d4" />
        <rect x="14" y="16" width="4" height="2" fill="#d4d4d4" />
        <rect x="20" y="10" width="3" height="2" fill="#d4d4d4" />
      </svg>
      {clickCount > 0 && clickCount < 10 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#f44747] rounded-full flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">{clickCount}</span>
        </div>
      )}
    </div>
  );
}

function UltimateGlitch({ onEnd }: { onEnd: () => void }) {
  const [phase, setPhase] = useState<'glitch' | 'garbled' | 'recover'>('glitch');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('garbled'), 1000);
    const t2 = setTimeout(() => setPhase('recover'), 3000);
    const t3 = setTimeout(onEnd, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onEnd]);

  const garbledText = Array.from({ length: 50 }, () =>
    String.fromCharCode(0x4e00 + Math.floor(Math.random() * 0x9fff))
  ).join('');

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {phase === 'glitch' && (
        <div className="absolute inset-0 bg-[#1e1e1e] animate-glitch-flash">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f44747] animate-blink mb-4">
                ⚠ 终极代码冲突 ⚠
              </div>
              <div className="text-sm text-[#569cd6]">
                FATAL: CatOS kernel panic at 0x7fff_meow
              </div>
              <div className="text-xs text-[#858585] mt-2">
                猫咪的大脑已完全宕机，请稍后再试
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#f44747]/10 animate-glitch-overlay" />
        </div>
      )}

      {phase === 'garbled' && (
        <div className="absolute inset-0 bg-[#1e1e1e] overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs whitespace-nowrap animate-glitch-scroll"
              style={{
                top: `${(i * 3.5)}%`,
                left: `${Math.random() * 50}%`,
                color: ['#f44747', '#569cd6', '#6a9955', '#ce9178'][i % 4],
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {garbledText.slice(Math.floor(Math.random() * 30))}
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🐱💥</div>
          </div>
        </div>
      )}

      {phase === 'recover' && (
        <div className="absolute inset-0 bg-[#1e1e1e] flex items-center justify-center animate-fade-in">
          <div className="text-center">
            <div className="text-4xl mb-4">😺</div>
            <div className="text-lg text-[#6a9955] font-bold">
              系统已恢复（大概）
            </div>
            <div className="text-sm text-[#858585] mt-2">
              猫咪重新启动了它的屎山代码
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes glitch-flash {
          0%, 100% { background: #1e1e1e; }
          10% { background: #f44747; }
          20% { background: #1e1e1e; }
          30% { background: #569cd6; }
          40% { background: #1e1e1e; }
        }
        .animate-glitch-flash {
          animation: glitch-flash 0.3s linear infinite;
        }
        @keyframes glitch-overlay {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }
        .animate-glitch-overlay {
          animation: glitch-overlay 0.2s linear infinite;
        }
        @keyframes glitch-scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100vw); }
        }
        .animate-glitch-scroll {
          animation: glitch-scroll 2s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default function EasterEgg() {
  const [hachimiActive, setHachimiActive] = useState(false);
  const [fishWarning, setFishWarning] = useState(false);
  const [catClicks, setCatClicks] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const bufferRef = useRef('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      bufferRef.current += e.key.toLowerCase();
      if (bufferRef.current.length > 20) {
        bufferRef.current = bufferRef.current.slice(-20);
      }

      if (bufferRef.current.includes('hachimi')) {
        bufferRef.current = '';
        setHachimiActive(true);

        try {
          const audioCtx = new AudioContext();
          const playMeow = (freq: number, startTime: number, dur: number) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
            osc.frequency.linearRampToValueAtTime(freq * 1.5, audioCtx.currentTime + startTime + dur * 0.3);
            osc.frequency.linearRampToValueAtTime(freq * 0.8, audioCtx.currentTime + startTime + dur);
            gain.gain.setValueAtTime(0, audioCtx.currentTime + startTime);
            gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + startTime + 0.05);
            gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + startTime + dur);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + startTime);
            osc.stop(audioCtx.currentTime + startTime + dur);
          };

          const notes = [523, 659, 784, 659, 523, 659, 784, 659, 523, 659, 784, 988, 784];
          notes.forEach((freq, i) => {
            playMeow(freq, i * 0.25, 0.2);
          });
          setTimeout(() => {
            notes.forEach((freq, i) => {
              playMeow(freq * 1.2, i * 0.2, 0.18);
            });
          }, notes.length * 250);
        } catch {}

        setTimeout(() => setHachimiActive(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setFishWarning(true);
    }, 5 * 60 * 1000);

    return () => clearTimeout(idleTimer);
  }, []);

  const handleCatClick = () => {
    const next = catClicks + 1;
    setCatClicks(next);
    if (next >= 10) {
      setGlitchActive(true);
      setCatClicks(0);
    }
  };

  return (
    <>
      {hachimiActive && <HachimiEffect />}
      {fishWarning && <FishWarning onClose={() => setFishWarning(false)} />}
      <SecretCat onClick={handleCatClick} clickCount={catClicks} />
      {glitchActive && <UltimateGlitch onEnd={() => setGlitchActive(false)} />}
    </>
  );
}
