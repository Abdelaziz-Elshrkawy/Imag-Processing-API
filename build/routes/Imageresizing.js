"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
//reuseable image resizing Function
const imgResizing = async (srcImgPath, resizedImgPath, width, height) => {
    //sharp code
    const resizedImg = await (0, sharp_1.default)(srcImgPath)
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toBuffer();
    //logging while resizing process
    console.log('\n-----------\nSource image path: ', srcImgPath);
    console.log('\nProcessed image path:', resizedImgPath);
    //saving resized image
    return fs_1.promises.writeFile(resizedImgPath, resizedImg);
};
exports.default = imgResizing;
