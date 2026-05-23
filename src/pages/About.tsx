export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono">
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#6a9955]">关于</span>
              <span className="text-[#d4d4d4]">项目</span>
            </h1>
            <p className="text-[#569cd6] text-lg">
              // 了解这个屎山项目的前世今生
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
                README.md
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#569cd6] mb-4">
                  # 哈基米屎山代码博物馆
                </h2>
                <p className="text-[#858585] mb-4">
                  一个用程序员视角解码猫咪迷惑行为的非正经博物馆。
                  本站所有代码均来自真实猫咪，未经任何测试，bug 数量未知。
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#ce9178] mb-4">
                  ## 项目简介
                </h3>
                <p className="text-[#d4d4d4] mb-4">
                  你是否曾经观察过猫咪的行为，然后陷入深深的困惑："这到底是什么逻辑？"
                  作为一个程序员，我终于找到了答案——猫咪就是一台运行着千万年屎山代码的单核处理器。
                </p>
                <p className="text-[#d4d4d4] mb-4">
                  它的代码从未被重构过，注释全是乱码，变量命名全是拼音，
                  但就是能跑。就像你公司那个上线三年没人敢动的核心系统一样。
                </p>
                <p className="text-[#d4d4d4]">
                  从捕猎本能到睡眠管理，从声音输出到凌晨跑酷，
                  猫咪的每一个行为都可以用屎山代码来解释。
                  当然，解释归解释，修是修不了的。
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#ce9178] mb-4">
                  ## 创意来源
                </h3>
                <p className="text-[#d4d4d4] mb-4">
                  这个项目的灵感来源于某个凌晨3点，我被猫咪的跑酷吵醒后的一顿头脑风暴。
                  我突然顿悟：猫咪的行为逻辑和我们写的屎山代码简直一模一样！
                </p>
                <p className="text-[#d4d4d4] mb-4">
                  比如，猫咪总是选择最不合适的地方睡觉——这不就是"最差位置算法"吗？
                </p>
                <p className="text-[#d4d4d4] mb-4">
                  又比如，猫咪想出去又不想出去的矛盾——这不就是"量子叠加态"吗？
                  不，这其实是产品经理的需求变更。
                </p>
                <p className="text-[#d4d4d4]">
                  再比如，猫咪翻肚皮但不让你摸——这不就是"接口文档与实际实现不符"吗？
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#ce9178] mb-4">
                  ## 技术实现
                </h3>
                <p className="text-[#d4d4d4] mb-4">
                  这个屎山项目使用了以下技术栈：
                </p>
                <ul className="list-disc list-inside text-[#d4d4d4] space-y-2 mb-4">
                  <li>React 18 + TypeScript（类型安全感 max）</li>
                  <li>Vite 构建工具（快，但不如猫咪跑酷快）</li>
                  <li>Tailwind CSS 样式框架（CSS 层面的屎山）</li>
                  <li>React Router v6 路由管理（比猫咪的脑回路清晰）</li>
                  <li>CSS 动画和过渡效果（纯 CSS，零 JS 动画库，性能拉满）</li>
                </ul>
                <p className="text-[#d4d4d4]">
                  所有动画都用 CSS 实现，没有使用任何 JavaScript 动画库。
                  因为猫咪的单核处理器跑不起更多依赖了。
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#ce9178] mb-4">
                  ## 彩蛋说明
                </h3>
                <p className="text-[#d4d4d4] mb-4">
                  这个项目中隐藏了一些彩蛋，等待你去发现（提示：试试图 3 件事）：
                </p>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c] mb-4">
                  <div className="text-sm text-[#6a9955]">
                    // 彩蛋列表（已加密，需要程序员直觉解锁）
                  </div>
                  <div className="text-sm text-[#d4d4d4] mt-2">
                    <div>1. 在键盘上输入一些特殊字符...</div>
                    <div>2. 在页面上待久一点...</div>
                    <div>3. 找找角落里有没有什么小东西...</div>
                    <div className="text-[#858585] mt-2">// 提示：别告诉猫咪，这是人类的秘密</div>
                  </div>
                </div>
                <p className="text-[#d4d4d4]">
                  如果你发现了彩蛋，恭喜你获得了"猫咪代码考古学家"称号。
                  请不要在猫咪面前炫耀，它会假装没看到。
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#ce9178] mb-4">
                  ## 联系方式
                </h3>
                <p className="text-[#d4d4d4] mb-4">
                  如果你有任何问题、建议、或者想分享你家猫咪的屎山代码：
                </p>
                <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#3c3c3c]">
                  <div className="text-sm text-[#569cd6]">
                    GitHub: https://github.com/hajimi-museum
                  </div>
                  <div className="text-sm text-[#569cd6] mt-2">
                    Email: meow@hajimi-museum.dev
                  </div>
                  <div className="text-sm text-[#858585] mt-2">
                    // 回复时间：取决于猫咪是否趴在键盘上
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#ce9178] mb-4">
                  ## 许可证
                </h3>
                <p className="text-[#d4d4d4]">
                  本项目采用 MIT 许可证。你可以自由使用、修改和分发这个项目。
                  但请注意：猫咪的行为概不负责，修复建议仅供参考，
                  实际效果取决于你家猫咪的心情和它运行的屎山代码版本。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-[#858585]">
            <p>哈基米屎山代码博物馆 v∞.0.0 (从不更新版本号)</p>
            <p className="mt-2">
              // 用程序员的视角，解码猫の迷惑行为 | 贡献代码请先通过猫咪面试
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
