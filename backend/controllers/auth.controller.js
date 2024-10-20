import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendOtpEmail,sendResendOtpEmail,sendResetPasswordEmail,sendEmail } from '../utils/emailService.js';
import { checkUserBlocked } from './user.controller.js';

//import { verifyIdToken } from '../firebaseAdmin.js'; // Import the token verification function

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Check if the user is blocked
    const isBlocked = await checkUserBlocked(email);
    if (isBlocked) {
      return next(errorHandler(403, 'You are blocked by the admin'));
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    // Exclude password from the response
    const { password: pass, ...rest } = validUser._doc;

    // Set the token in cookies and return the user data
    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);

  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (user) {
      // Check if the user is blocked
      if (user.isBlocked) {
        return res.status(403).json({ success: false, message: 'You are blocked by the admin' });
      }

      // User exists and is not blocked, generate token
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '5d' } // Token expires in 5 days
      );
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ success: true, ...rest });

    } else {
      // Create new user if they do not exist
      const generatedPassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      // Generate token for new user
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '5d' } // Token expires in 5 days
      );
      const { password, ...rest } = newUser._doc;

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ success: true, ...rest });
    }

  } catch (error) {
    next(error);
  }
};




export const validateOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Clear the OTP after validation
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP validated successfully. You can now reset your password.' });
  } catch (error) {
    res.status(500).json({ message: 'Error validating OTP' });
  }
};

// Send reset password link
export const forgotPassword = async (req, res) => {
  const { email } = req.body; // Accept email instead of userId
  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a six-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a six-digit OTP
    user.otp = otp;
    user.otpExpires = Date.now() + 2 * 60 * 1000; // OTP expires in 2 minutes

    await user.save();

    // Send OTP via email (you'll implement email logic here)
    await sendOtpEmail(user.email, otp);

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Resend OTP Controller
export const resendOtp = async (req, res) => {
  const { email } = req.body; // Include the email in the request body

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP and save it as a string
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Ensure it's a six-digit string
    user.otp = otp;
    user.otpExpires = Date.now() + 2 * 60 * 1000; // Set a new expiration time for the OTP (2 minutes)
    await user.save();

    console.log('Generated OTP:', otp); // Log the generated OTP for debugging

    // Send new OTP via email
    await sendResendOtpEmail(user.email, otp);

    res.status(200).json({ message: 'New OTP sent to your email' });
  } catch (error) {
    console.error('Error in resendOtp:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error resending OTP' });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.params; // Get email from the URL parameters
  const { password } = req.body; // Get new password from request body

  try {
    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    await sendResetPasswordEmail(user.email);

    // Send success response
    res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (error) {
    console.error("Server error while resetting password:", error); // Log the error
    res.status(500).json({ message: "Server error while resetting password." });
  }
};

export const getOldPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate the input
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ oldPasswordHash: user.password });
  } catch (error) {
    console.error("Error fetching old password:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error." });
  }
};


// backend/controllers/authController.js

// Function to handle phone authentication
export const verifyPhoneAuth = async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify Firebase ID Token
    const decodedToken = await verifyIdToken(idToken);
    
    // Token is valid, extract user data from the decoded token
    const { uid, phone_number } = decodedToken;

    // Here, you could create a session or return a custom JWT for the user
    // For this example, we just return the decoded token
    return res.status(200).json({
      message: 'Authentication successful!',
      uid,
      phone_number,
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid ID token', error: error.message });
  }
};
