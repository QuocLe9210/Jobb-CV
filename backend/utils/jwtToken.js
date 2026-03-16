export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000, // Số 5 nghĩa là 5 ngày
    ),
    httpOnly: true, // Bảo mật cookie, javascript bên client không đọc được
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
