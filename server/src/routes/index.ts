import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

//localhost:3001/weather/api - endpoint 1
router.use('/api', apiRoutes);

//localhost:3001/weather/ - endpoint 2
router.use('/', htmlRoutes);

export default router;
