import FormData from "form-data";
import Mailgun from "mailgun.js";

const API_KEY = process.env.NEXT_PUBLIC_MAILGUN_API_KEY;
const DOMAIN = process.env.NEXT_PUBLIC_MAILGUN_DOMAIN;
// 2ca0ad7ba547499f1befbcc491d65ea6-
export default async function sendEmail() {
  const mailgun = new Mailgun(FormData);

  const mg = mailgun.client({
    username: "api",
    key: API_KEY,
  });

  try {
    await mg.messages
      .create(DOMAIN, {
        from: "jmw9871@gmail.com",
        to: "ej84@njit.edu",
        subject: "Hello, this is testing email.",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>",
      })
      .then((msg) => console.log(msg)); // logs response data
  } catch (err) {
    console.error(err);
  } // logs any error
}
