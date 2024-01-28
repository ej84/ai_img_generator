import { png2svg } from 'svg-png-converter'
import { readFileSync } from 'fs'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // PNG 데이터를 받아옵니다. 실제로는 요청 본문에서 받아올 수 있음
            const pngData = readFileSync(req.body);

            // PNG를 SVG로 변환
            const svgResult = await png2svg({
                tracer: 'imagetracer',
                optimize: true,
                input: pngData,
                numberofcolors: 24,
                pathomit: 1,
            });

            const svgContent = svgResult.content;

            res.setHeader('Content-Type', 'image/svg+xml');
            res.status(200).send(svgContent);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
