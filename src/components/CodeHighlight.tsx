interface CodeHighlightProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const PYTHON_KEYWORDS = new Set([
  'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return',
  'import', 'from', 'as', 'try', 'except', 'finally', 'raise',
  'with', 'yield', 'lambda', 'pass', 'break', 'continue',
  'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None',
]);

const JS_KEYWORDS = new Set([
  'function', 'const', 'let', 'var', 'class', 'new', 'this',
  'throw', 'try', 'catch', 'async', 'await', 'import', 'export',
  'default', 'from', 'true', 'false', 'null', 'undefined',
]);

const PYTHON_BUILTINS = new Set([
  'print', 'len', 'range', 'type', 'int', 'str', 'float', 'list',
  'dict', 'set', 'tuple', 'bool', 'input', 'open', 'abs', 'all',
  'any', 'bin', 'chr', 'dir', 'enumerate', 'eval', 'exec', 'filter',
  'format', 'getattr', 'globals', 'hasattr', 'hash', 'hex', 'id',
  'isinstance', 'iter', 'locals', 'map', 'max', 'min', 'next',
  'oct', 'ord', 'pow', 'repr', 'reversed', 'round', 'setattr',
  'slice', 'sorted', 'sum', 'super', 'vars', 'zip',
]);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightLine(line: string): string {
  const tokens: string[] = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === '#') {
      tokens.push(`<span class="text-[#6a9955]">${escapeHtml(line.slice(i))}</span>`);
      break;
    }

    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push(`<span class="text-[#6a9955]">${escapeHtml(line.slice(i))}</span>`);
      break;
    }

    if (line[i] === '/' && line[i + 1] === '*') {
      const end = line.indexOf('*/', i + 2);
      if (end !== -1) {
        tokens.push(`<span class="text-[#6a9955]">${escapeHtml(line.slice(i, end + 2))}</span>`);
        i = end + 2;
        continue;
      }
      tokens.push(`<span class="text-[#6a9955]">${escapeHtml(line.slice(i))}</span>`);
      break;
    }

    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === '\\') {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j++;
          break;
        }
        j++;
      }
      tokens.push(`<span class="text-[#ce9178]">${escapeHtml(line.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) {
        j++;
      }
      const word = line.slice(i, j);

      if (PYTHON_KEYWORDS.has(word) || JS_KEYWORDS.has(word)) {
        tokens.push(`<span class="text-[#569cd6]">${escapeHtml(word)}</span>`);
      } else if (PYTHON_BUILTINS.has(word)) {
        tokens.push(`<span class="text-[#dcdcaa]">${escapeHtml(word)}</span>`);
      } else if (j < line.length && line[j] === '(') {
        tokens.push(`<span class="text-[#dcdcaa]">${escapeHtml(word)}</span>`);
      } else {
        tokens.push(escapeHtml(word));
      }
      i = j;
      continue;
    }

    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.]/.test(line[j])) {
        j++;
      }
      tokens.push(`<span class="text-[#b5cea8]">${escapeHtml(line.slice(i, j))}</span>`);
      i = j;
      continue;
    }

    tokens.push(escapeHtml(line[i]));
    i++;
  }

  return tokens.join('');
}

export default function CodeHighlight({
  code,
  language = 'python',
  showLineNumbers = true,
  className = '',
}: CodeHighlightProps) {
  const lines = code.split('\n');

  return (
    <div className={`bg-[#1e1e1e] rounded-lg border border-[#3c3c3c] overflow-hidden ${className}`}>
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
      
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            {showLineNumbers ? (
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
                        __html: highlightLine(line) || '&nbsp;',
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {lines.map((line, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: highlightLine(line) || '&nbsp;',
                    }}
                  />
                ))}
              </div>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
