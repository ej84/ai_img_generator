import React, { useState, useEffect } from "react";

const SVGEditor = () => {
  const [svgData, setSvgData] = useState("");
  const [color, setColor] = useState("#000000");
  const svgUrl =
    "https://firebasestorage.googleapis.com/v0/b/meechelangelo-a76e3.appspot.com/o/baseball.svg?alt=media&token=42de29c3-a5d5-46ed-bcbc-5185b2bc3052";

  useEffect(() => {
    // Firebase에서 SVG 데이터를 가져옵니다.
    fetch(svgUrl)
      .then((response) => response.text())
      .then((data) => {
        setSvgData(data);
      });
  }, [svgUrl]);
  /*
  const changeColor = (newColor) => {
    // 문자열로 된 SVG 데이터를 DOM 요소로 변환
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");

    // 모든 'fill' 속성을 가진 요소를 찾아 색상을 변경
    const paths = svgDoc.querySelectorAll("[fill]");
    paths.forEach((path) => {
      // 기존 색상이 특정 색상(예: #000000)일 경우에만 변경
      if (path.getAttribute("fill") !== "#000000") {
        path.setAttribute("fill", newColor);
      }
    });

    // 변경된 SVG DOM을 다시 문자열로 변환
    const serializer = new XMLSerializer();
    const newSvgData = serializer.serializeToString(svgDoc.documentElement);

    // 상태 업데이트
    setSvgData(newSvgData);
  };*/

  // 클릭된 path의 색상을 변경합니다.
  const handlePathClick = (event) => {
    const path = event.target;
    path.setAttribute("fill", color);
    updateSVGData();
  };

  // SVG 데이터를 다시 상태로 설정하여 React가 변경 사항을 인지하도록 합니다.
  const updateSVGData = () => {
    const svgElement = document.getElementById("svgContainer");
    setSvgData(svgElement.innerHTML);
  };

  /*
  // 색상 선택 시 SVG 색상 변경
  useEffect(() => {
    changeColor(color);
  }, [color]);*/

  return (
    <div>
      {/* SVG 디스플레이 */}
      <div
        id="svgContainer"
        dangerouslySetInnerHTML={{
          __html: svgData,
        }}
      />

      {/* 컬러 피커 */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        onClick={(e) => {
          // path 요소가 클릭되었는지 확인합니다.
          if (e.target.nodeName === "path") {
            handlePathClick(e);
          }
        }}
      />
    </div>
  );
};

export default SVGEditor;
