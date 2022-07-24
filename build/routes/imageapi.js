"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Imageresizing_1 = __importDefault(require("./Imageresizing"));
const image = express_1.default.Router();
//image API Route
image.get('/image', async (req, res) => {
    //data query form url
    const dataQeury = req.query;
    const imgfile = dataQeury['filename'];
    const width = parseInt(dataQeury['width']);
    const height = parseInt(dataQeury['height']);
    //original image path
    const srcImgPath = path_1.default.join(__dirname, '../../images/' + imgfile + '.jpg');
    //thumb folder path
    const thumb = path_1.default.join(__dirname, '../../thumb/');
    //resized image path
    const resizedImgPath = thumb + imgfile + '-(' + width + ',' + height + ').jpg';
    //checking for image existence
    const checkingImgExistence = fs_1.default.existsSync(srcImgPath);
    //checking thumb existence
    const checkThumbExistence = fs_1.default.existsSync(resizedImgPath);
    //url parameter error handling
    //no parameter
    if (!imgfile && !width && !height) {
        res
            .status(400)
            .send('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and image dimensions</h1>');
        //no filename
    }
    else if (!imgfile && width && height) {
        res
            .status(400)
            .send('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert the filename </h1>');
        //no width or height and no filename
    }
    else if ((!width && !imgfile) || (!height && !imgfile)) {
        res
            .status(400)
            .send('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and check image dimensions</h1>');
        //no width or height
    }
    else if (!width || !height) {
        res
            .status(400)
            .send('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please check image dimensions</h1> <h1 style="width: 100%; color: red; text-align: center;">Note: Dimensions must be in numbers as intger only and ZERO not allowed</h1>');
    }
    //checking src image Existence
    else if (checkingImgExistence === false) {
        res
            .status(400)
            .send('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert valid image filename</h1>');
    }
    //setting resolution limit
    else if (width > 7680 || height > 4320) {
        res
            .status(400)
            .send('<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Maximum image dimensions supported up to 8K:(7680 x 4320)</h1>');
    }
    //Returning Processed image after all parameter checked
    else if (imgfile && width && height) {
        //cheking thumb existence
        if (!fs_1.default.existsSync(thumb)) {
            fs_1.default.mkdirSync(thumb);
        }
        else
            thumb;
        //check if thumb image exist and resize new image
        if (!checkThumbExistence) {
            await (0, Imageresizing_1.default)(srcImgPath, resizedImgPath, width, height);
        }
        //logging when loading thumb
        else
            console.log('\n -----------\nThumb image path: ', resizedImgPath);
        //returning the imagefile
        return res.status(200).sendFile(resizedImgPath);
    }
});
exports.default = image;
