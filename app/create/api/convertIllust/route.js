// pages/api/convertImage.js
import sharp from "sharp";
import { db } from "@/app/firebase/initFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      // image data from client side
      const { imageData } = req.body;

      // use sharp to convert to png
      const convertedImage = await sharp(imageData).png().toBuffer();

      // process the converted image
      // upload png file to Firebase
      const imageRef = ref(db, `testData/user1/${Date.now()}.png`);
      await uploadBytes(imageRef, convertedImage);

      const imageUrl = await getDownloadURL(imageRef);

      res.status(200).json({ message: "Image converted successfully" });
      return imageUrl;
    } catch (error) {
      res.status(500).json({ error: "Error converting image" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
