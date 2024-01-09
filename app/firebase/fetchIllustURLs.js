// fetchUserStorageData.js
import { db } from './initFirebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchIllustURLs = async () => {
    const imagesCollectionRef = collection(db, 'images');
    const querySnapshot = await getDocs(imagesCollectionRef);
    return querySnapshot.docs.map(doc => doc.data().url);
};

export default fetchIllustURLs;
