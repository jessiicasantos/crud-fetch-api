import express from "express";
import { getUsers, addUser, updateUser, deleteUser } from '../controllers/user.js';

// 1) create a router as a module
const router = express.Router()

// 2)  Define the homepage and get function from controller
router.get('/', getUsers);

router.post('/create-user', addUser);

router.put(`/:id`, updateUser);

router.delete('/:id', deleteUser);

export default router;