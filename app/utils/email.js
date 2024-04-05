import FormData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.NEXT_PUBLIC_MAILGUN_API_KEY;
const DOMAIN = process.env.NEXT_PUBLIC_MAILGUN_DOMAIN;

export default async function sendEmail() {
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: "api",
    key: API_KEY,
  });

  try {
    await mg.messages
      .create(DOMAIN, {
        from: "test@test.com",
        to: "test2@test.com",
        subject: "Hello, this is testing email.",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>",
      })
      .then((msg) => console.log(msg)); // logs response data
  } catch (err) {
    console.error(err);
  } // logs any error
}
