import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const [illustName, setIllustName] = useState("");

  useEffect(() => {
    if (router.isReady) {
      const { imagePrompt } = router.query;
      setIllustName(imagePrompt);
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <h1>Selected Image: {illustName}</h1>
      {/* 이미지를 표시하는 데 imageName 값을 사용할 수 있습니다. */}
    </div>
  );
};

export default Page;
