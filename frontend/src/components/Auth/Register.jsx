import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) return <Navigate to={"/"} />;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Form Đăng Ký */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Tạo Tài Khoản
              </h1>
              <p className="text-gray-600">Bắt đầu hành trình tìm việc của bạn!</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Vai trò */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò
                </label>
                <div className="relative">
                  <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="Employer">Nhà Tuyển Dụng</option>
                    <option value="Job Seeker">Người Tìm Việc</option>
                  </select>
                </div>
              </div>

              {/* Họ và Tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và Tên
                </label>
                <div className="relative">
                  <FaPencilAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="email"
                    placeholder="abc@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <FaPhoneFlip className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="0123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <RiLock2Fill className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="password"
                    placeholder="Mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Đăng Ký Ngay
              </button>

              <p className="text-center text-gray-600">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-green-600 hover:underline font-semibold">
                  Đăng Nhập
                </Link>
              </p>
            </form>
          </div>

          {/* Banner Image (Chỉ hiện trên máy tính) */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-500 to-green-700 items-center justify-center p-12">
            <div className="text-center">
              {/* Logo JobPortal */}
              <div className="mb-8">
                <h2 className="text-6xl font-bold text-white mb-2">
                  Job<span className="text-green-200">Portal</span>
                </h2>
                <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
              </div>
              
              {/* Icon */}
              <div className="text-white text-8xl mb-6">
                🚀
              </div>
              
              <p className="text-white text-xl font-light">
                Khởi đầu sự nghiệp mơ ước của bạn
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;