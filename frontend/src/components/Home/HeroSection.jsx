import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Việc làm đang tuyển",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Công ty hàng đầu",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Ứng viên tài năng",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Nhà tuyển dụng uy tín",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Text Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Tìm công việc <br className="hidden md:block" /> 
              phù hợp với{" "}
              <span className="text-green-600 relative">
                đam mê
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4C50 2 150 2 200 4" stroke="#16a34a" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br className="hidden md:block" /> của bạn
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto md:mx-0">
              Hàng nghìn cơ hội việc làm hấp dẫn đang chờ đón bạn. Kết nối ngay với
              những nhà tuyển dụng hàng đầu để phát triển sự nghiệp vững chắc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                Tìm việc ngay
              </button>
              <button className="bg-white hover:bg-gray-50 text-green-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-2 border-green-600">
                Đăng tuyển dụng
              </button>
            </div>
          </div>

          {/* Image - OPTION 1: Illustration với icon */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative w-full max-w-md">
              {/* Decorative circles */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              {/* Icon Illustration thay vì ảnh */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-12 transform hover:scale-105 transition duration-500">
                <div className="text-center space-y-6">
                  <div className="text-8xl">💼</div>
                  <div className="flex justify-center gap-4">
                    <div className="text-5xl animate-bounce">👨‍💼</div>
                    <div className="text-5xl animate-bounce animation-delay-2000">👩‍💼</div>
                  </div>
                  <div className="text-3xl">🤝</div>
                  <div className="text-green-600 font-bold text-xl">
                    Kết nối cơ hội
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OPTION 2: Gradient Card với SVG Pattern (bỏ comment để dùng)
          <div className="flex-1 flex justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-2xl p-16 transform hover:scale-105 transition duration-500 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                <div className="relative text-white text-center space-y-6">
                  <div className="text-7xl mb-4">🎯</div>
                  <h3 className="text-3xl font-bold">Job Portal</h3>
                  <p className="text-lg opacity-90">Nền tảng tuyển dụng #1</p>
                  <div className="flex justify-center gap-3 mt-8">
                    <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm">
                      1000+ Jobs
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-full px-4 py-2 text-sm">
                      500+ Companies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          */}

          {/* OPTION 3: Unsplash placeholder (bỏ comment để dùng)
          <div className="flex-1 flex justify-center relative">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=500&fit=crop" 
                alt="Job Search Illustration" 
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="relative bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-2xl p-16 flex items-center justify-center"><div class="text-white text-8xl">💼</div></div>';
                }}
              />
            </div>
          </div>
          */}
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="details bg-white border-t border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {details.map((element, index) => (
              <div 
                className="card bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center gap-4 group border border-gray-100" 
                key={element.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="icon text-4xl md:text-5xl text-green-600 bg-green-100 p-4 rounded-full group-hover:bg-green-600 group-hover:text-white transition duration-300 group-hover:scale-110 transform">
                  {element.icon}
                </div>
                <div className="content text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {element.title}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base font-medium">
                    {element.subTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;