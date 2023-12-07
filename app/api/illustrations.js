export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("/v1/images/generations", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_DALLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: req.body.prompt,
        }),
      });
      const data = await response.json();
      res.status(200).json({ imageUrl: data.generated_images[0] });
    } catch (error) {
      res.status(500).json({ error: "Error generating image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
