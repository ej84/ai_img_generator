import { svg2png, png2svg } from 'svg-png-converter';

const converter =
    await svg2png({
        input: readFileSync("C:Users/jmw98/OneDrive/Desktop/ai_img_generator/app/illustration.svg"),
        encoding: 'buffer',
        format: 'png',
    })


export default converter;