import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaSearch } from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  // --- CÁC BIẾN STATE ĐỂ LƯU TỪ KHÓA TÌM KIẾM ---
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigate("/");
  }

  // --- HÀM LỌC VIỆC LÀM (LOGIC CHÍNH) ---
  // Hàm này sẽ chạy mỗi khi dữ liệu nhập vào thay đổi để lọc danh sách "jobs" gốc
  const filteredJobs = jobs.filter((job) => {
    // 1. Lọc theo tên công việc (không phân biệt hoa thường)
    const matchesTitle = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Lọc theo ngành nghề (nếu có chọn)
    const matchesCategory = category ? job.category === category : true;

    // 3. Lọc theo thành phố (nếu có nhập)
    const matchesCity = city ? job.city.toLowerCase().includes(city.toLowerCase()) : true;

    return matchesTitle && matchesCategory && matchesCity;
  });

  return (
    <section className="jobs page bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase">
          Tất cả việc làm
        </h1>

        {/* --- KHUNG TÌM KIẾM & LỌC --- */}
        <div className="search-bar bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Ô tìm kiếm từ khóa */}
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="Tìm kiếm công việc (VD: ReactJS)..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full p-3 pl-10 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
               />
               <FaSearch className="absolute top-4 left-3 text-gray-400" />
            </div>

            {/* 2. Ô chọn ngành nghề */}
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
                <option value="">Tất cả ngành nghề</option>
                <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                <option value="Lập trình Mobile">Lập trình Mobile</option>
                <option value="Lập trình Web">Lập trình Web</option>
                <option value="Phân tích dữ liệu">Phân tích dữ liệu</option>
                <option value="Trí tuệ nhân tạo">Trí tuệ nhân tạo</option>
                <option value="Tài chính">Tài chính</option>
                <option value="Video Animation">Video Animation</option>
            </select>

            {/* 3. Ô tìm kiếm thành phố */}
            <select 
               value={city} 
               onChange={(e) => setCity(e.target.value)}
               className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
                <option value="">Tất cả địa điểm</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                {/* Bạn có thể thêm các thành phố khác hoặc đổi thành input text để nhập tự do */}
            </select>

          </div>
        </div>

        {/* --- HIỂN THỊ DANH SÁCH VIỆC LÀM SAU KHI LỌC --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className="card bg-white p-6 rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between" key={element._id}>
                  <div>
                    <h4 className="text-xl font-bold text-green-700 mb-2 truncate" title={element.title}>{element.title}</h4>
                    <p className="text-gray-600 mb-1 font-medium">{element.category}</p>
                    <p className="text-gray-500 text-sm mb-4">{element.country}, {element.city}</p>
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded mb-4">
                       <span className="text-sm font-semibold text-gray-700">Lương:</span>
                       <span className="text-sm font-bold text-green-600">
                          {element.fixedSalary ? element.fixedSalary.toLocaleString() : `${element.salaryFrom.toLocaleString()} - ${element.salaryTo.toLocaleString()}`} VNĐ
                       </span>
                    </div>
                  </div>
                  <Link 
                    to={`/job/${element._id}`} 
                    className="block text-center bg-green-100 text-green-700 font-bold py-2 rounded hover:bg-green-700 hover:text-white transition"
                  >
                    Xem Chi Tiết
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-500">Không tìm thấy công việc nào phù hợp! 😞</p>
              <button 
                onClick={() => {setSearchQuery(""); setCategory(""); setCity("")}} 
                className="mt-4 text-green-700 font-bold underline hover:text-green-800"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;