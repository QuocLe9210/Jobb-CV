import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null); // ID của job đang sửa
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  // Lấy danh sách job của tôi
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchMyJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/");
  }

  // Hàm bật chế độ sửa
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Hàm tắt chế độ sửa
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Hàm cập nhật job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Hàm xóa job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Hàm xử lý khi gõ vào ô input lúc sửa
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">Việc Làm Đã Đăng</h3>
        {myJobs.length <= 0 ? (
           <h4 className="text-center text-xl text-gray-500">Bạn chưa đăng tin tuyển dụng nào!</h4>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myJobs.map((element) => (
              <div className="card bg-white p-6 rounded-lg shadow-md border border-gray-200" key={element._id}>
                <div className="content space-y-3">
                  
                  {/* Tiêu đề */}
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-gray-600 text-sm">Tiêu đề:</span>
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.title}
                      onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                      className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500 ring-1 ring-green-500" : "bg-gray-100"}`}
                    />
                  </div>

                  {/* Quốc gia & Thành phố */}
                  <div className="flex gap-2">
                    <div className="w-1/2">
                       <span className="font-bold text-gray-600 text-sm">Quốc gia:</span>
                       <input type="text" disabled={editingMode !== element._id} value={element.country} onChange={(e) => handleInputChange(element._id, "country", e.target.value)} className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500" : "bg-gray-100"}`} />
                    </div>
                    <div className="w-1/2">
                       <span className="font-bold text-gray-600 text-sm">Thành phố:</span>
                       <input type="text" disabled={editingMode !== element._id} value={element.city} onChange={(e) => handleInputChange(element._id, "city", e.target.value)} className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500" : "bg-gray-100"}`} />
                    </div>
                  </div>

                  {/* Ngành nghề */}
                  <div>
                    <span className="font-bold text-gray-600 text-sm">Ngành nghề:</span>
                    <select value={element.category} onChange={(e) => handleInputChange(element._id, "category", e.target.value)} disabled={editingMode !== element._id} className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500" : "bg-gray-100"}`}>
                        <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                        <option value="Lập trình Mobile">Lập trình Mobile</option>
                        <option value="Lập trình Web">Lập trình Web</option>
                        <option value="Phân tích dữ liệu">Phân tích dữ liệu</option>
                        <option value="Trí tuệ nhân tạo">Trí tuệ nhân tạo</option>
                        <option value="Tài chính">Tài chính</option>
                        <option value="Video Animation">Video Animation</option>
                    </select>
                  </div>

                  {/* Lương */}
                  <div>
                     <span className="font-bold text-gray-600 text-sm">Lương:</span>
                     {element.fixedSalary ? (
                       <input type="number" disabled={editingMode !== element._id} value={element.fixedSalary} onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)} className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500" : "bg-gray-100"}`} />
                     ) : (
                       <div className="flex gap-2">
                          <input type="number" disabled={editingMode !== element._id} value={element.salaryFrom} onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)} className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500" : "bg-gray-100"}`} />
                          <input type="number" disabled={editingMode !== element._id} value={element.salaryTo} onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)} className={`p-2 border rounded w-full ${editingMode === element._id ? "bg-white border-green-500" : "bg-gray-100"}`} />
                       </div>
                     )}
                  </div>

                   {/* Mô tả - Đã Hết Hạn */}
                   <div className="flex gap-2 justify-between">
                      <div className="flex items-center gap-2">
                         <span className="font-bold text-gray-600 text-sm">Đã hết hạn:</span>
                         <select value={element.expired} onChange={(e) => handleInputChange(element._id, "expired", e.target.value)} disabled={editingMode !== element._id} className={`p-1 border rounded ${editingMode === element._id ? "bg-white" : "bg-gray-100"}`}>
                           <option value={true}>Rồi</option>
                           <option value={false}>Chưa</option>
                         </select>
                      </div>
                   </div>
                </div>

                {/* Các nút bấm hành động */}
                <div className="button_wrapper flex justify-between mt-6 pt-4 border-t">
                  <div className="edit_btn_wrapper flex gap-2">
                    {editingMode === element._id ? (
                      <>
                        <button onClick={() => handleUpdateJob(element._id)} className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-700"><FaCheck /> Lưu</button>
                        <button onClick={() => handleDisableEdit()} className="bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600"><RxCross2 /> Hủy</button>
                      </>
                    ) : (
                      <button onClick={() => handleEnableEdit(element._id)} className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 font-bold">Sửa</button>
                    )}
                  </div>
                  <button onClick={() => handleDeleteJob(element._id)} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 font-bold">Xóa</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;