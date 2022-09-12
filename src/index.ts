import Express, { Request, Response } from 'express';
import image from './routes/imageapi';

const app = Express();
const port = 2022;
app.get('/', (_req: Request, res: Response): void => {
  res.send(
    "<h1 style='font-size: 3em; text-align: center;'>Welcome to the image processing API</h1> <p style='font-size: 2em; font-weight:500; text-align: center;'> Go to (localhost: " +
      port +
      '/image?filename=<em>filename here</em>&width=<em>width in numbers here</em>&height=<em>height in numbers here</em>) to resize desired image </p>'
  );
});

app.use(image);

app.listen(port, (): void => {
  console.log('Server listening to Port:' + port);
});

export default app;
