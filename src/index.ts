import express, {
  Application,
  Errback,
  NextFunction,
  Request,
  Response,
} from 'express';
import 'dotenv/config';
import path from 'path';

import routes from './routes';
import databaseInit from './db/init';
import { HTTP_STATUS } from './constants';

const app: Application = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(express.static(path.join(__dirname, '../client/build/')));

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/', 'index.html'))
})

app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(HTTP_STATUS.SERVER_ERROR).json(error);
});

try {
  databaseInit();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
