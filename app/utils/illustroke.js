import axios from "axios";

export const generateImage = async () => {
  try {
    const response = await fetch(
      "https://us-central1-illustroke-c1d67.cloudfunctions.net/extApp/generate",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_ILLUSTROKE_API_KEY,
        },
        body: JSON.stringify({
          style: "flat",
          prompt: "an obese cat",
          objectmode: "full",
          colormode: "color",
          n: 1,
        }),
      }
    );
    /*
      "https://us-central1-illustroke-c1d67.cloudfunctions.net/extApp/generate",
      {
        method: "POST",
        mode: "cors",
        style: "flat",
        prompt: prompt,
        objectmode: "full",
        colormode: "color",
        n: 1, // number of generated images
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ILLUSTROKE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }*/
    console.log("Call Success");
    return response;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
