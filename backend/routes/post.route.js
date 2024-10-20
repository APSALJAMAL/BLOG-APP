import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
    create,
    deletePost,
    getPosts,
    updatePost,
    getPostById
} from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getPosts)
// Route to get a single post by postId
router.get('/getposts/:postId', getPostById)
router.delete('/deletepost/:postId/', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)

export default router;