import { Router } from 'express';

import { studentController } from '../controllers';
import {
  createStudentInputValidation,
  updateStudentInputValidation,
} from '../middlewares';

const studentRouter: Router = Router();

studentRouter
  .route('/')
  .get(studentController.getAll)
  .post(createStudentInputValidation, studentController.create);

studentRouter
  .route('/:id')
  .get(studentController.getById)
  .delete(studentController.deleteById)
  .put(updateStudentInputValidation, studentController.update);

export default studentRouter;
