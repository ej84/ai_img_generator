import multer from "multer";
import { png2svg } from "svg-png-converter";

// multer 설정: 메모리에 파일을 저장합니다
const upload = multer({ storage: multer.memoryStorage() });

// multer 미들웨어를 사용하여 업로드된 파일 처리
export const config = {
  api: {
    bodyParser: false, // bodyParser를 비활성화
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    // multer를 사용하여 파일 업로드 처리
    upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res
          .status(500)
          .json({ error: "Unknown error occurred when uploading." });
      }

      // 업로드된 이미지 데이터
      const pngData = req.file.buffer;

      try {
        const svgResult = await png2svg({
          tracer: "imagetracer",
          optimize: true,
          input: pngData,
          numberofcolors: 24,
          pathomit: 1,
        });

        res.setHeader("Content-Type", "image/svg+xml");
        res.status(200).send(svgResult.content);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
