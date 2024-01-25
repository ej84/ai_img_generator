// pages/api/verify-checkout-session.js
import Stripe from "stripe";
import firebase from "firebase-admin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Firebase 관리자 초기화 (이미 설정되어 있다면 필요 없음)
if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      // Firebase 프로젝트 설정
    }),
  });
}

export default async (req, res) => {
  if (req.method === "POST") {
    const { sessionId } = req.body;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // session.customer 이나 session.subscription 정보를 사용하여
      // Firebase에서 해당 유저의 구독 상태 업데이트
      const userId = ""; // 유저 식별 정보
      const subscriptionType = "paid"; // 구독 유형 (예: standard, premium)

      await firebase.firestore().collection("users").doc(userId).update({
        subscription: subscriptionType,
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
