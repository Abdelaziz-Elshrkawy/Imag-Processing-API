import sharp from 'sharp';
import { promises as fspromise } from 'fs';

//reuseable image resizing Function
const imgResizing = async (
  srcImgPath: string,
  resizedImgPath: string,
  width: number,
  height: number
): Promise<Buffer> => {
  //sharp code
  const resizedImg = await sharp(srcImgPath)
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toBuffer();
  //logging while resizing process
  console.log('\n-----------\nSource image path: ', srcImgPath);
  console.log('\nProcessed image path:', resizedImgPath);
  //saving resized image
  return fspromise.writeFile(resizedImgPath, resizedImg) as unknown as Buffer;
};

export default imgResizing;
