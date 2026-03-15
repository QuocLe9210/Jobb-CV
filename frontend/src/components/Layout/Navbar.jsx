import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx"; // Icon đóng menu (cần cài react-icons nếu chưa có)

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(data.message);
      setIsAuthorized(false);
      navigate("/login");
      setShow(false); // Đóng menu mobile nếu đang mở
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* --- LOGO --- */}
        <div className="text-2xl font-bold text-green-700 flex items-center gap-2">
          {/* Bạn có thể thêm thẻ img logo ở đây nếu muốn */}
          <Link to="/">
            Job<span className="text-black">Portal</span>
          </Link>
        </div>

        {/* --- MENU DESKTOP (Ẩn trên mobile) --- */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700 items-center">
          <li>
            <Link to={"/"} className="hover:text-green-700 transition">
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} className="hover:text-green-700 transition">
              Việc Làm
            </Link>
          </li>

          {isAuthorized ? (
            <>
              {/* MENU CHO NGƯỜI TÌM VIỆC */}
              {user && user.role === "Job Seeker" && (
                <>
                 <li>
                   <Link to={"/applications/me"} className="hover:text-green-700 transition">
                     Hồ Sơ Của Tôi
                   </Link>
                 </li>
                 <li>
                   <Link to={"/job/saved"} className="hover:text-green-700 transition">
                     Việc Đã Lưu
                   </Link>
                 </li>
                </>
              )}

              {/* MENU CHO NHÀ TUYỂN DỤNG */}
              {user && user.role === "Employer" && (
                <>
                  {/* 👇 LINK DASHBOARD MỚI (DESKTOP) */}
                  <li>
                    <Link to={"/employer/dashboard"} className="hover:text-green-700 transition font-bold text-blue-600">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/post"} className="hover:text-green-700 transition">
                      Đăng Tin
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/me"} className="hover:text-green-700 transition">
                      Việc Của Tôi
                    </Link>
                  </li>
                  <li>
                    <Link to={"/applications/me"} className="hover:text-green-700 transition">
                      Xem Ứng Viên
                    </Link>
                  </li>
                </>
              )}

              {/* NÚT ĐĂNG XUẤT */}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition shadow"
                >
                  Đăng Xuất
                </button>
              </li>
            </>
          ) : (
            /* MENU KHI CHƯA ĐĂNG NHẬP */
            <>
              <li>
                <Link to={"/login"} className="hover:text-green-700 transition">
                  Đăng Nhập
                </Link>
              </li>
              <li>
                <Link
                  to={"/register"}
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition shadow"
                >
                  Đăng Ký
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* --- NÚT BẬT MENU MOBILE --- */}
        <div className="md:hidden text-2xl cursor-pointer text-green-700" onClick={() => setShow(!show)}>
          {show ? <RxCross2 /> : <GiHamburgerMenu />}
        </div>
      </div>

      {/* --- MENU MOBILE (Hiện khi show = true) --- */}
      <div className={`${show ? "flex" : "hidden"} md:hidden flex-col bg-white border-t border-gray-200 absolute w-full left-0 top-full shadow-lg`}>
          <Link to={"/"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Trang Chủ</Link>
          <Link to={"/job/getall"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Việc Làm</Link>
          
          {isAuthorized ? (
            <>
              {user && user.role === "Job Seeker" && (
                <>
                 <Link to={"/applications/me"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Hồ Sơ Của Tôi</Link>
                 <Link to={"/job/saved"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Việc Đã Lưu</Link>
                </>
              )}
              {user && user.role === "Employer" && (
                <>
                  {/* 👇 LINK DASHBOARD MỚI (MOBILE) */}
                  <Link to={"/employer/dashboard"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center font-bold text-blue-600">Dashboard</Link>
                  <Link to={"/job/post"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Đăng Tin</Link>
                  <Link to={"/job/me"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Việc Của Tôi</Link>
                  <Link to={"/applications/me"} onClick={() => setShow(false)} className="p-4 border-b hover:bg-gray-50 text-center">Xem Ứng Viên</Link>
                </>
              )}
              <div className="p-4 text-center">
                <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded w-full">Đăng Xuất</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col p-4 gap-3">
               <Link to={"/login"} onClick={() => setShow(false)} className="text-center py-2 border rounded hover:bg-gray-100">Đăng Nhập</Link>
               <Link to={"/register"} onClick={() => setShow(false)} className="text-center py-2 bg-green-700 text-white rounded hover:bg-green-800">Đăng Ký</Link>
            </div>
          )}
      </div>
    </nav>
  );
};

export default Navbar;