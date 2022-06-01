import express, { Router } from 'express';

import { studentController } from '../controllers';

const studentRouter: Router = Router();

studentRouter.get('/', studentController.getAll);

export default studentRouter;
