import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    
    const { title, content } = req.body;
    if (!title || !content) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
  
    const slug = title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// getPosts: Retrieves posts with optional filtering, pagination, and sorting
export const getPosts = async (req, res, next) => {
  try {
    // Extract pagination and sorting details from the query
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const isAdmin = req.user?.isAdmin;  // Check if the user is an admin
    const userId = req.user?._id;  // Get the userId from the authenticated user

    // Build filters for the query
    const filters = {
      ...(req.query.userId && { userId: req.query.userId }),  // Filter by userId if provided
      ...(req.query.category && { category: req.query.category }),  // Filter by category if provided
      ...(req.query.slug && { slug: req.query.slug }),  // Filter by slug if provided
      ...(req.query.searchTerm && {  // Search by title or content if a search term is provided
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    // Apply additional filtering for non-admin users (only free posts or posts the user has bought)
    if (!isAdmin) {
      filters.$or = [
        { isFree: true },
        { buyers: userId },
      ];
    }

    // If a specific post ID is provided, return the specific post
    if (req.query.postId) {
      const post = await Post.findById(req.query.postId).populate('userId', 'email username');
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json({
        post: {
          ...post.toObject(),
          price: post.price || 0,  // Ensure price defaults to 0 if not set
        },
      });
    }

    // Fetch posts based on the filters, with sorting, pagination, and population
    const posts = await Post.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate('userId', 'email username');  // Populate email and username of the post owner

    // Count the total number of posts that match the filters
    const totalPosts = await Post.countDocuments(filters);

    // Get posts created within the last month
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    // Ensure all posts include a price, defaulting to 0 if not set
    const postsWithPrices = posts.map((post) => ({
      ...post.toObject(),
      price: post.price || 0,
    }));

    // Return the posts, total post count, and the number of posts created in the last month
    res.status(200).json({
      posts: postsWithPrices,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    next(error);  // Pass the error to the next middleware
  }
};

// getPostById: Fetches a single post by its ID
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;  // Extract postId from request params

    // Find the post by its ID
    const post = await Post.findById(postId).populate('userId', 'email username');

    // If the post is not found, return a 404 status
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Return the post data, including the price (defaulting to 0 if not set)
    return res.status(200).json({
      ...post.toObject(),
      price: post.price || 0,
    });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const updatePost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    ).populate('userId', 'email');

    if (!updatedPost) {
      return next(errorHandler(404, 'Post not found'));
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};


export const deletePost = async (req, res, next) => {
  try {
    // Only allow deletion if the user is an admin
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }

    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};