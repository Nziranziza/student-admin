import express, {
  Application,
  Errback,
  NextFunction,
  Request,
  Response,
} from 'express';
import 'dotenv/config';
import path from 'path';
import morgan from 'morgan';

import routes from './routes';
import databaseInit from './db/init';
import { HTTP_STATUS, RESPONSE_MESSAGES } from './constants';

const app: Application = express();
const { PORT = 3000, NODE_ENV } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1', routes);

app.use(express.static(path.join(__dirname, '../client/build/')));

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/', 'index.html'))
})

app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  const isDev = NODE_ENV === 'development';
  return res.status(HTTP_STATUS.SERVER_ERROR).json({
    message: RESPONSE_MESSAGES.SOMETHING_WRONG,
    error: isDev ? error : null
  });
});

try {
  databaseInit();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
