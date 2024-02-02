import React, { useState } from "react";
import moment from "moment/moment";

export const SortByDropdown = ({ filteredIllust, setFilteredIllust }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortByDownloadCounts = () => {
    // 이미지 배열을 다운로드 횟수에 따라 내림차순으로 정렬합니다.
    const sortedImages = [...filteredIllust].sort(
      (a, b) => b.downloadCount - a.downloadCount
    );
    setFilteredIllust(sortedImages); // 상태를 업데이트합니다.
  };

  function firestoreTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }

  const sortByCreationDate = () => {
    const sortedImages = [...filteredIllust].sort((a, b) => {
      const dateA = firestoreTimestampToDate(a.created_at);
      const dateB = firestoreTimestampToDate(b.created_at);

      // dateA와 dateB는 이제 JavaScript Date 객체입니다.
      // getTime 메서드를 사용하여 비교합니다.
      return dateB.getTime() - dateA.getTime(); // 내림차순 정렬
    });

    setFilteredIllust(sortedImages);
  };

  return (
    <div className="hidden relative md:block md:top-10 md:inset-x-2/3">
      <button onClick={toggleDropdown}>Sort by:</button>
      {isDropdownOpen && (
        <div className="">
          <button onClick={sortByDownloadCounts}>Sort by downloads</button>
          <button onClick={sortByCreationDate}>Newest arrivals</button>
        </div>
      )}
    </div>
  );
};
