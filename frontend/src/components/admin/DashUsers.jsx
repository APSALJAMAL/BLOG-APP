import { Modal, Table, Button, TextInput, Alert, Label } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/user/getusers`);
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
        setShowMore(data.users.length === 9);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      if (!res.ok) throw new Error('Failed to load more users');
      const data = await res.json();
      setUsers((prev) => [...prev, ...data.users]);
      setFilteredUsers((prev) => [...prev, ...data.users]);
      setShowMore(data.users.length === 9);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      setFilteredUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUnblockUser = async (userId, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/user/${action}/${userId}`, { method: 'PATCH' });
      if (!res.ok) throw new Error(`Failed to ${action} user`);
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, isBlocked: !isBlocked } : user))
      );
      setFilteredUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, isBlocked: !isBlocked } : user))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAdminStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/user/updateAdmin/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update admin status');
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, isAdmin: newStatus } : user))
      );
      setFilteredUsers((prev) =>
        prev.map((user) => (user._id === userId ? { ...user, isAdmin: newStatus } : user))
      );
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
    let filtered = users.filter((user) =>
      user.username.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      (user.isAdmin ? 'admin' : 'user').includes(lowerQuery) ||
      (query.toLowerCase() === 'block' && user.isBlocked) ||
      (query.toLowerCase() === 'unblock' && !user.isBlocked)
    );

  // Date filtering logic
  if (dateRange) {
    if (dateRange.includes('-')) {
      const [startDateStr, endDateStr] = dateRange.split('-').map((date) => new Date(date.trim()));
      
      // Set time to start of day for startDate and end of day for endDate
      startDateStr.setHours(0, 0, 0, 0);
      endDateStr.setHours(23, 59, 59, 999);

      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate >= startDateStr && userDate <= endDateStr;
      });
    } else {
      const dateFilter = new Date(dateRange);
      dateFilter.setHours(0, 0, 0, 0); // Set time to start of the day
      filtered = filtered.filter((user) => {
        const userDate = new Date(user.createdAt);
        return userDate.toDateString() === dateFilter.toDateString();
      });
    }
  }
  
    setFilteredUsers(filtered);
  };
  

  const clearFilters = () => {
    setSearchQuery('');
    setDateQuery('');
    setFilteredUsers(users);
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && users.length > 0 ? (
        <>
          {error && <Alert color="failure">{error}</Alert>}
          {loading && <p>Loading...</p>}

          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="flex flex-col w-full max-w-xl">
              <Label value='Filter' />
              <TextInput
                type='text'
                placeholder='Filter by username, email, admin or user, block status (block/unblock)'
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
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Block</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {filteredUsers.map((user) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={user._id}>
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color={user.isAdmin ? 'success' : 'failure'}
                      onClick={() => handleUpdateAdminStatus(user._id, user.isAdmin)}
                    >
                      {user.isAdmin ? 'Admin' : 'User'}
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color={user.isBlocked ? 'failure' : 'success'}
                      onClick={() => handleBlockUnblockUser(user._id, user.isBlocked)}
                    >
                      {user.isBlocked ? 'Block' : 'Unblock'}
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="failure"
                      onClick={() => {
                        setUserIdToDelete(user._id);
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
            <Modal.Header>Delete User</Modal.Header>
            <Modal.Body>
              <p className='text-gray-500'>Are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button color="failure" onClick={handleDeleteUser}>Yes</Button>
              <Button onClick={() => setShowModal(false)}>No</Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
