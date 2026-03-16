import express from "express";
import {
  employerGetAllApplications,
  jobSeekerGetAllApplications,
  jobSeekerDeleteApplication,
  postApplication,
  employerUpdateStatus,
  employerGetStats, // <--- 1. Import hàm mới
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Nhà tuyển dụng xem tất cả đơn ứng tuyển vào bài đăng của họ
router.get("/employer/getall", isAuthenticated, employerGetAllApplications);

// Người tìm việc xem tất cả đơn mình đã gửi
router.get("/jobseeker/getall", isAuthenticated, jobSeekerGetAllApplications);

// Người tìm việc xóa đơn (nếu lỡ gửi nhầm)
router.delete("/delete/:id", isAuthenticated, jobSeekerDeleteApplication);

// Nộp đơn ứng tuyển (Gửi CV)
router.post("/post", isAuthenticated, postApplication);

// Cập nhật trạng thái hồ sơ
router.put("/status/update/:id", isAuthenticated, employerUpdateStatus);

// 👇 2. ROUTE MỚI: LẤY THỐNG KÊ DASHBOARD
router.get("/employer/stats", isAuthenticated, employerGetStats);

export default router;
