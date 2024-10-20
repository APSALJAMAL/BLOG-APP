import React from 'react'

function Section() {
  return (
    <div>
      <section className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-lg text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">Explore the Future of Technology</h2>

      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Stay updated with the latest trends, insights, and innovations in tech and personal growth. Discover how the world of technology is evolving and how you can be a part of it.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
        href="/blog/ai-future"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">AI: Shaping Tomorrow</h2>

        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          Dive into the transformative impact of Artificial Intelligence and what it means for industries worldwide.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl transition hover:border-green-500/10 hover:shadow-green-500/10"
        href="/blog/blockchain-impact"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Blockchain: Beyond Cryptos</h2>

        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          Learn how blockchain is revolutionizing sectors beyond cryptocurrencies, from healthcare to finance.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl transition hover:border-yellow-500/10 hover:shadow-yellow-500/10"
        href="/blog/personal-growth"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Mastering Personal Growth</h2>

        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          Discover practical tips and strategies for continuous self-improvement and growth.
        </p>
      </a>
    </div>
  </div>
</section>

    </div>
  )
}

export default Section
