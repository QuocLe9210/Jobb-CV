import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/job/saved",
          { withCredentials: true }
        );
        setSavedJobs(data.savedJobs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedJobs();
  }, []);

  if (!isAuthorized) {
    navigate("/login");
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Công Việc Đã Lưu ❤️
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.length > 0 ? (
            savedJobs.map((element) => (
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                key={element._id}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {element.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Ngành:</span> {element.category}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Quốc gia:</span> {element.country}
                </p>
                <Link
                  to={`/job/${element._id}`}
                  className="block text-center bg-green-100 text-green-700 py-2 rounded font-semibold hover:bg-green-200 transition"
                >
                  Xem Chi Tiết
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              Bạn chưa lưu công việc nào. Hãy tìm kiếm và thả tim nhé! 💔
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedJobs;