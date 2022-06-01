import { Router } from 'express';

import studentRouter from './student';
import studyGroupRouter from './studyGroup';

const router: Router = Router();

router.use('/students', studentRouter);
router.use('/study-groups', studyGroupRouter)

export default router;