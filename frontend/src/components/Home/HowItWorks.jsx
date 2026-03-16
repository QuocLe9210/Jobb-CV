import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Tạo Tài Khoản",
      description: "Đăng ký tài khoản miễn phí dành cho Ứng viên hoặc Nhà tuyển dụng chỉ trong 30 giây.",
      color: "from-green-400 to-green-600"
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Tìm Việc / Đăng Tin",
      description: "Ứng viên tìm kiếm công việc theo ngành nghề. Nhà tuyển dụng đăng tin để thu hút nhân tài.",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Ứng Tuyển Ngay",
      description: "Gửi CV trực tiếp cho nhà tuyển dụng. Phỏng vấn và nhận việc ngay lập tức.",
      color: "from-purple-400 to-purple-600"
    }
  ];

  return (
    <div className="howItWorks bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Quy trình tuyển dụng
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Chỉ với 3 bước đơn giản, bạn đã có thể kết nối với hàng nghìn cơ hội việc làm
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 -z-10"></div>

          {steps.map((step, index) => (
            <div 
              key={step.id}
              className="relative group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-4 border-green-500 rounded-full flex items-center justify-center font-bold text-green-600 text-lg shadow-lg z-10">
                {step.id}
              </div>

              {/* Card */}
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white text-4xl">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {step.title}
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Bắt đầu ngay hôm nay
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;