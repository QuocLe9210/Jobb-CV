import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên của bạn!"],
    minLength: [3, "Tên phải có ít nhất 3 ký tự!"],
    maxLength: [100, "Tên không được vượt quá 100 ký tự!"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng nhập Email!"],
    validate: [validator.isEmail, "Vui lòng nhập đúng định dạng Email!"],
  },
  phone: {
    type: String,
    required: [true, "Vui lòng nhập số điện thoại!"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu!"],
    minLength: [8, "Mật khẩu phải có ít nhất 8 ký tự!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Vui lòng chọn vai trò!"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // 👇 THÊM TRƯỜNG LƯU CÔNG VIỆC
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, "MERN_JOB_SECRET_123", {
    expiresIn: "7d",
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
