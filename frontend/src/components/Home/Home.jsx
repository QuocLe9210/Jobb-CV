import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  // Nếu chưa đăng nhập thì đẩy về trang Login
  // Nếu muốn cho phép khách xem trang chủ, bỏ comment đoạn này
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="homePage bg-white">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;