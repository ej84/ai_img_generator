import { db } from "./initFirebase";
import { collection, getDocs } from "firebase/firestore";

const fetchPublicImages = async () => {
  const docRef = collection(db, "publicImages");

  const querySnapshot = await getDocs(docRef);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export default fetchPublicImages;
