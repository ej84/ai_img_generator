// pages/api/sendEmail.js
import nodemailer from "nodemailer";

export default async (req, res) => {
  const { email, imageUrl } = req.body;

  if (req.method === "POST") {
    // Setting Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_NODEMAILER_USERNAME,
        pass: process.env.NEXT_PUBLIC_NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: "jmw9871@gmail.com",
      to: email,
      subject: "Check out this cool image!",
      html: `<p>Here is the image you wanted to share:</p><img src="${imageUrl}" alt="Shared Image" />`,
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
