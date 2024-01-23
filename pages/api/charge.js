import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { paymentMethodId, amount } = req.body;

      // Stripe 결제 처리
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // 금액은 최소 단위(예: 센트)로 지정
        currency: "usd", // 통화
        payment_method: paymentMethodId,
        confirm: true, // 결제 승인
      });

      // 여기서 필요한 경우 Firebase 데이터베이스 업데이트 로직을 추가할 수 있습니다.

      res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
