import React, { useState } from 'react';
import { Search, Moon, Sparkles } from 'lucide-react';

// 简单的梦境解释数据库
const dreamDB = {
  '龙': '梦见龙是祥瑞之兆，预示着好运即将来临，事业可能有重大突破。',
  '飞': '梦见自己在飞翔，表示你内心渴望自由，追求理想，暗示你将突破现状。',
  '考试': '梦见考试通常反映生活中的压力和焦虑，提醒你需要好好准备面对挑战。',
  '水': '梦见清水预示好运，浑水则暗示需要谨慎行事。',
  '蛇': '梦见蛇可能预示着身边有是非，需要提高警惕，但也可能暗示着智慧和力量。',
  '钱': '梦见捡钱或得到钱财，暗示近期可能有意外收获，但也提醒要理性对待。',
  '死亡': '梦见死亡往往预示着新生，象征着某种转变或蜕变的开始。',
  '结婚': '梦见结婚可能预示着新的开始，或暗示你对某事已经做好准备。',
  '牙齿': '梦见牙齿掉落，可能暗示着健康问题或人际关系的变化。',
  '下雨': '梦见下雨通常预示着好运，象征着净化和新生。'
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    const interpretation = dreamDB[searchTerm];
    setResult(interpretation || '抱歉，找不到这个梦的解释。请尝试其他关键词，如：龙、飞、水等。');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* 头部标题 */}
          <div className="flex items-center space-x-3">
            <Moon className="w-12 h-12 text-yellow-300" />
            <h1 className="text-4xl font-bold text-center">周公解梦</h1>
            <Sparkles className="w-12 h-12 text-yellow-300" />
          </div>
          
          {/* 搜索框 */}
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="输入梦境关键词（如：龙、飞、水）"
                className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 解梦结果 */}
          {result && (
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-4">解梦结果：</h2>
              <p className="text-lg leading-relaxed">{result}</p>
            </div>
          )}

          {/* 热门梦境关键词 */}
          <div className="w-full max-w-2xl">
            <h3 className="text-center text-lg mb-4">热门梦境关键词</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(dreamDB).map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setSearchTerm(keyword);
                    setResult(dreamDB[keyword]);
                  }}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;