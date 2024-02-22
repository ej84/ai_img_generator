import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const SortByDropdown = ({ filteredIllust, setFilteredIllust }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortByDownload, setIsSortByDownload] = useState(false);
  const [isSortByNewest, setIsSortByNewest] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortByDownloadCounts = () => {
    // 이미지 배열을 다운로드 횟수에 따라 내림차순으로 정렬합니다.
    setIsSortByNewest(false);
    setIsSortByDownload(true);
    const sortedImages = [...filteredIllust].sort(
      (a, b) => b.downloadCount - a.downloadCount
    );
    setFilteredIllust(sortedImages); // 상태를 업데이트합니다.
  };

  function firestoreTimestampToDate(timestamp) {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }

  const sortByCreationDate = () => {
    setIsSortByDownload(false);
    setIsSortByNewest(true);
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
    <div className="relative md:top-7 md:inset-x-2/3">
      <div className="max-[639px]:relative max-[639px]:left-20 md:flex">
        <div className="grid grid-cols-1 ml-3 rounded-full">
          <div className="col-span-1">
            <button onClick={toggleDropdown}>
              <p className="text-gray-400">
                sort by:
                <span className="ml-10 text-black">
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </p>
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute mt-8 px-5 py-3 outline outline-1 outline-gray-300 bg-white rounded-lg z-10">
              <div className="col-span-1 py-1 flex items-center">
                <span className="inline-block flex-shrink-0 relative right-3 w-3 h-5">
                  {isSortByDownload && (
                    <FontAwesomeIcon icon={faCheck} size="1x" />
                  )}
                </span>
                <button onClick={sortByDownloadCounts}>Most Downloads</button>
              </div>
              <div className="col-span-1 py-1 flex items-center">
                <span className="inline-block flex-shrink-0 relative right-3 w-3 h-5">
                  {isSortByNewest && (
                    <FontAwesomeIcon icon={faCheck} size="1x" />
                  )}
                </span>
                <button onClick={sortByCreationDate}>Newest arrivals</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
