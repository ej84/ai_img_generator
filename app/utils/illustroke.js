export const generateImage = async (
  userStyle,
  userPrompt,
  userObject,
  userColor,
  userNum
) => {
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
          style: userStyle,
          prompt: userPrompt,
          objectmode: userObject,
          colormode: userColor,
          n: userNum,
        }),
      }
    );

    console.log("Call Success");
    return response;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
