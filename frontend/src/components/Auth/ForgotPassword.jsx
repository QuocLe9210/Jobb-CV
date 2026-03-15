import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/password/forgot",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Quên Mật Khẩu</h2>
        <p className="text-gray-600 text-center mb-6 text-sm">
          Nhập địa chỉ Email đã đăng ký của bạn. Chúng tôi sẽ gửi một đường dẫn để đặt lại mật khẩu.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email của bạn</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition disabled:bg-gray-400"
          >
            {loading ? "Đang gửi..." : "Gửi Email Khôi Phục"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-green-700 hover:underline text-sm font-medium">
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;