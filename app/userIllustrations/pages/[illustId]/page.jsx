"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { illustName } = router.query; // URL에서 imageName 값을 추출합니다.

  // 여기서 imageName 값을 사용하여 페이지를 동적으로 렌더링할 수 있습니다.
  // 예를 들어, 이미지 이름을 통해 특정 이미지 정보를 표시하거나 이미지를 로드할 수 있습니다.

  return (
    <div>
      <h1>Selected Image: {illustName}</h1>
      {/* 이미지를 표시하는 데 imageName 값을 사용할 수 있습니다. */}
    </div>
  );
};

export default Page;
