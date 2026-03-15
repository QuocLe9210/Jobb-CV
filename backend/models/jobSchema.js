import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Vui lòng nhập tiêu đề công việc!"],
    minLength: [3, "Tiêu đề phải có ít nhất 3 ký tự!"],
    maxLength: [100, "Tiêu đề không được vượt quá 100 ký tự!"], // Tăng lên 100 cho thoải mái
  },
  description: {
    type: String,
    required: [true, "Vui lòng nhập mô tả công việc!"],
    minLength: [10, "Mô tả phải có ít nhất 10 ký tự!"],
    maxLength: [5000, "Mô tả không được vượt quá 5000 ký tự!"], // 👈 SỬA Ở ĐÂY: Tăng từ 350 lên 5000
  },
  category: {
    type: String,
    required: [true, "Vui lòng chọn danh mục công việc!"],
  },
  country: {
    type: String,
    required: [true, "Vui lòng nhập quốc gia!"],
  },
  city: {
    type: String,
    required: [true, "Vui lòng nhập thành phố!"],
  },
  location: {
    type: String,
    required: [true, "Vui lòng nhập địa chỉ cụ thể!"],
    minLength: [5, "Địa chỉ phải có ít nhất 5 ký tự!"],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Lương cố định phải ít nhất 1000!"],
    max: [999999999, "Lương quá lớn!"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Lương từ... phải ít nhất 1000!"],
    max: [999999999, "Lương quá lớn!"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Lương đến... phải ít nhất 1000!"],
    max: [999999999, "Lương quá lớn!"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
