const sharp = require("sharp");
let path = process.argv[2];
let width = Number(process.argv[3]);

const resize = (path, width) => {
    sharp(path).resize({ width: width })
        .toFile("./temp/image_resize.jpg", (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully resized image")
            }
        })
}
resize(path, width);