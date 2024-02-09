import { db } from "./initFirebase";
import { collection, doc, getDoc } from "firebase/firestore";

const fetchIllustData = async (imagePrompt) => {
    console.log(db);
    const illustDocRef = doc(db, "publicImages", imagePrompt);
    const docSnap = await getDoc(illustDocRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
};

export default fetchIllustData;