import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  // Handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  const { id } = useParams(); // Lấy ID công việc từ URL

  const handleApplication = async (e) => {
    e.preventDefault();
    
    // Tạo FormData để gửi dữ liệu bao gồm cả file
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigate("/job/getall"); // Nộp xong thì quay về danh sách việc làm
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Nếu chưa đăng nhập hoặc là Nhà tuyển dụng thì không được vào trang này
  if (!isAuthorized || (user && user.role === "Employer")) {
    navigate("/");
  }

  return (
    <section className="application bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-center text-green-700 mb-6 uppercase">
            Đơn Ứng Tuyển
          </h3>
          <form onSubmit={handleApplication} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
               <label className="font-semibold text-gray-700">Họ và Tên</label>
               <input type="text" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Email liên hệ</label>
                <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Số điện thoại</label>
                <input type="number" placeholder="0901234567" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Địa chỉ</label>
                <input type="text" placeholder="Hồ Chí Minh, Việt Nam" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Thư giới thiệu (Cover Letter)</label>
                <textarea rows="5" placeholder="Tại sao bạn phù hợp với vị trí này..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-700">Tải lên CV (Ảnh/PDF)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                  <input type="file" accept=".pdf, .jpg, .png, .webp" onChange={handleFileChange} className="w-full" />
                </div>
            </div>

            <button type="submit" className="bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition duration-300 mt-4">
              Gửi Hồ Sơ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;