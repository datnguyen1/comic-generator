import express from 'express';
import {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic
} from '../controllers/comicController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.route('/').get(getComics).post(createComic);

router
  .route('/:id')
  .get(getComicById)
  .patch(updateComic)
  .delete(deleteComic);

export default router;
