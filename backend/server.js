import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js"; // <--- Thêm dòng này

const PORT = process.env.PORT || 4000;

dbConnection(); // <--- Gọi hàm kết nối ở đây

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
