import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import BlogLogo from '../../assets/logo.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address'); // Error notification for invalid email
      setLoading(false);
      return;
    }

    try {
      // Send a POST request to your backend's forgot password endpoint
      await axios.post('/api/auth/forgot-password', { email });

      // Success toast notification
      toast.success('OTP sent to your email. Please check your inbox.');

      // Navigate to the OTP validation page with the email state
      navigate(`/validate-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      // Error toast notification
      toast.error(err.response?.data?.message || 'Something went wrong'); // Use response message or a generic message
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex p-9 max-w-md mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className='flex-1'>
          <form
            className='flex flex-col gap-4 p-6 rounded shadow-2xl drop-shadow-lg filter shadow-gray-800 dark:shadow-purple-500 dark:shadow-2xl w-80'
            onSubmit={handleForgotPassword}
          >
            {/* Add the logo */}
            <div className='flex justify-center'>
              <img
                src={BlogLogo}
                alt='Logo'
                className='w-20 h-20 rounded-full object-cover'
              />
            </div>
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email
              </Label>
              <TextInput
                type="email"
                placeholder='name@company.com'
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="transition-all duration-300"
              gradientDuoTone='purpleToPink'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-2">Sending...</span>
                </>
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* ToastContainer to show toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default ForgotPassword;
