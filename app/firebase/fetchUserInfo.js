import { db } from "./initFirebase";
import { doc, getDoc } from "firebase/firestore";

const fetchUserInfo = async (uid) => {
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export default fetchUserInfo;
