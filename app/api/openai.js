import { Configuration, OpenAIApi } from "openai-edge";

// Configuration

const config = new Configuration({
  apiKey: process.env.NEXT_DALLE_API_KEY,
});

const openai = new OpenAIApi(config);

export default async (req, res) => {
  const { prompt } = await req.json();
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });

  res.status(200).json({ text: `${response.data.choices[0].text}` });

  return new Response(JSON.stringify({ data: response.data.data }));
};
