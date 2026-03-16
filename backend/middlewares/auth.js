import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  // 1. Lấy token từ cookie
  const { token } = req.cookies;

  // 2. Nếu không có token -> Báo lỗi "Chưa đăng nhập"
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Người dùng chưa được xác thực (Vui lòng đăng nhập)!",
    });
  }

  // 3. Giải mã token để lấy ID người dùng
  try {
    // Đã sửa: Dùng đúng chuỗi bí mật "MERN_JOB_SECRET_123"
    const decoded = jwt.verify(token, "MERN_JOB_SECRET_123");

    // 4. Tìm user trong database và gắn vào req.user
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn!",
    });
  }
};
