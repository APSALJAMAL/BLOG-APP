import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';  // Import useLocation here

export default function DashSidebar({ onTabClick }) {
  const location = useLocation();  // Use useLocation inside DashSidebar
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTabClick = (newTab) => {
    setTab(newTab);
    onTabClick(newTab);  // Close the sidebar when a tab is clicked
  };

  return (
    <Sidebar className='w-full md:w-56 shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1 '>
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash' onClick={() => handleTabClick('dash')}>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
                className='shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile' onClick={() => handleTabClick('profile')}>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
              className='shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts' onClick={() => handleTabClick('posts')}>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
                className='shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users' onClick={() => handleTabClick('users')}>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                  className='shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments' onClick={() => handleTabClick('comments')}>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                  className='shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser.isAdmin && (
            <Link to='/transactions' onClick={() => handleTabClick('transactions')}>
              <Sidebar.Item
                active={tab === 'transactions'}
                icon={HiDocumentText}
                as='div'
                className='shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
              >
                Transactions
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={handleSignout}
            className='cursor-pointer shadow-gray-800 shadow-lg dark:shadow-purple-500 dark:shadow-lg'
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
