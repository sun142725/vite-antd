import React, { useState } from 'react';
import { Dice6, RefreshCw, CircleDot } from 'lucide-react';

function generateNumbers() {
  // Generate 5 front numbers (1-35)
  const frontNumbers = new Set<number>();
  while (frontNumbers.size < 5) {
    frontNumbers.add(Math.floor(Math.random() * 35) + 1);
  }
  
  // Generate 2 back numbers (1-12)
  const backNumbers = new Set<number>();
  while (backNumbers.size < 2) {
    backNumbers.add(Math.floor(Math.random() * 12) + 1);
  }
  
  return {
    front: Array.from(frontNumbers).sort((a, b) => a - b),
    back: Array.from(backNumbers).sort((a, b) => a - b)
  };
}

function App() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [isSpinning, setIsSpinning] = useState(false);

  const handleGenerate = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setNumbers(generateNumbers());
      setIsSpinning(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
            <Dice6 className="text-yellow-300" />
            大乐透随机选号
            <Dice6 className="text-yellow-300" />
          </h1>
          <p className="text-lg text-gray-300">随机生成你的幸运号码</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-6">
                {/* Front Numbers */}
                <div className="flex flex-wrap justify-center gap-4">
                  {numbers.front.map((number, index) => (
                    <div
                      key={`front-${index}`}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl font-bold">{String(number).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full h-px bg-white/20"></div>

                {/* Back Numbers */}
                <div className="flex flex-wrap justify-center gap-4">
                  {numbers.back.map((number, index) => (
                    <div
                      key={`back-${index}`}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
                    >
                      <span className="text-2xl font-bold">{String(number).padStart(2, '0')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleGenerate}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-lg font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw className={`${isSpinning ? 'animate-spin' : ''}`} />
                  随机选号
                </button>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CircleDot className="text-yellow-300" />
                  玩法说明
                </h2>
                <ul className="space-y-2 text-gray-300">
                  <li>• 前区号码：从1-35中选择5个不重复的号码</li>
                  <li>• 后区号码：从1-12中选择2个不重复的号码</li>
                  <li>• 所有号码从小到大排序显示</li>
                  <li>• 点击"随机选号"按钮生成新的号码组合</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;