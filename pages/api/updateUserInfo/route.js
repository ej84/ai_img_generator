import { admin } from "@/app/firebase/firebaseAdmin";

export default async (req, res) => {
  // 사용자 ID를 확인합니다.
  if (req.method === "POST") {
    const userId = req.body.userId;

    // Firebase에서 사용자의 현재 크레딧을 확인합니다.
    const userRef = admin.firestore().collection("users").doc(userId);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    try {
      // 이미지 생성 성공 시 크레딧을 차감합니다.
      await userRef.update({
        credits: admin.firestore.FieldValue.increment(-1),
      });
      // 생성된 이미지와 업데이트된 크레딧 정보를 반환합니다.
      res.status(200).json({ credits: userData.credits - 1 });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Server error", credits: userData.credits });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
