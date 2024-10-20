import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/categoryposts?category=${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center mb-6 shadow-gray-800 shadow-xl dark:shadow-purple-500 dark:shadow-xl">
      {/* Select Category Title at the Top */}
      <div className="pt-10 pb-6">
        <h1 className="text-4xl font-bold text-center">Select Category</h1>
      </div>

      {/* Big Container */}
      <div className="w-full grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 max-w-6xl px-6 lg:px-8">
        
        {/* First Big Category Box */}
        <div
          onClick={() => handleCategoryClick('javascript')}
          className="cursor-pointer bg-yellow-400 w-full h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition transform hover:scale-105"
        >
          <h2 className="text-4xl font-semibold">JavaScript</h2>
        </div>

        {/* Second Row: Two Smaller Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:h-48">
          {/* React.js Box */}
          <div
            onClick={() => handleCategoryClick('reactjs')}
            className="cursor-pointer bg-blue-400 h-20 lg:h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">React.js</h2>
          </div>

          {/* Next.js Box */}
          <div
            onClick={() => handleCategoryClick('nextjs')}
            className="cursor-pointer bg-purple-400 h-20 lg:h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">Next.js</h2>
          </div>
        </div>

        {/* Third Row: Two More Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:h-48">
          {/* Vue.js Box */}
          <div
            onClick={() => handleCategoryClick('vuejs')}
            className="cursor-pointer bg-green-400 h-20 lg:h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-green-500 hover:text-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">Vue.js</h2>
          </div>

          {/* Angular Box */}
          <div
            onClick={() => handleCategoryClick('angular')}
            className="cursor-pointer bg-red-400 h-20 lg:h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">Angular</h2>
          </div>
        </div>

        {/* Fourth Big Category Box */}
        <div
          onClick={() => handleCategoryClick('python')}
          className="cursor-pointer bg-teal-400 w-full h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition transform hover:scale-105"
        >
          <h2 className="text-4xl font-semibold">Python</h2>
        </div>

        {/* Fifth Big Category Box */}
        <div
          onClick={() => handleCategoryClick('go')}
          className="cursor-pointer bg-indigo-400 w-full h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition transform hover:scale-105"
        >
          <h2 className="text-4xl font-semibold">Go</h2>
        </div>

        {/* Sixth Row: Two Smaller Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 lg:h-48">
          {/* Svelte Box */}
          <div
            onClick={() => handleCategoryClick('svelte')}
            className="cursor-pointer bg-orange-400 h-20 lg:h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">Svelte</h2>
          </div>

          {/* Elixir Box */}
          <div
            onClick={() => handleCategoryClick('elixir')}
            className="cursor-pointer bg-pink-400 h-20 lg:h-48 p-6 rounded-lg shadow-lg dark:shadow-purple-500 dark:shadow-xl shadow-gray-800 flex items-center justify-center hover:bg-pink-500 hover:text-white transition transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold">Elixir</h2>
          </div>
        </div>

      </div>
    </div>
  );
}
