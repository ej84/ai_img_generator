import React, { useState } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const categories = {
    common: [
        "flat",
        "alegria",
        "abstract",
        "futurist",
        "comic",
        "isometric",
        "psychedelic",
        "childbook",
        "realism",
        "filmnoir",
        "lowpoly",
        "pixel",
    ],
    bw: [
        "silhouette",
        "doodle",
        "technical",
        "colouringbook",
        "scribble",
        "minimalist",
    ],
    logoIcons: [
        "logo_abstract",
        "logo_elegant",
        "logo_geometric",
        "logo_funny",
        "emoji",
        "icon_web",
    ],
    artists: [
        "picasso",
        "dali",
        "escher",
        "vangogh",
        "matisse",
        "basquiat",
        "murakami",
        "popart",
        "schiele",
        "rand",
        "mondrian",
    ],
    tattoo: [
        "tattoo_oldschool",
        "tattoo_americana",
        "tattoo_tribal",
        "tattoo_japanese",
        "tattoo_geometric",
        "tattoo_line",
    ],
};

const categoryDisplayNames = {
    common: "Common",
    bw: "Black & White",
    logoIcons: "Logo & Icons",
    artists: "Artists",
    tattoo: "Tattoo",
};

const IlluStyleFilter = ({
    selectedCategory = "common",
    setSelectedCategory,
    selectedStyle = "flat",
    setSelectedStyle,
}) => {

    // update category selected by user
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        // Reset previously selected style when category is changed.
        setSelectedStyle("");
    };

    // update style selected by user
    const handleStyleChange = (style) => {
        if (selectedStyle.includes(style)) {
            setSelectedStyle(selectedStyle.filter((s) => s !== style));
        } else {
            setSelectedStyle([...selectedStyle, style]);
        }
    };

    return (
        <>
            <div className="">
                <div className="flex justify-center gap-1">
                    {Object.keys(categories).map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`flex max-[640px]:items-center border border-solid text-xs px-3 py-1 md:p-5 md:py-2 md:text-base rounded-full ${selectedCategory.includes(category)
                                ? "outline outline-violet-500 outline-3 bg-violet-200 text-violet-500"
                                : ""
                                }`}
                        >
                            {categoryDisplayNames[category] || category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-5 mt-3">
                    {categories[selectedCategory].map((style) => (
                        <div
                            className="group flex flex-col items-center justify-center h-20 w-20 md:h-32 md:w-32"

                        >
                            <button
                                key={style}
                                onClick={() => handleStyleChange(style)}
                                className={`relative bg-gray-300 rounded-xl p-7 m-2 md:p-12 ${selectedStyle.includes(style)
                                    ? "selected outline outline-violet-500 outline-4"
                                    : ""
                                    }`}
                            >
                                {/*<img
                src="https://cdn-icons-png.freepik.com/256/2939/2939047.png"
                className="rounded-2xl"
                alt="illustIcon"
            />*/}
                                {selectedStyle.includes(style) && (
                                    <span className="check-icon absolute top-1 right-1 text-white text-sm">
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            size="2x"
                                            className="text-violet-500"
                                        />
                                    </span>
                                )}

                            </button>
                            <p style={{ fontSize: "10px" }} className="text-center">
                                {style}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default IlluStyleFilter;
