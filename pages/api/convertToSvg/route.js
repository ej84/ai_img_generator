// pages/api/convert-to-svg.js
import { Vectorizer } from "@neplex/vectorizer";
import formidable from "formidable-serverless"; // 파일 업로드를 위한 라이브러리
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Formidable을 사용하기 위해 필요함
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res
          .status(500)
          .json({ error: "파일을 파싱하는 동안 문제가 발생했습니다." });
        return;
      }

      const vectorizer = new Vectorizer();
      const filePath = files.image.filepath; // 'image'는 클라이언트에서 보낸 파일의 필드명

      try {
        const svg = await vectorizer.vectorize(filePath);
        // 여기서 SVG를 파일로 저장하거나 직접 응답으로 반환할 수 있습니다.
        // 예: SVG 파일로 저장
        fs.writeFileSync("output.svg", svg);
        res.status(200).json({ message: "변환 성공", svg });
      } catch (error) {
        res.status(500).json({ error: "변환 중 오류 발생" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
