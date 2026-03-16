import React from "react";
import { FaMicrosoft, FaApple, FaGoogle } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Hồ Chí Minh, Việt Nam",
      openPositions: 10,
      icon: <FaMicrosoft />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      title: "Tesla",
      location: "Hà Nội, Việt Nam",
      openPositions: 5,
      icon: <SiTesla />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      gradient: "from-red-400 to-red-600",
    },
    {
      id: 3,
      title: "Apple",
      location: "Đà Nẵng, Việt Nam",
      openPositions: 20,
      icon: <FaApple />,
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      gradient: "from-gray-400 to-gray-700",
    },
    {
      id: 4,
      title: "Google",
      location: "Remote / Online",
      openPositions: 50,
      icon: <FaGoogle />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      gradient: "from-green-400 to-green-600",
    },
  ];

  return (
    <div className="companies bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Nhà tuyển dụng hàng đầu
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kết nối với những thương hiệu công nghệ lớn nhất thế giới
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((element, index) => (
            <div
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 cursor-pointer overflow-hidden border border-gray-100"
              key={element.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${element.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Card Content */}
              <div className="relative p-8 flex flex-col items-center text-center gap-4">
                {/* Icon */}
                <div className={`${element.bgColor} p-6 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <div className={`text-5xl ${element.color}`}>
                    {element.icon}
                  </div>
                </div>

                {/* Company Info */}
                <div className="space-y-2">
                  <h4 className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    {element.title}
                  </h4>
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {element.location}
                  </p>
                </div>

                {/* Positions Badge */}
                <div className="mt-2">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 font-bold text-sm px-5 py-2.5 rounded-full group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {element.openPositions} vị trí
                  </div>
                </div>

                {/* View Jobs Button */}
                <button className="mt-2 w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg group-hover:border-green-600 group-hover:text-green-600 transition-all duration-300">
                  Xem tin tuyển dụng
                </button>
              </div>

              {/* Bottom Accent Line */}
              <div className={`h-1.5 bg-gradient-to-r ${element.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-10 border border-green-200">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">
            Bạn là nhà tuyển dụng?
          </h4>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Đăng tin tuyển dụng miễn phí và tiếp cận hàng nghìn ứng viên chất lượng cao
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Đăng tin ngay →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;