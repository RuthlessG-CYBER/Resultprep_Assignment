import express from "express";
import { register, login } from "../controller/auth.controller.js";
import { getAllUsers, deleteUser } from "../controller/user.controller.js";
import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
} from "../controller/task.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";


const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);

// User
router.get("/users", getAllUsers);

// User Task
router.post("/tasks", verifyToken, createTask);
router.get("/tasks", verifyToken, getAllTasks);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, deleteTask);

// Admin Task
router.delete("/admin/users/:id", verifyToken, isAdmin, deleteUser);




export default router;
