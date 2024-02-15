import { db } from "./initFirebase";
import { doc, getDoc } from "firebase/firestore";

const fetchIllustData = async (imagePrompt) => {
  const illustDocRef = doc(db, "publicImages", imagePrompt);
  const docSnap = await getDoc(illustDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export default fetchIllustData;
