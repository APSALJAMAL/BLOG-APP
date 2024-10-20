import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from './PostCard'; // Make sure to import your PostCard component
import { Triangle } from 'react-loader-spinner'; // Import the Triangle loader component

export default function CategoryPostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const category = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/post/getposts?category=${category}`);
        if (!res.ok) {
          throw new Error('Failed to fetch posts.');
        }
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    if (category) {
      fetchPosts();
    }
  }, [category]);

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const res = await fetch(`/api/post/getposts?category=${category}&startIndex=${startIndex}`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    if (data.posts.length === 9) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  return (
    <div className="min-h-screen p-11">
      <h1 className="text-3xl font-semibold mb-6">Posts for {category}</h1>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Triangle
            visible={true}
            height="120"
            width="120"
            color="#a855f7"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9">
          {posts.map((post) => (
            <div key={post._id} className="flex justify-center"> {/* Centering PostCard */}
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No posts available for this category.</p>
      )}

      {showMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-700"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
