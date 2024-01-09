import { db } from "./initFirebase";
import { collection, getDocs } from "firebase/firestore";

const fetchUserData = async (userId) => {
  if (userId !== null && userId !== "") {
    const userDocRef = collection(db, "users", userId, "illustrations");

    const docSnap = await getDocs(userDocRef);

    return docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
};

export default fetchUserData;
