// pages/api/verify-checkout-session.js
import Stripe from "stripe";
import { admin } from "@/app/firebase/firebaseAdmin";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { sessionId } = req.body;

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const subscriptionType = "premium";

      await admin
        .firestore()
        .collection("users")
        .doc("8Tj8NsVZrxPWyczB44xijlBN2iF2")
        .update({
          subscriptionStatus: subscriptionType,
          credits: 150,
          explores: 200,
          private: true,
          svg: true,
        });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
