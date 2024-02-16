// pages/api/verify-checkout-session.js
import Stripe from "stripe";
import { admin } from "@/app/firebase/firebaseAdmin";

const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { sessionId } = req.body;

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      const customerId = session.customer;
      const userId = session.client_reference_id;
      const subscriptionId = session.subscription;

      const usersRef = admin.firestore().collection("users");
      const userSnapshot = await usersRef
        .where("stripeCustomerId", "==", customerId)
        .get();

      await admin.firestore().collection("users").doc(userId).update({
        subscriptionStatus: "Enterprise",
        subscriptionId,
        credits: 200,
        explores: 999,
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
