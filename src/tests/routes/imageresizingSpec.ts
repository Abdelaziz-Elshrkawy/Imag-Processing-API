import path from 'path';
import imgResizing from '../../routes/Imageresizing';
import fs from 'fs';

const srcImgPath: string | undefined = path.join(
  __dirname,
  '../../../images/encenadaport.jpg'
);
const thumb: string | undefined = path.join(__dirname, '../../../thumb');
if (!fs.existsSync(thumb)) {
  fs.mkdirSync(thumb);
} else thumb as string;
const thumbImgPath: string | null = path.join(
  __dirname,
  '../../../thumb/encenadaport.jpg'
);

describe('testing image resizing', (): void => {
  it('Sucess Resizeing', async (): Promise<void> => {
    await imgResizing(srcImgPath, thumbImgPath, 500, 500);
    expect(fs.existsSync(thumbImgPath)).toBeTrue;
  });
});
