import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên của bạn!"],
    minLength: [3, "Tên phải có ít nhất 3 ký tự!"],
    maxLength: [30, "Tên không được vượt quá 30 ký tự!"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Vui lòng nhập đúng định dạng Email!"],
    required: [true, "Vui lòng nhập Email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Vui lòng nhập thư giới thiệu (Cover Letter)!"],
  },
  phone: {
    type: Number,
    required: [true, "Vui lòng nhập số điện thoại!"],
  },
  address: {
    type: String,
    required: [true, "Vui lòng nhập địa chỉ!"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId, // Lưu ID của công việc
    ref: "Job",
    required: true,
  },
  // 👇 THÊM TRƯỜNG TRẠNG THÁI (STATUS)
  status: {
    type: String,
    enum: ["Pending", "Reviewing", "Interview", "Accepted", "Rejected"],
    default: "Pending",
  },
});

export const Application = mongoose.model("Application", applicationSchema);
