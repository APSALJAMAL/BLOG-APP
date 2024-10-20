import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
  updateAdminStatus,
  blockUser,
  unblockUser
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
router.patch('/updateAdmin/:userId', updateAdminStatus);
router.patch('/block/:userId', blockUser);
router.patch('/unblock/:userId', unblockUser);
router.get('/getusers/:userId', getUsers);

export default router;