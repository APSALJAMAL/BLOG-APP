import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from '../../components/comment/CommentSection';
import PostCard from './PostCard';

export default function PostPage() {
  const { postId } = useParams(); // Replace postSlug with postId
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Error state defined
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?id=${postId}`); // Fetch post by id
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true); // Set error state if fetching fails
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]); // Update the dependency to postId

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  // Show spinner while loading
  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  // Show error message if there is an error
  if (error)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-red-500'>Error loading post. Please try again later.</p>
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      {/* Title and Price in a flex container */}
      <div className='flex justify-between items-start mt-10 p-3 max-w-2xl mx-auto w-full'>
        <h1 className='text-3xl font-serif lg:text-4xl'>{post && post.title}</h1>
        {/* Display price in the top right */}
        <div className='text-right'>
          {post && post.isFree ? (
            <span className='text-green-500 font-semibold'>Free</span>
          ) : (
            <span className='text-red-500 font-semibold'>
              ${post && post.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'></div>
      <CommentSection postId={post._id} /> {/* Pass post._id to CommentSection */}

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
        </div>
      </div>
    </main>
  );
}
