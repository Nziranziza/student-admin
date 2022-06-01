import { Router } from 'express';

import studentRouter from './student';

const router: Router = Router();

router.use('/students', studentRouter);

export default router;