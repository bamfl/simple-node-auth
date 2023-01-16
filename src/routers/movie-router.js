import { Router } from 'express';
import movieController from '../controllers/movie-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import roleMiddleware from '../middlewares/role-middleware.js';

const router = new Router();

router.get('/api/movies', authMiddleware, movieController.getMovies);
router.delete('/api/movie/:id', authMiddleware, roleMiddleware(['ADMIN']), movieController.deleteMovie);

export default router;
