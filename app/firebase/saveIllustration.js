import { db } from "./initFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import sharp from "sharp";

export const saveIllustration = async (uid, svgString) => {
  try {
    // convert svg to png first
    const pngBuffer = await sharp(Buffer.from(svgString)).png().toBuffer();

    // upload png file to Firebase
    const imageRef = ref(db, `testData/${uid}/${Date.now()}.png`);
    await uploadBytes(imageRef, pngBuffer);

    // retrieves image url uploaded
    const imageUrl = await getDownloadURL(imageRef);

    return imageUrl;
  } catch (error) {
    console.error("illustration upload failed:", error);
    throw new Error("Failed to save illust to Firebase");
  }
};
