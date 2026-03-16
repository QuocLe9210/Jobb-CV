import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { FaFilePdf } from "react-icons/fa6"; 

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigate("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prev) =>
            prev.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // 👇 HÀM XỬ LÝ CẬP NHẬT TRẠNG THÁI (CHO EMPLOYER)
  const handleUpdateStatus = async (id, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/application/status/update/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success(data.message);
      // Cập nhật lại UI ngay lập tức
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: status } : app
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-green-700 mb-10">
          {user && user.role === "Job Seeker"
            ? "Đơn Ứng Tuyển Của Tôi"
            : "Quản Lý Ứng Viên"}
        </h3>
        
        {applications.length <= 0 ? (
          <div className="text-center">
            <h4 className="text-xl text-gray-500">Chưa có đơn ứng tuyển nào!</h4>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((element) => {
              // Tùy theo vai trò mà hiển thị Card tương ứng
              if (user.role === "Job Seeker") {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                );
              } else {
                return (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                    handleUpdateStatus={handleUpdateStatus} // Truyền hàm xuống
                  />
                );
              }
            })}
          </div>
        )}
        
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default MyApplications;

// --- COMPONENT 1: THẺ DÀNH CHO NGƯỜI TÌM VIỆC (CHỈ XEM, KHÔNG SỬA STATUS) ---
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const isPdf = element.resume.url.toLowerCase().includes(".pdf");

  // Màu sắc badge trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Reviewing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Interview": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Accepted": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Tên hiển thị trạng thái
  const getStatusText = (status) => {
    switch (status) {
      case "Pending": return "⏳ Đang chờ";
      case "Reviewing": return "👀 Đang xem xét";
      case "Interview": return "🗣️ Phỏng vấn";
      case "Accepted": return "✅ Trúng tuyển";
      case "Rejected": return "❌ Từ chối";
      default: return "Đang chờ";
    }
  };

  return (
    <div className="job_seeker_card bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start justify-between gap-4 border border-gray-200">
      <div className="detail flex-1 space-y-2">
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">Họ tên:</span> <span>{element.name}</span></p>
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">Email:</span> <span>{element.email}</span></p>
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">SĐT:</span> <span>{element.phone}</span></p>
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">Địa chỉ:</span> <span>{element.address}</span></p>
        
        {/* HIỂN THỊ TRẠNG THÁI */}
        <div className="mt-3">
             <span className="font-bold text-gray-700 mr-2">Trạng thái:</span>
             <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(element.status)}`}>
                 {getStatusText(element.status)}
             </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-3">
           <span className="font-bold text-gray-700 block mb-2">Thư giới thiệu:</span>
           <p className="text-gray-600 text-sm leading-relaxed">{element.coverLetter}</p>
        </div>
      </div>
      
      <div className="resume flex flex-col gap-3 items-center min-w-[150px]">
        {isPdf ? (
          <a href={element.resume.url} target="_blank" rel="noopener noreferrer" className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition text-gray-500 bg-gray-50 cursor-pointer">
            <FaFilePdf className="text-5xl mb-3" /> <span className="text-sm font-bold">Xem PDF</span>
          </a>
        ) : (
          <div className="relative w-40 h-40 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition overflow-hidden group" onClick={() => openModal(element.resume.url)}>
            <img src={element.resume.url} alt="resume" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center"><span className="text-xs text-white font-bold bg-black bg-opacity-50 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">Phóng to</span></div>
          </div>
        )}
        <button onClick={() => deleteApplication(element._id)} className="bg-red-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-red-700 transition w-full text-sm">Xóa Đơn</button>
      </div>
    </div>
  );
};

// --- COMPONENT 2: THẺ DÀNH CHO NHÀ TUYỂN DỤNG (CÓ QUYỀN SỬA STATUS) ---
const EmployerCard = ({ element, openModal, handleUpdateStatus }) => {
  const isPdf = element.resume.url.toLowerCase().includes(".pdf");

  return (
    <div className="job_seeker_card bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start justify-between gap-4 border-l-4 border-green-500">
      <div className="detail flex-1 space-y-2">
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">Ứng viên:</span> <span>{element.name}</span></p>
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">Email:</span> <span>{element.email}</span></p>
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">SĐT:</span> <span>{element.phone}</span></p>
        <p className="flex flex-col sm:flex-row gap-1 sm:gap-4"><span className="font-bold text-gray-700 min-w-[80px]">Địa chỉ:</span> <span>{element.address}</span></p>

        {/* DROPDOWN CHỌN TRẠNG THÁI */}
        <div className="mt-3 bg-blue-50 p-3 rounded-lg inline-block border border-blue-100">
             <span className="font-bold text-blue-800 mr-2">Cập nhật trạng thái:</span>
             <select 
                className="border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={element.status || "Pending"}
                onChange={(e) => handleUpdateStatus(element._id, e.target.value)}
             >
                <option value="Pending">🕒 Đang chờ</option>
                <option value="Reviewing">👀 Đang xem xét</option>
                <option value="Interview">🗣️ Phỏng vấn</option>
                <option value="Accepted">✅ Trúng tuyển</option>
                <option value="Rejected">❌ Từ chối</option>
             </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-3">
           <span className="font-bold text-gray-700 block mb-2">Thư giới thiệu:</span>
           <p className="text-gray-600 text-sm leading-relaxed">{element.coverLetter}</p>
        </div>
      </div>
      
      <div className="resume flex flex-col gap-3 items-center min-w-[150px]">
        {isPdf ? (
          <a href={element.resume.url} target="_blank" rel="noopener noreferrer" className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition text-gray-500 bg-gray-50 cursor-pointer">
            <FaFilePdf className="text-5xl mb-3" /> <span className="text-sm font-bold">Xem PDF</span>
          </a>
        ) : (
          <div className="relative w-40 h-40 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition overflow-hidden group" onClick={() => openModal(element.resume.url)}>
            <img src={element.resume.url} alt="resume" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center"><span className="text-xs text-white font-bold bg-black bg-opacity-50 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">Phóng to</span></div>
          </div>
        )}
      </div>
    </div>
  );
};