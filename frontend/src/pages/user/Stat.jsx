import React from 'react'

function Stat() {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
      Trusted by Tech Bloggers Worldwide
    </h2>

    <p className="mt-4 text-gray-500 dark:text-gray-400 sm:text-xl">
      Discover insights and reviews from the tech world. Stay informed about the latest trends and developments.
    </p>
  </div>

  <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
    <div className="flex flex-col rounded-lg bg-blue-50 dark:bg-gray-800 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-300">Published Articles</dt>
      <dd className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 md:text-5xl">320+</dd>
    </div>

    <div className="flex flex-col rounded-lg bg-blue-50 dark:bg-gray-800 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-300">Active Contributors</dt>
      <dd className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 md:text-5xl">45</dd>
    </div>

    <div className="flex flex-col rounded-lg bg-blue-50 dark:bg-gray-800 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-300">Tech Reviews</dt>
      <dd className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 md:text-5xl">150+</dd>
    </div>

    <div className="flex flex-col rounded-lg bg-blue-50 dark:bg-gray-800 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-300">Monthly Visits</dt>
      <dd className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 md:text-5xl">120k</dd>
    </div>
  </dl>
</div>

    </div>
  )
}

export default Stat
