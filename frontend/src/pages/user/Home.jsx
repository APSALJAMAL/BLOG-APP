import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Features from './Features';
import Testimonial from './Testimonial';
import Stat from './Stat';
import Section from './Section';
import Pricing from './Pricing';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Jamal's Blog</h1>
        <p className='text-white-500 text-md sm:text-md'>
  Hello and welcome to <strong>Jamal's Blog</strong>! 🌟 This is a space where I share my thoughts and insights on technology, lifestyle, travel, and personal development. Whether you’re looking for helpful tips or inspiring stories, there’s something here for everyone. <br /><br />
  <strong>What You’ll Find:</strong> <br />
  - <strong>In-Depth Articles:</strong> Explore topics that matter with well-researched content. <br />
  - <strong>Personal Stories:</strong> Join me on my journey and learn from my experiences. <br />
  - <strong>Engaging Discussions:</strong> Share your thoughts in the comments and connect with others! <br /><br />
  Thank you for visiting! I hope you find inspiration and enjoyment in my posts. <br />
  Happy reading! 📖
</p>

        <Link
          to='/search'
          className='text-md sm:text-md text-purple-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='p-3 bg-purple-200 dark:bg-slate-700'>
        
        <Features/>
        <Stat/>
        <Section/>
        <Testimonial/>
        <Pricing/>
      </div>

      
    </div>
  );
}