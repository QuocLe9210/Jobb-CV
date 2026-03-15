import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import Icon
import toast from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const { isAuthorized, user, setUser } = useContext(Context);
  const [saved, setSaved] = useState(false); // State lưu trạng thái tim

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((err) => {
        navigate("/notfound");
      });

    // Kiểm tra xem job này đã được lưu chưa (nếu user đã đăng nhập)
    if (user && user.savedJobs && user.savedJobs.includes(id)) {
      setSaved(true);
    }
  }, [id, user]);

  const handleSaveJob = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/job/save",
        { id },
        { withCredentials: true }
      );
      toast.success(data.message);
      setSaved(!saved); // Đổi trạng thái icon
      
      // Cập nhật lại user context để đồng bộ (nếu cần thiết)
      // fetchUser() hoặc cập nhật tay mảng savedJobs của user
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi lưu tin");
    }
  };

  if (!isAuthorized) {
    navigate("/login");
  }

  return (
    <section className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-50 shadow-lg rounded-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            {job.title}
          </h2>

          {/* ... (Giữ nguyên phần hiển thị thông tin job như cũ) ... */}
          <div className="space-y-4">
             {/* Copy lại các thẻ p hiển thị category, country, salary... từ file cũ của bạn vào đây */}
             <p className="flex justify-between"><span className="font-bold text-gray-700">Ngành nghề:</span> <span>{job.category}</span></p>
             <p className="flex justify-between"><span className="font-bold text-gray-700">Địa điểm:</span> <span>{job.country}, {job.city}</span></p>
             <p className="flex justify-between"><span className="font-bold text-gray-700">Lương:</span> <span>{job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`} VNĐ</span></p>
             <p className="flex justify-between"><span className="font-bold text-gray-700">Mô tả:</span> <span>{job.description}</span></p>
          </div>

          {/* KHU VỰC NÚT BẤM */}
          {user && user.role === "Employer" ? (
            <div className="mt-8 text-center">
              <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded cursor-not-allowed" disabled>
                Nhà tuyển dụng không thể ứng tuyển
              </button>
            </div>
          ) : (
            <div className="mt-8 flex justify-center gap-4">
              <Link 
                to={`/application/${job._id}`} 
                className="bg-green-700 text-white font-bold py-3 px-8 rounded hover:bg-green-800 transition duration-300 shadow-md"
              >
                Ứng Tuyển Ngay
              </Link>

              {/* 👇 NÚT THẢ TIM MỚI */}
              <button 
                onClick={handleSaveJob}
                className={`flex items-center gap-2 px-6 py-3 rounded font-bold border transition duration-300 ${
                  saved 
                    ? "bg-red-50 text-red-600 border-red-200" 
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {saved ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                {saved ? "Đã Lưu" : "Lưu Tin"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;