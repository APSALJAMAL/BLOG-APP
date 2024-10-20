import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/user/Home';
import About from './pages/user/About';
import SignIn from './pages/auth/SignIn';
import Dashboard from './pages/admin/Dashboard';
import SignUp from './pages/auth/SignUp';
import Header from './pages/user/Header';
import Footer from './pages/user/Footer';
import PrivateRoute from './pages/admin/PrivateRoute';
import OnlyAdminPrivateRoute from './pages/admin/OnlyAdminPrivateRoute';
import CreatePost from './pages/post/CreatePost';
import UpdatePost from './pages/post/UpdatePost';
import PostPage from './pages/post/PostPage';
import ScrollToTop from './pages/user/ScrollToTop';
import Search from './pages/user/Search';
import TermsConditions from './pages/user/TermsConditions';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import NotFoundPage from './pages/user/404';
import ForgotPassword from './pages/auth/ForgotPassword';
import ValidateOTP from './pages/auth/ValidateOtp';
import ResetPassword from './pages/auth/ResetPassword';
import LoadingPage from './pages/admin/LoadingPage';
import SplashScreen from './pages/admin/SplashScreen'; // Import SplashScreen
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './pages/user/Contact';
import CreateTransaction from './pages/transaction/CreateTransaction';
import GetPost from './pages/post/GetPost';
import Category from './pages/post/Category';
import CategoryPostPage from './pages/post/CategoryPostPage';
import PhoneAuth from './pages/auth/PhoneAuth';



export default function App() {
  const [loading, setLoading] = useState(true); // State to track loading status
  const [showSplash, setShowSplash] = useState(false); // State for splash screen

  useEffect(() => {
    // Check if the user has seen the splash screen
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash'); // Use sessionStorage to track state

    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem('hasSeenSplash', 'true'); // Set flag in sessionStorage
    }

    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Show splash screen for 2 seconds

    const loadingTimer = setTimeout(() => {
      setLoading(false); // Hide loading spinner after total loading time
    }, 5000); // 5 seconds total (2 for splash + 3 for loading)

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <BrowserRouter>

      <ScrollToTop />
      <ToastContainer /> {/* Toastify container for notifications */}
      {showSplash ? (
        <SplashScreen /> // Show splash screen if showSplash is true
      ) : loading ? (
        <LoadingPage /> // Show loading spinner if loading is true
      ) : (
        <>
          <Header />
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn setLoading={setLoading} />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/phoneauth' element={<PhoneAuth />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/validate-otp' element={<ValidateOTP />} />
            <Route path='/reset-password/:email' element={<ResetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path='/terms' element={<TermsConditions />} />
              <Route path='/policy' element={<PrivacyPolicy />} />
              <Route path='/search' element={<Search />} />
              <Route path='/getposts' element={<GetPost />} />
              <Route path='/category' element={<Category />} />
              
            </Route>
            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/update-post/:postId' element={<UpdatePost />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/post/:postId' element={<PostPage />} />
            <Route path='/create-transaction/:postId/:userId' element={<CreateTransaction />} />
            <Route path='/post/:postId' element={<PostPage />} />
            
            <Route path='/categoryposts' element={<CategoryPostPage />} />
            


          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}
