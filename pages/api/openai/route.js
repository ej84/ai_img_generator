import { Configuration, OpenAIApi } from "openai-edge";

// Configuration

const config = new Configuration({
  apiKey: process.env.NEXT_DALLE_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req, res) {
  const { prompt } = await req.json();
  const response = await openai.createImage({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "512x512",
  });

  return new Response(JSON.stringify({ data: response.data.data }));
}
