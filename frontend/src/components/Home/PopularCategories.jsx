import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Thiết kế đồ họa",
      subTitle: "305 Vị trí",
      icon: <MdOutlineDesignServices />,
      gradient: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: 2,
      title: "Lập trình Mobile",
      subTitle: "500 Vị trí",
      icon: <TbAppsFilled />,
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Lập trình Frontend",
      subTitle: "200 Vị trí",
      icon: <MdOutlineWebhook />,
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      title: "Lập trình Web",
      subTitle: "1000+ Vị trí",
      icon: <FaReact />,
      gradient: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      id: 5,
      title: "Tài chính & Kế toán",
      subTitle: "150 Vị trí",
      icon: <MdAccountBalance />,
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 6,
      title: "Trí tuệ nhân tạo (AI)",
      subTitle: "867 Vị trí",
      icon: <GiArtificialIntelligence />,
      gradient: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Vị trí",
      icon: <MdOutlineAnimation />,
      gradient: "from-red-400 to-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: 8,
      title: "Lập trình Game",
      subTitle: "80 Vị trí",
      icon: <IoGameController />,
      gradient: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="categories bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Danh mục nghề nghiệp
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Khám phá hàng nghìn cơ hội việc làm trong các lĩnh vực hàng đầu
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((element, index) => (
            <div
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100"
              key={element.id}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient Top Bar */}
              <div className={`h-2 bg-gradient-to-r ${element.gradient}`}></div>

              {/* Card Content */}
              <div className="p-6 flex items-center gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 ${element.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-3xl bg-gradient-to-br ${element.gradient} bg-clip-text text-transparent`}>
                    {element.icon}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300 truncate">
                    {element.title}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    {element.subTitle}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="bg-white hover:bg-green-600 text-green-600 hover:text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-600 transform hover:scale-105">
            Xem tất cả danh mục →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;