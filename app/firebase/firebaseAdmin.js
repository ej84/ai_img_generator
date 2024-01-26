import { firebase } from "firebase-admin";

const serviceAccount = require("C:/Users/Richard_Jeong/Desktop/ai_img_generator/meechelangelo-a76e3-firebase-adminsdk-fpfil-43cfe76c87.json"); // JSON 파일 경로

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}

export { firebase };
