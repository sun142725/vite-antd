import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 fixed top-0 left-0 z-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white animate-bounce">欢迎来到我的网站!</h1>
        <p className="mt-4 text-2xl text-white">探索无限可能与创造力</p>
        <button className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
          立即开始
        </button>
      </div>
    </div>
  );
};

export default Home; 