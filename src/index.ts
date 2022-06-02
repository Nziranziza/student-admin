import express, {
  Application,
  Errback,
  NextFunction,
  Request,
  Response,
} from 'express';
import 'dotenv/config';

import routes from './routes';
import databaseInit from './db/init';
import { HTTP_STATUS } from './constants';

const app: Application = express();
const { port = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res
    .status(HTTP_STATUS.OK)
    .send({ message: `Welcome to student administration framework` });
});

app.use('/api/v1', routes);

app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(HTTP_STATUS.SERVER_ERROR).json(error);
});

try {
  databaseInit();
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error: any) {
  console.log(`Error occurred: ${error.message}`);
}
