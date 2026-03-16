import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js"; // Import gửi mail
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto"; // Import crypto để xử lý mã reset

// Client ID của bạn
const client = new OAuth2Client(
  "606925811499-o8pqqonl1t2hksudphkavlugokvqoan1.apps.googleusercontent.com",
);

// --- 1. ĐĂNG KÝ ---
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email này đã được sử dụng!" });
    }
    const user = await User.create({ name, email, phone, password, role });
    sendToken(user, 201, res, "Đăng ký thành công!");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi Server", error: error.message });
  }
};

// --- 2. ĐĂNG NHẬP ---
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Email hoặc Mật khẩu không đúng!" });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Email hoặc Mật khẩu không đúng!" });
    }
    if (user.role !== role) {
      return res.status(400).json({
        success: false,
        message: `Không tìm thấy người dùng với vai trò là ${role}!`,
      });
    }
    sendToken(user, 200, res, "Đăng nhập thành công!");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi Server", error: error.message });
  }
};

// --- 3. ĐĂNG XUẤT ---
export const logout = async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({ success: true, message: "Đăng xuất thành công!" });
};

// --- 4. LẤY THÔNG TIN USER ---
export const getUser = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
};

// --- 5. ĐĂNG NHẬP GOOGLE ---
export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "606925811499-o8pqqonl1t2hksudphkavlugokvqoan1.apps.googleusercontent.com",
    });
    const { name, email } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      user = await User.create({
        name,
        email,
        phone: "0999999999",
        password: randomPassword,
        role: "Job Seeker",
      });
    }
    sendToken(user, 200, res, "Đăng nhập Google thành công!");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi xác thực Google",
      error: error.message,
    });
  }
};

// --- 6. QUÊN MẬT KHẨU (Gửi Email) ---
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy người dùng với Email này!",
    });
  }

  // Lấy token reset từ model
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Link reset mật khẩu (Frontend)
  const resetUrl = `http://localhost:5173/password/reset/${resetToken}`;

  const message = `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng truy cập vào đường dẫn dưới đây để tạo mật khẩu mới:\n\n${resetUrl}\n\nNếu bạn không yêu cầu, hãy bỏ qua email này.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "JobPortal - Khôi phục mật khẩu",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email khôi phục đã được gửi tới ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: "Không thể gửi Email!",
      error: error.message,
    });
  }
};

// --- 7. ĐẶT LẠI MẬT KHẨU MỚI ---
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;

  // Mã hóa token từ URL để so sánh với token trong DB
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Mã khôi phục không hợp lệ hoặc đã hết hạn!",
    });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu xác nhận không khớp!" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res, "Đặt lại mật khẩu thành công!");
};

// 👇 1. HÀM MỚI: LƯU / BỎ LƯU CÔNG VIỆC
export const toggleJobSave = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(req.user.id);

    // Kiểm tra xem job này đã có trong danh sách chưa
    const isSaved = user.savedJobs.some((jobId) => jobId.toString() === id);

    if (isSaved) {
      // Nếu có rồi thì xóa đi (Bỏ lưu)
      user.savedJobs = user.savedJobs.filter(
        (jobId) => jobId.toString() !== id,
      );
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Đã bỏ lưu công việc!" });
    } else {
      // Nếu chưa thì thêm vào (Lưu)
      user.savedJobs.push(id);
      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "Đã lưu công việc thành công!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi Server", error: error.message });
  }
};

// 👇 2. HÀM MỚI: LẤY DANH SÁCH VIỆC ĐÃ LƯU
export const getSavedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("savedJobs");
    res.status(200).json({
      success: true,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi Server", error: error.message });
  }
};
