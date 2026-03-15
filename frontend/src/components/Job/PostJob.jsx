import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  // 1. Fix lỗi React Warning: Chuyển kiểm tra Auth vào useEffect
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigate("/");
    }
  }, [isAuthorized, user, navigate]);

  const handleJobPost = async (e) => {
    e.preventDefault();
    
    // 2. Fix lỗi 500: Chỉ gửi dữ liệu cần thiết, KHÔNG gửi chuỗi rỗng cho trường số
    const jobData = {
      title,
      description,
      category,
      country,
      city,
      location,
    };

    if (salaryType === "Fixed Salary") {
      if (!fixedSalary) {
        toast.error("Vui lòng nhập mức lương cố định!");
        return;
      }
      jobData.fixedSalary = Number(fixedSalary); // Chuyển sang số cho chắc
    } else if (salaryType === "Ranged Salary") {
      if (!salaryFrom || !salaryTo) {
        toast.error("Vui lòng nhập đầy đủ khoảng lương (Từ - Đến)!");
        return;
      }
      jobData.salaryFrom = Number(salaryFrom);
      jobData.salaryTo = Number(salaryTo);
    } else {
      toast.error("Vui lòng chọn kiểu lương!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      navigate("/job/getall");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <section className="jobPost page py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">Đăng Tin Tuyển Dụng</h3>
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleJobPost} className="flex flex-col gap-5">
            
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tiêu đề công việc" className="flex-1 p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 p-3 border rounded outline-none focus:ring-2 focus:ring-green-500">
                <option value="">Chọn ngành nghề</option>
                <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                <option value="Lập trình Mobile">Lập trình Mobile</option>
                <option value="Lập trình Web">Lập trình Web</option>
                <option value="Phân tích dữ liệu">Phân tích dữ liệu</option>
                <option value="Trí tuệ nhân tạo">Trí tuệ nhân tạo</option>
                <option value="Tài chính">Tài chính</option>
                <option value="Video Animation">Video Animation</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Quốc gia" className="flex-1 p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Thành phố" className="flex-1 p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Địa chỉ cụ thể" className="w-full p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />

            <div className="salary_wrapper flex flex-col gap-4">
              <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)} className="w-full p-3 border rounded outline-none focus:ring-2 focus:ring-green-500">
                <option value="default">Chọn kiểu lương</option>
                <option value="Fixed Salary">Lương cố định</option>
                <option value="Ranged Salary">Lương theo khoảng</option>
              </select>
              
              {salaryType === "default" ? (
                <p className="text-red-500 text-sm italic">Vui lòng chọn kiểu lương *</p>
              ) : salaryType === "Fixed Salary" ? (
                <input type="number" placeholder="Nhập mức lương cố định" value={fixedSalary} onChange={(e) => setFixedSalary(e.target.value)} className="w-full p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />
              ) : (
                <div className="flex gap-4">
                  <input type="number" placeholder="Lương từ" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} className="flex-1 p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />
                  <input type="number" placeholder="Đến mức lương" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} className="flex-1 p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />
                </div>
              )}
            </div>

            <textarea rows="10" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả công việc chi tiết..." className="w-full p-3 border rounded outline-none focus:ring-2 focus:ring-green-500" />

            <button type="submit" className="bg-green-700 text-white font-bold py-3 px-6 rounded hover:bg-green-800 transition duration-300 shadow-md">
              Đăng Tuyển Dụng
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PostJob;