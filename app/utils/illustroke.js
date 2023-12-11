import axios from "axios";

export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(
      "https://us-central1-illustroke-c1d67.cloudfunctions.net/extApp/generate",
      {
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
      }
    );
    console.log("Call Success");
    return response.data;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
