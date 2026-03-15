import { Job } from "../models/jobSchema.js";

// --- 1. LẤY TẤT CẢ CÔNG VIỆC ---
export const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
};

// --- 2. ĐĂNG TIN TUYỂN DỤNG MỚI ---
export const postJob = async (req, res, next) => {
  try {
    const { role } = req.user;

    // Kiểm tra: Người tìm việc (Job Seeker) thì KHÔNG được đăng tin
    if (role === "Job Seeker") {
      return res.status(400).json({
        success: false,
        message: "Người tìm việc không được phép đăng tin tuyển dụng!",
      });
    }

    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;

    // Kiểm tra logic lương
    if (!title || !description || !category || !country || !city || !location) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin chi tiết công việc!",
      });
    }

    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập mức lương (Cố định hoặc Theo khoảng)!",
      });
    }

    if (salaryFrom && salaryTo && fixedSalary) {
      return res.status(400).json({
        success: false,
        message: "Chỉ được chọn một loại lương: Cố định HOẶC Theo khoảng!",
      });
    }

    // Tạo tin tuyển dụng
    const postedBy = req.user._id;
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });

    res.status(200).json({
      success: true,
      message: "Đăng tin tuyển dụng thành công!",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi Server",
      error: error.message,
    });
  }
};
// --- 3. LẤY CÔNG VIỆC CỦA TÔI (CHỈ CHO NHÀ TUYỂN DỤNG) ---
export const getMyJobs = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Người tìm việc không có quyền truy cập chức năng này!",
    });
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
};

// --- 4. SỬA CÔNG VIỆC ---
export const updateJob = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Người tìm việc không được phép sửa công việc!",
    });
  }

  const { id } = req.params; // Lấy ID công việc từ đường dẫn URL
  let job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy công việc!",
    });
  }

  // Cập nhật công việc
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Cập nhật công việc thành công!",
    job,
  });
};

// --- 5. XÓA CÔNG VIỆC ---
export const deleteJob = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return res.status(400).json({
      success: false,
      message: "Người tìm việc không được phép xóa công việc!",
    });
  }

  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy công việc!",
    });
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Đã xóa công việc!",
  });
};

// --- LẤY CHI TIẾT 1 CÔNG VIỆC ---
export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công việc này!",
      });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "ID không hợp lệ hoặc không tìm thấy công việc!",
    });
  }
};
