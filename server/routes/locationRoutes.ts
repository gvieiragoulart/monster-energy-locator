import { Router } from 'express';
import { apiLimiter } from '../middleware/rateLimiter.js';
import { validateQuery, locationQuerySchema } from '../middleware/validate.js';
import { getLocations } from '../controllers/locationController.js';

const router = Router();

router.get('/api/locations', apiLimiter, validateQuery(locationQuerySchema), getLocations);

export default router;
