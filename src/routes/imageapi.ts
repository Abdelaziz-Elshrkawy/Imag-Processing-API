import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import imgResizing from './Imageresizing';
const image = express.Router();
//image API Route
image.get('/image', async (req: Request, res: Response): Promise<void> => {
  //data query form url
  const dataQeury = req.query;
  const imgfile: string | unknown = dataQeury['filename'];
  const width = parseInt(dataQeury['width'] as string) as number;
  const height = parseInt(dataQeury['height'] as string) as number;

  //original image path
  const srcImgPath: string | undefined = path.join(
    __dirname,
    '../../images/' + imgfile + '.jpg'
  );

  //thumb folder path
  const thumb: string | undefined = path.join(__dirname, '../../thumb/');

  //resized image path
  const resizedImgPath: string | undefined =
    thumb + imgfile + '-(' + width + ',' + height + ').jpg';

  //checking for image existence
  const checkingImgExistence: boolean = fs.existsSync(srcImgPath);
  //checking thumb existence
  const checkThumbExistence: boolean = fs.existsSync(resizedImgPath);

  //url parameter error handling
  //no parameter
  if (!imgfile && !width && !height) {
    res
      .status(400)
      .send(
        '<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and image dimensions</h1>'
      );
    //no filename
  } else if (!imgfile && width && height) {
    res
      .status(400)
      .send(
        '<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert the filename </h1>'
      );
    //no width or height and no filename
  } else if ((!width && !imgfile) || (!height && !imgfile)) {
    res
      .status(400)
      .send(
        '<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert filename and check image dimensions</h1>'
      );
    //no width or height
  } else if (!width || !height) {
    res
      .status(400)
      .send(
        '<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please check image dimensions</h1> <h1 style="width: 100%; color: red; text-align: center;">Note: Dimensions must be in numbers as intger only and ZERO not allowed</h1>'
      );
  }
  //checking src image Existence
  else if (checkingImgExistence === false) {
    res
      .status(400)
      .send(
        '<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Please insert valid image filename</h1>'
      );
  }
  //setting resolution limit
  else if (width > 7680 || height > 4320) {
    res
      .status(400)
      .send(
        '<h1 style="width: 100%; color: red; text-align: center;"><span style="color: red; font-size: 2em;">✘</span> Maximum image dimensions supported up to 8K:(7680 x 4320)</h1>'
      );
  }
  //Returning Processed image after all parameter checked
  else if (imgfile && width && height) {
    //cheking thumb existence
    if (!fs.existsSync(thumb)) {
      fs.mkdirSync(thumb);
    } else thumb;
    //check if thumb image exist and resize new image
    if (!checkThumbExistence) {
      await imgResizing(srcImgPath, resizedImgPath, width, height);
    }
    //logging when loading thumb
    else console.log('\n -----------\nThumb image path: ', resizedImgPath);
    //returning the imagefile
    return res.status(200).sendFile(resizedImgPath) as void as undefined;
  }
});

export default image;
