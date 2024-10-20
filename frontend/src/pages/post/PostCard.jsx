import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const PostCard = ({ post, hasPurchased }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Use navigate to programmatically navigate to the buy page

  const handleBuyNow = () => {
    if (currentUser) {
      //navigate(`/create-transaction/${post._id}/${currentUser._id}`); // Use currentUser._id
      navigate(`/`);
    } else {
      console.error("User is not logged in.");
      // Optionally, redirect to the login page or show an alert
    }
  };

  return (
    <div className='group relative w-[300px] h-[300px] border border-purple-500 hover:border-2 hover:border-purple-500 overflow-hidden rounded-lg transition-all shadow-gray-800 shadow-xl dark:shadow-purple-500 dark:shadow-xl'>

        <img
          src={post.image}
          alt='post cover'
          className='h-[180px] w-full object-cover group-hover:h-[160px] transition-all duration-300 z-20'
        />

      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>

        <div className='flex justify-between items-center'>
          {/* Category with an outline */}
          <span className='italic text-sm border border-purple-500 p-1 rounded-lg'>
            {post.category}
          </span>

          {/* Display post status as either 'Free' or the price */}
          <span className='font-semibold'>
            {post.isFree ? (
              <span className='text-green-500'>Free</span>
            ) : (
              <span className='text-red-500'>₹{post.price.toFixed(2)}</span>
            )}
          </span>
        </div>

        {/* Show "Read article" link if the post is free, the user is an admin, or they have purchased the post */}
        <Link
          to={`/post/${post._id}`}
          className={`z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2
          ${post.isFree || currentUser?.isAdmin || hasPurchased ? '' : 'hidden'}`}
        >
          Read article
        </Link>

        {/* Show "Buy Now" button only if the post is not free, the user is not an admin, and they haven't purchased it */}
        {!post.isFree && !currentUser?.isAdmin && !hasPurchased && (
          <button
            onClick={handleBuyNow}
            className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
