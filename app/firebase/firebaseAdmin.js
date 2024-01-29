import * as admin from "firebase-admin";

const serviceAccount = require("C:/Users/jmw98/OneDrive/Desktop/ai_img_generator/meechelangelo-a76e3-firebase-adminsdk-fpfil-43cfe76c87.json"); // JSON 파일 경로

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
