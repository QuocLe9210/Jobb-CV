import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  
  // Nếu chưa đăng nhập thì ẩn Footer đi cho gọn (hoặc để hiện cũng được tùy bạn)
  if (!isAuthorized) return null;

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          &copy; 2026 Bản quyền thuộc về <strong>JobPortal</strong>.
        </div>
        <div className="flex space-x-6 text-xl">
          <Link to={"/"} className="hover:text-green-500 transition"><FaFacebookF /></Link>
          <Link to={"/"} className="hover:text-red-500 transition"><FaYoutube /></Link>
          <Link to={"/"} className="hover:text-blue-500 transition"><FaLinkedin /></Link>
          <Link to={"/"} className="hover:text-pink-500 transition"><RiInstagramFill /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;