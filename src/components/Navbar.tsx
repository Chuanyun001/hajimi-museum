import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/core-code', label: '核心代码', icon: '💻' },
    { path: '/conflict-lab', label: '冲突实验室', icon: '⚠️' },
    { path: '/diagnostic', label: '诊断器', icon: '🔍' },
    { path: '/about', label: '关于', icon: '📖' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#252526]/95 backdrop-blur-md border-b border-[#3c3c3c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#569cd6] to-[#6a9955] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐱</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f44747] rounded-full animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#d4d4d4] font-mono">
                <span className="text-[#569cd6]">哈基米</span>
                <span className="text-[#d4d4d4]">屎山代码博物馆</span>
              </h1>
              <p className="text-xs text-[#858585] -mt-1">Shitcode Museum</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-[#569cd6]/10 text-[#569cd6] border border-[#569cd6]/30'
                    : 'text-[#858585] hover:text-[#d4d4d4] hover:bg-[#3c3c3c]'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#858585] hover:text-[#d4d4d4] hover:bg-[#3c3c3c] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#252526] border-t border-[#3c3c3c]">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-[#569cd6]/10 text-[#569cd6] border border-[#569cd6]/30'
                    : 'text-[#858585] hover:text-[#d4d4d4] hover:bg-[#3c3c3c]'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}