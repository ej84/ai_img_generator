"use client";
import React from "react";

const Page = () => {
  // 예를 들어, React 컴포넌트 내부

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const imageFile = document.querySelector('input[type="file"]').files[0];
    formData.append("image", imageFile);

    try {
      const response = await fetch("/api/convertToSvg/route", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      // 여기서 변환된 SVG를 처리합니다.
    } catch (error) {
      console.error("변환 중 오류 발생:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/png, image/jpeg" />
      <button type="submit">Convert to SVG</button>
    </form>
  );
};

export default Page;
