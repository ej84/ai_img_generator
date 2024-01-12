// pages/share/[imageId].js
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const SharePage = () => {
  const router = useRouter();
  const { illustId } = router.query;
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    if (illustId) {
      const getImageData = async () => {
        const docRef = doc(db, "users", userId, "illustrations", illustId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setImageData(docSnap.data());
        }
      };
      getImageData();
    }
  }, [illustId]);

  return (
    <div>
      {imageData ? (
        <>
          <img src={imageData.img_url} alt={imageData.imagePrompt} />
          {/* 여기에 공유 링크 및 기타 정보 표시 */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SharePage;
