import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JOB-CV", // Tên Database, bạn có thể đổi
    })
    .then(() => {
      console.log("kết nối thành công đến database");
    })
    .catch((err) => {
      console.log(`Kết nối thất bại: ${err}`);
    });
};
