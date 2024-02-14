// pages/api/create-checkout-session.js
import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { priceId } = req.body; // 클라이언트로부터 받은 가격 ID

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        //metadata: { userId: user.uid },
        mode: "subscription",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
