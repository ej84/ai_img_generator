import multer from 'multer';
import { svg2png } from 'svg-png-converter';

// multer 설정: 메모리에 파일을 저장합니다
const upload = multer({ storage: multer.memoryStorage() });

// multer 미들웨어를 사용하여 업로드된 파일 처리
export const config = {
    api: {
        bodyParser: false, // bodyParser를 비활성화
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {

        upload.single('image')(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: err.message });
            } else if (err) {
                return res.status(500).json({ error: 'Unknown error occurred when uploading.' });
            }

            // 업로드된 이미지 데이터
            const svgData = req.file.buffer;
            try {
                // SVG 데이터를 받아옵니다 (예제에서는 파일 시스템을 사용하나, 실제로는 요청 본문에서 받아올 수 있음)

                // SVG를 PNG로 변환
                const output = await svg2png({
                    input: svgData,
                    encoding: 'buffer',
                    format: 'png',
                });

                // 변환된 PNG 데이터를 Base64 형태로 클라이언트에 전송
                res.status(200).send(output.toString('base64'));
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    else {
        res.status(405).end(); // Method Not Allowed
    }
}
