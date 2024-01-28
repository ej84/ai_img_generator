import { svg2png } from 'svg-png-converter'
import { readFileSync, writeFileSync } from 'fs'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // SVG 데이터를 받아옵니다 (예제에서는 파일 시스템을 사용하나, 실제로는 요청 본문에서 받아올 수 있음)
            const svgData = readFileSync('C:/Users/jmw98/OneDrive/Desktop/ai_img_generator/app/illustration2.svg', 'utf8');

            // SVG를 PNG로 변환
            let output = await svg2png({
                input: svgData,
                encoding: 'buffer',
                format: 'png',
            });

            // 변환된 PNG 데이터를 Base64 형태로 클라이언트에 전송
            res.status(200).send(output.toString('base64'));
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
