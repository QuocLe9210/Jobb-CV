import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaBriefcase, FaUsers, FaUserClock, FaUserCheck } from "react-icons/fa"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0
  });

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigate("/");
    } else {
      axios.get("http://localhost:4000/api/v1/application/employer/stats", { withCredentials: true })
        .then((res) => {
          setStats(res.data.stats);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthorized, user]);

  // Dữ liệu cho biểu đồ
  const chartData = {
    labels: ['Đang chờ', 'Trúng tuyển', 'Từ chối', 'Khác'],
    datasets: [
      {
        data: [
          stats.pendingApplications, 
          stats.acceptedApplications, 
          stats.rejectedApplications,
          stats.totalApplications - (stats.pendingApplications + stats.acceptedApplications + stats.rejectedApplications)
        ],
        backgroundColor: [
          '#FBBF24', // Vàng (Pending)
          '#10B981', // Xanh lá (Accepted)
          '#EF4444', // Đỏ (Rejected)
          '#9CA3AF', // Xám
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="dashboard page py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tổng Quan Tuyển Dụng</h1>
        
        {/* KHU VỰC THẺ BÀI THỐNG KÊ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-2xl"><FaBriefcase /></div>
            <div>
              <p className="text-gray-500 text-sm">Tin Tuyển Dụng</p>
              <h3 className="text-2xl font-bold">{stats.totalJobs}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-full text-purple-600 text-2xl"><FaUsers /></div>
            <div>
              <p className="text-gray-500 text-sm">Tổng Ứng Viên</p>
              <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-yellow-500">
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 text-2xl"><FaUserClock /></div>
            <div>
              <p className="text-gray-500 text-sm">Cần Duyệt Gấp</p>
              <h3 className="text-2xl font-bold">{stats.pendingApplications}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-full text-green-600 text-2xl"><FaUserCheck /></div>
            <div>
              <p className="text-gray-500 text-sm">Đã Trúng Tuyển</p>
              <h3 className="text-2xl font-bold">{stats.acceptedApplications}</h3>
            </div>
          </div>
        </div>

        {/* KHU VỰC BIỂU ĐỒ & LỐI TẮT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Biểu đồ */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Tỉ Lệ Hồ Sơ</h3>
            <div className="w-64 mx-auto">
               <Doughnut data={chartData} />
            </div>
          </div>

          {/* Lối tắt nhanh */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Thao Tác Nhanh</h3>
            <div className="flex flex-col gap-4">
              <button onClick={() => navigate("/job/post")} className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Đăng Tin Mới Ngay</button>
              <button onClick={() => navigate("/applications/me")} className="bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">Xem Danh Sách Ứng Viên</button>
              <button onClick={() => navigate("/job/me")} className="bg-gray-600 text-white py-3 rounded hover:bg-gray-700 transition">Quản Lý Tin Đăng</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;