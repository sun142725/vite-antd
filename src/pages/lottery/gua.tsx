import React, { useState } from 'react';
import { Sparkles, BookOpen, RefreshCw, ScrollText } from 'lucide-react';

// 八卦数据
const trigrams = [
  { name: '乾', nature: '天', attribute: '刚健', symbol: '☰' },
  { name: '兑', nature: '泽', attribute: '悦', symbol: '☱' },
  { name: '离', nature: '火', attribute: '丽', symbol: '☲' },
  { name: '震', nature: '雷', attribute: '动', symbol: '☳' },
  { name: '巽', nature: '风', attribute: '入', symbol: '☴' },
  { name: '坎', nature: '水', attribute: '陷', symbol: '☵' },
  { name: '艮', nature: '山', attribute: '止', symbol: '☶' },
  { name: '坤', nature: '地', attribute: '顺', symbol: '☷' },
];

// 生成卦象
function generateHexagram() {
  const upperTrigram = trigrams[Math.floor(Math.random() * 8)];
  const lowerTrigram = trigrams[Math.floor(Math.random() * 8)];
  return { upper: upperTrigram, lower: lowerTrigram };
}

function App() {
  const [hexagram, setHexagram] = useState(generateHexagram());
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDivination = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setHexagram(generateHexagram());
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-red-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-300" />
            周易八卦
            <Sparkles className="text-yellow-300" />
          </h1>
          <p className="text-lg text-gray-300">探索古老的智慧，寻求生命的启示</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="space-y-8">
              {/* 卦象显示区 */}
              <div className="flex flex-col items-center gap-8">
                <div className="text-8xl font-bold relative">
                  <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                    {hexagram.upper.symbol}
                    {hexagram.lower.symbol}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                  {/* 上卦 */}
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">上卦</h3>
                    <div className="text-2xl font-bold mb-2">{hexagram.upper.name}</div>
                    <div className="text-gray-300">{hexagram.upper.nature} · {hexagram.upper.attribute}</div>
                  </div>

                  {/* 下卦 */}
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">下卦</h3>
                    <div className="text-2xl font-bold mb-2">{hexagram.lower.name}</div>
                    <div className="text-gray-300">{hexagram.lower.nature} · {hexagram.lower.attribute}</div>
                  </div>
                </div>
              </div>

              {/* 占卜按钮 */}
              <div className="flex justify-center">
                <button
                  onClick={handleDivination}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full text-lg font-semibold shadow-lg hover:from-yellow-500 hover:to-red-500 transition-all duration-300 flex items-center gap-2"
                  disabled={isAnimating}
                >
                  <RefreshCw className={`${isAnimating ? 'animate-spin' : ''}`} />
                  求卦问道
                </button>
              </div>

              {/* 说明区域 */}
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="text-yellow-300" />
                    八卦简介
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    八卦是中国古代哲学的基本概念，代表着宇宙间阴阳变化的八种基本状态。
                    每一卦都包含着深刻的宇宙观和人生哲理，通过卦象的组合可以阐释万事万物的变化规律。
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ScrollText className="text-yellow-300" />
                    占卜方法
                  </h2>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 在占卜前，请先静心冥想，想着你要问的问题</li>
                    <li>• 点击"求卦问道"按钮，系统会随机生成一个卦象</li>
                    <li>• 卦象由上卦和下卦组成，每一卦都有其独特的含义</li>
                    <li>• 结合卦象的属性和特质，思考其对你的启示</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;