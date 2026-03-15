import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/google-login",
        { token: credentialResponse.credential },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập Google thất bại!");
    }
  };

  if (isAuthorized) return <Navigate to={"/"} />;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Đăng Nhập</h1>
              <p className="text-gray-600">Chào mừng bạn quay lại hệ thống!</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                <div className="relative">
                  <FaRegUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500">
                    <option value="">Chọn vai trò</option>
                    <option value="Employer">Nhà Tuyển Dụng</option>
                    <option value="Job Seeker">Người Tìm Việc</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <MdOutlineMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input type="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                <div className="relative">
                  <RiLock2Fill className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent outline-none border border-gray-300 rounded-lg px-12 py-3 focus:ring-2 focus:ring-green-500" />
                </div>
                
                {/* 👇 DÒNG LINK QUÊN MẬT KHẨU MỚI THÊM VÀO */}
                <div className="flex justify-end mt-2">
                  <Link to="/password/forgot" className="text-sm text-green-600 hover:underline font-medium">
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>

              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300">
                Đăng Nhập
              </button>

              <div className="flex flex-col items-center gap-3 mt-4">
                <span className="text-gray-400 text-sm">HOẶC</span>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Đăng nhập Google thất bại!")}
                  useOneTap
                  theme="filled_blue"
                  shape="pill"
                  width="100%"
                />
              </div>

              <p className="text-center text-gray-600">
                Chưa có tài khoản? <Link to="/register" className="text-green-600 hover:underline font-semibold">Đăng Ký Ngay</Link>
              </p>
            </form>
          </div>

          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-500 to-green-700 items-center justify-center p-12">
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-6xl font-bold text-white mb-2">Job<span className="text-green-200">Portal</span></h2>
                <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
              </div>
              <div className="text-white text-8xl mb-6">💼</div>
              <p className="text-white text-xl font-light">Kết nối nhà tuyển dụng và ứng viên</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;