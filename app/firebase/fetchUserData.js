import { db } from "./initFirebase";
import { doc, getDoc } from "firebase/firestore";

const fetchUserData = async (userId) => {
  const userDocRef = doc(db, "testData", userId);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    console.log(docSnap);
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export default fetchUserData;
