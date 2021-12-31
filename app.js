const sharp = require("sharp");
const compress_images = require("compress-images");
const fs = require("fs");

let pathInput = process.argv[2];
let width = Number(process.argv[3]);
let angle = parseInt(process.argv[4]);

const resize = (pathInput, pathOutput, width) => {
    sharp(pathInput).rotate(angle, { background: "#053447" }).resize({ width: width })
        .toFile(pathOutput, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully resized image")
                compress(pathOutput, "./compressed/")
            }
        })
}

const compress = (inputPath, pathOutput) => {
    compress_images(inputPath, pathOutput, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");

            fs.unlink(pathInput, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Apagado")
                }
            })
        }
    );
}

resize(pathInput, "./temp/output_image.jpg", width);