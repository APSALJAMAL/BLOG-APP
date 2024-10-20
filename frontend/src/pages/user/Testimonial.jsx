import React from 'react'

function Testimonial() {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-800">
  <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
    <div className="md:flex md:items-end md:justify-between">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Explore Insights from Our Latest Testimonial
        </h2>

        <p className="mt-6 max-w-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Dive into thought-provoking articles and expert opinions on topics that matter to you.
          From technology trends to lifestyle tips, our blog has something for everyone.
        </p>
      </div>

      <a
        href="/search"
        className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-600 px-5 py-3 text-rose-600 transition hover:bg-rose-600 hover:text-white dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-gray-900 md:mt-0"
      >
        <span className="font-medium"> Explore All Testimonial </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <blockquote className="flex h-full flex-col justify-between bg-white dark:bg-gray-800 p-6 shadow-sm sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            {/* Rating stars */}
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Repeat stars as needed */}
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 sm:text-3xl">Empowering Change</p>

            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Our mission is to deliver impactful content that inspires positive action. Whether
              you're seeking career advice, tech tutorials, or insights on the latest trends, you'll
              find it all here.
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-6">
          &mdash; Jane Doe
        </footer>
      </blockquote>

      <blockquote className="flex h-full flex-col justify-between bg-white dark:bg-gray-800 p-6 shadow-sm sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            {/* Rating stars */}
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Repeat stars as needed */}
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 sm:text-3xl">Empowering Change</p>

            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Our mission is to deliver impactful content that inspires positive action. Whether
              you're seeking career advice, tech tutorials, or insights on the latest trends, you'll
              find it all here.
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-6">
          &mdash; Jane Doe
        </footer>
      </blockquote>

      <blockquote className="flex h-full flex-col justify-between bg-white dark:bg-gray-800 p-6 shadow-sm sm:p-8">
        <div>
          <div className="flex gap-0.5 text-green-500">
            {/* Rating stars */}
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Repeat stars as needed */}
          </div>

          <div className="mt-4">
            <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 sm:text-3xl">Empowering Change</p>

            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Our mission is to deliver impactful content that inspires positive action. Whether
              you're seeking career advice, tech tutorials, or insights on the latest trends, you'll
              find it all here.
            </p>
          </div>
        </div>

        <footer className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-6">
          &mdash; Jane Doe
        </footer>
      </blockquote>

      {/* Add more blockquotes with different content */}
    </div>
    
  </div>
</section>

    </div>
  )
}

export default Testimonial
