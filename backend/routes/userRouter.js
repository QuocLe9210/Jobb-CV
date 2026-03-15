import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  toggleJobSave, // <--- 1. Bổ sung cái này
  getSavedJobs, // <--- 2. Bổ sung cái này
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Đăng ký - Đăng nhập
router.post("/register", register);
router.post("/login", login);
router.post("/google-login", googleLogin);

// --- QUÊN MẬT KHẨU ---
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Tiện ích
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

// 👇 ROUTE CHO TÍNH NĂNG LƯU VIỆC
router.post("/job/save", isAuthenticated, toggleJobSave);
router.get("/job/saved", isAuthenticated, getSavedJobs);

export default router;
