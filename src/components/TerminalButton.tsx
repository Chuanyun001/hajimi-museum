import { useState } from 'react';

interface TerminalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function TerminalButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
}: TerminalButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const text = typeof children === 'string' ? children : '';

  const baseClasses = 'relative px-6 py-3 font-mono text-sm border transition-all duration-200 cursor-pointer select-none overflow-hidden';

  const variantClasses = {
    primary: 'border-[#569cd6] text-[#569cd6] hover:bg-[#569cd6]/10 active:bg-[#569cd6]/20',
    secondary: 'border-[#6a9955] text-[#6a9955] hover:bg-[#6a9955]/10 active:bg-[#6a9955]/20',
  };

  const handleClick = () => {
    if (isTyping) return;

    setIsTyping(true);
    setDisplayText('');
    let i = 0;

    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsTyping(false);
          onClick?.();
        }, 400);
      }
    }, 50);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        isPressed ? 'scale-95' : 'scale-100'
      }`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <span className="relative z-10 inline-flex items-center">
        {isTyping ? (
          <>
            <span>{displayText}</span>
            <span className="terminal-cursor" />
          </>
        ) : (
          children
        )}
      </span>

      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-current animate-blink" />

      <div className="absolute inset-0 border border-current opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {isTyping && (
        <div className="absolute inset-0 bg-[#569cd6]/5 pointer-events-none" />
      )}
    </button>
  );
}
