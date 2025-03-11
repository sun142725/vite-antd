import React, { useState } from 'react';
import { Dice6, RefreshCw, CircleDot } from 'lucide-react';

function generateNumbers() {
  // Generate 6 unique red balls (1-33)
  const redBalls = new Set<number>();
  while (redBalls.size < 6) {
    redBalls.add(Math.floor(Math.random() * 33) + 1);
  }
  
  // Generate 1 blue ball (1-16)
  const blueBall = Math.floor(Math.random() * 16) + 1;
  
  return {
    red: Array.from(redBalls).sort((a, b) => a - b),
    blue: blueBall
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
            双色球随机选号
            <Dice6 className="text-yellow-300" />
          </h1>
          <p className="text-lg text-gray-300">随机生成你的幸运号码</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="space-y-8">
              <div className="flex flex-wrap justify-center gap-4">
                {numbers.red.map((number, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg"
                  >
                    <span className="text-2xl font-bold">{String(number).padStart(2, '0')}</span>
                  </div>
                ))}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold">{String(numbers.blue).padStart(2, '0')}</span>
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
                  <li>• 红球：从1-33中选择6个不重复的号码</li>
                  <li>• 蓝球：从1-16中选择1个号码</li>
                  <li>• 红球号码从小到大排序显示</li>
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