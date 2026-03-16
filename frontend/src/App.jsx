import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./main";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// --- IMPORT CÁC COMPONENT ---
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob"; 
import MyJobs from "./components/Job/MyJobs";   

import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";

// 👇 IMPORT MỚI: Component Việc đã lưu & Dashboard
import SavedJobs from "./components/Job/SavedJobs";
import Dashboard from "./components/Home/Dashboard";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  // Hàm tự động check đăng nhập khi tải lại trang (F5)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      {/* Navbar luôn nằm trên cùng */}
      <Navbar />

      <Routes>
        {/* --- KHU VỰC ĐĂNG NHẬP/ĐĂNG KÝ --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* --- TRANG CHỦ --- */}
        <Route path="/" element={<Home />} />
        
        {/* --- KHU VỰC VIỆC LÀM (CHUNG) --- */}
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        
        {/* 👇 ROUTE MỚI: VIỆC ĐÃ LƯU */}
        <Route path="/job/saved" element={<SavedJobs />} />
        
        {/* --- KHU VỰC NHÀ TUYỂN DỤNG (EMPLOYER) --- */}
        <Route path="/job/post" element={<PostJob />} />  {/* Đăng tin tuyển dụng */}
        <Route path="/job/me" element={<MyJobs />} />     {/* Quản lý các tin đã đăng */}
        <Route path="/employer/dashboard" element={<Dashboard />} /> {/* Dashboard thống kê */}

        {/* --- KHU VỰC ỨNG VIÊN (JOB SEEKER) --- */}
        <Route path="/application/:id" element={<Application />} /> {/* Nộp đơn ứng tuyển */}
        <Route path="/applications/me" element={<MyApplications />} /> {/* Xem hồ sơ đã nộp */}

        {/* --- KHU VỰC QUÊN MẬT KHẨU --- */}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>

      {/* Footer luôn nằm dưới cùng */}
      <Footer />
      
      {/* Toaster để hiển thị thông báo (Thành công/Thất bại) */}
      <Toaster />
    </BrowserRouter>
  );
};

export default App;