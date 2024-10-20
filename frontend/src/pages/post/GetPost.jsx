import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';
import { Triangle } from 'react-loader-spinner'; // Make sure this import is correct

export default function GetPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/post/getposts?page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts.');
        }

        const data = await response.json();
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMore(data.posts.length > 0); // If there are no more posts, stop loading more
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const loadMorePosts = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className='container min-h-screen mx-auto p-5'>
      {/* Greet the current user */}
      {currentUser && (
        <h2 className='text-xl font-medium mb-4'>
          Welcome back, {currentUser.username}!
        </h2>
      )}

      <h1 className='text-3xl font-semibold mb-8 text-center'>Recent Posts</h1>

      {error && <p className='text-red-500'>Error: {error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center'>
        {posts.map((post) => (
          <div key={post._id} className='mx-auto'>
            <PostCard
              post={post}
              hasPurchased={post.hasPurchased} // Assuming this is included in the post data
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center min-h-screen absolute top-0 left-0 right-0 bottom-0 dark:bg-gray-800 ">
          <Triangle
            visible={true}
            height="120" // Increased height
            width="120" // Increased width
            color="#a855f7" // Purple-500 color
            ariaLabel="triangle-loading"
          />
        </div>
      )}

      {!loading && hasMore && (
        <div className='text-center mt-5'>
          <button
            onClick={loadMorePosts}
            className='px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-teal-600'
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && !loading && (
        <p className='text-center text-gray-500 mt-5'>No more posts to display.</p>
      )}
    </div>
  );
}
