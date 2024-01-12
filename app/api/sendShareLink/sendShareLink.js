// pages/api/sendShareLink.js
import nodemailer from "nodemailer";

export default async (req, res) => {
  const { email, imageUrl } = req.body;

  // Nodemailer 트랜스포터 설정
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail 사용 시
    auth: {
      user: "jmw9871@gmail.com",
    },
  });

  const mailOptions = {
    from: "jmw9871@gmail.com",
    to: email,
    subject: "Check out this cool image!",
    html: `<p>Here is the image you wanted to share:</p><img src="${imageUrl}" alt="Shared Image" />`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Share link sent!" });
  } catch (error) {
    res.status(500).json({ error: "Error sending share link email" });
  }
};
