import { Router } from 'express';

import { studyGroupController } from '../controllers';
import { createStudyGroupInputValidation, updateStudyGroupInputValidation } from '../middlewares';

const studyGroupRouter: Router = Router();

studyGroupRouter
.route('/')
.get(studyGroupController.getAll)
.post(createStudyGroupInputValidation, studyGroupController.create);

studyGroupRouter
.route('/:id')
.get(studyGroupController.getById)
.delete(studyGroupController.deleteById)
.put(updateStudyGroupInputValidation, studyGroupController.update);

export default studyGroupRouter;