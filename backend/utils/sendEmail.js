import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com", // Sử dụng Gmail
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "leanhquoc9210@gmail.com", // <--- Thay Email của bạn
      pass: "vrvp lzvc zbfm hsqa", // <--- Quan trọng: Đây KHÔNG PHẢI mật khẩu đăng nhập Gmail
    },
  });

  const options = {
    from: "leanhquoc9210@gmail.com", // <--- Thay Email của bạn
    to: email,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(options);
};
