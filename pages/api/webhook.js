// pages/api/webhook.js
export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const event = req.body;

      // 이벤트 유형에 따라 필요한 처리 수행
      // 예: 결제 성공 시 Firebase 데이터베이스 업데이트

      res.status(200).json({ received: true });
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
