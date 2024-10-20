import { Modal, Table, Button, TextInput, Alert, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function DashPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/post/getposts`);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        console.log(data.posts); // Check the structure of posts here
        setPosts(data.posts);
        setFilteredPosts(data.posts);
        setShowMore(data.posts.length === 9); // Modify as per pagination
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      if (!res.ok) throw new Error('Failed to load more posts');
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setFilteredPosts((prev) => [...prev, ...data.posts]);
      setShowMore(data.posts.length === 9);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/post/delete/${postIdToDelete}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      setFilteredPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      setShowModal(false);
      toast.success('Post deleted successfully'); // Success notification
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (query, dateRange) => {
    setSearchQuery(query);
    setDateQuery(dateRange);
  
    const lowerQuery = query.toLowerCase();
    let filtered = posts.filter((post) => {
      const userIdMatches = post.userId.username.toLowerCase().includes(lowerQuery) || 
                            post.userId.email.toLowerCase().includes(lowerQuery);
  
      return (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery) ||
        (post.isFree ? 'free' : 'paid').includes(lowerQuery) ||
        userIdMatches
      );
    });
  
    // Date filtering logic
    if (dateRange) {
      if (dateRange.includes('-')) {
        const [startDateStr, endDateStr] = dateRange.split('-').map((date) => new Date(date.trim()));
        startDateStr.setHours(0, 0, 0, 0);
        endDateStr.setHours(23, 59, 59, 999);
  
        filtered = filtered.filter((post) => {
          const postDate = new Date(post.createdAt);
          return postDate >= startDateStr && postDate <= endDateStr;
        });
      } else {
        const dateFilter = new Date(dateRange);
        dateFilter.setHours(0, 0, 0, 0);
        filtered = filtered.filter((post) => {
          const postDate = new Date(post.createdAt);
          return postDate.toDateString() === dateFilter.toDateString();
        });
      }
    }
  
    setFilteredPosts(filtered);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setDateQuery('');
    setFilteredPosts(posts);
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {posts.length > 0 ? (
        <>
          {error && <Alert color="failure">{error}</Alert>}
          {loading && <p>Loading...</p>}

          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="flex flex-col w-full max-w-xl">
              <Label value='Filter' />
              <TextInput
                type='text'
                placeholder='Filter by title, category, free/paid'
                value={searchQuery}
                onChange={(e) => handleFilter(e.target.value, dateQuery)}
                className='w-full mb-2'
              />
            </div>
            <div className="flex flex-col w-full max-w-xl">
              <Label value='Date Range' />
              <TextInput
                type='text'
                placeholder='Filter by date or date range (e.g., 10/8/2024 or 10/8/2024-10/11/2024)'
                value={dateQuery}
                onChange={(e) => handleFilter(searchQuery, e.target.value)}
                className='w-full mb-2'
              />
            </div>
            <div>
              <Button onClick={clearFilters}>Clear</Button>
            </div>
          </div>

          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Free/Paid</Table.HeadCell>
              <Table.HeadCell>User ID</Table.HeadCell> {/* New column for User ID */}
              <Table.HeadCell>User Name</Table.HeadCell> {/* New column for User Name */}
              <Table.HeadCell>User Email</Table.HeadCell> {/* New column for User Email */}
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {filteredPosts.map((post) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={post._id}>
                  <Table.Cell>{new Date(post.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{post.title}</Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>{post.isFree ? 'Free' : `$${post.price}`}</Table.Cell>
                  <Table.Cell>{post.isFree ? 'Free' : 'Paid'}</Table.Cell>
                  <Table.Cell>{post.userId._id || 'N/A'}</Table.Cell> {/* Show User ID or N/A */}
                  <Table.Cell>{post.userId.username || 'N/A'}</Table.Cell> {/* Show User Name or N/A */}
                  <Table.Cell>{post.userId.email || 'N/A'}</Table.Cell> {/* Show User Email or N/A */}
                  
                  <Table.Cell>
                    <Button
                      color="failure"
                      onClick={() => {
                        setPostIdToDelete(post._id);
                        setShowModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {showMore && (
            <div className='flex justify-center my-4'>
              <Button onClick={handleShowMore}>Show More</Button>
            </div>
          )}

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>Delete Post</Modal.Header>
            <Modal.Body>
              <p className='text-gray-500'>Are you sure you want to delete this post?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button color="failure" onClick={handleDeletePost}>Yes</Button>
              <Button onClick={() => setShowModal(false)}>No</Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
