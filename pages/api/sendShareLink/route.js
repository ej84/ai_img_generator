// pages/api/sendShareLink.js

import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

mg.messages
  .create("sandbox-123.mailgun.org", {
    from: "Excited User <mailgun@sandbox-123.mailgun.org>",
    to: ["test@example.com"],
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
    html: "<h1>Testing some Mailgun awesomeness!</h1>",
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.log(err)); // logs any error

/*
import nodemailer from "nodemailer";

export const config = {
  runtime: 'edge',
};


export default async function handler(req, res) {
  const { email, imageUrl } = req.body;

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
    service: "gmail", // Using Gmail
    auth: {
      user: "jmw9871@gmail.com",
      pass: "jvdh xxus vrtx tkow"
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
*/
/*
export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      const { email, imageUrl } = await req.json();
      console.log('Received POST request with email:', email);
      console.log('Received POST request with imageUrl:', imageUrl);

      return new Response(JSON.stringify({ message: '성공적으로 처리됨' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    catch (error) {
      return new Response(JSON.stringify({ error: '데이터 처리 오류' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}
*/
