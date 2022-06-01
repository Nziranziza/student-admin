import express, { Application, Errback, NextFunction, Request, Response } from 'express';
import 'dotenv/config';

import routes from './routes';
import databaseInit from './db/init';

const app: Application = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to student administration framework` })
});

app.use('/api/v1', routes);

app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    return res.status(500).json(error);
  });

try {
    databaseInit()
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    })
} catch (error:  any) {
    console.log(`Error occurred: ${error.message}`)
}