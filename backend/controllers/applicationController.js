import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

// --- 1. NHÀ TUYỂN DỤNG XEM DANH SÁCH ĐƠN ---
export const employerGetAllApplications = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return res.status(400).json({
        success: false,
        message: "Người tìm việc không có quyền xem danh sách này!",
      });
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server khi lấy danh sách đơn!",
      error: error.message,
    });
  }
};

// --- 2. NGƯỜI TÌM VIỆC XEM ĐƠN ĐÃ GỬI ---
export const jobSeekerGetAllApplications = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return res.status(400).json({
        success: false,
        message: "Nhà tuyển dụng không có quyền xem danh sách này!",
      });
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server khi lấy danh sách đơn!",
      error: error.message,
    });
  }
};

// --- 3. NGƯỜI TÌM VIỆC XÓA ĐƠN ---
export const jobSeekerDeleteApplication = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return res.status(400).json({
        success: false,
        message: "Nhà tuyển dụng không có quyền xóa đơn!",
      });
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn ứng tuyển!",
      });
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Xóa đơn ứng tuyển thành công!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server khi xóa đơn!",
      error: error.message,
    });
  }
};

// --- 4. GỬI ĐƠN ỨNG TUYỂN ---
export const postApplication = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return res.status(400).json({
        success: false,
        message: "Nhà tuyển dụng không được phép nộp đơn!",
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng tải lên CV (Hồ sơ)!",
      });
    }

    const { resume } = req.files;
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedFormats.includes(resume.mimetype)) {
      return res.status(400).json({
        success: false,
        message:
          "Định dạng file không hợp lệ! Vui lòng dùng ảnh PNG, JPG, WEBP hoặc file PDF.",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath,
      { folder: "CVs" },
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi tải CV lên Cloudinary!",
      });
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };

    if (!jobId) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy công việc!" });
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Công việc không tồn tại!" });
    }

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    if (
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !applicantID ||
      !employerID ||
      !resume
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
    }

    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      jobId,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Nộp đơn ứng tuyển thành công!",
      application,
    });
  } catch (error) {
    console.log("Lỗi Post Application:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi Server nội bộ",
      error: error.message,
    });
  }
};

// --- 5. CẬP NHẬT TRẠNG THÁI ---
export const employerUpdateStatus = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return res.status(400).json({
        success: false,
        message: "Bạn không có quyền cập nhật trạng thái!",
      });
    }

    const { id } = req.params; // Lấy ID hồ sơ
    const { status } = req.body; // Lấy trạng thái mới gửi lên

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng chọn trạng thái!" });
    }

    const application = await Application.findById(id);
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn ứng tuyển!" });
    }

    // Cập nhật và lưu
    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công!",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server khi cập nhật trạng thái!",
      error: error.message,
    });
  }
};

// 👇 6. HÀM MỚI: LẤY THỐNG KÊ DASHBOARD (CHO EMPLOYER)
export const employerGetStats = async (req, res, next) => {
  try {
    const { role, _id } = req.user;
    if (role !== "Employer") {
      return res.status(400).json({
        success: false,
        message: "Chỉ Nhà tuyển dụng mới xem được thống kê!",
      });
    }

    // 1. Đếm tổng số bài đăng tuyển dụng
    const totalJobs = await Job.countDocuments({ postedBy: _id });

    // 2. Lấy tất cả đơn ứng tuyển
    const applications = await Application.find({ "employerID.user": _id });

    // 3. Tính toán chi tiết
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(
      (app) => app.status === "Pending",
    ).length;
    const acceptedApplications = applications.filter(
      (app) => app.status === "Accepted",
    ).length;
    const rejectedApplications = applications.filter(
      (app) => app.status === "Rejected",
    ).length;

    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        totalApplications,
        pendingApplications,
        acceptedApplications,
        rejectedApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server khi lấy thống kê!",
      error: error.message,
    });
  }
};
