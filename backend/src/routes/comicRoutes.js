import express from 'express';
import {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic,
} from '../controllers/comicController.js';

const router = express.Router();

router.route('/').get(getComics).post(createComic);

router
  .route('/:id')
  .get(getComicById)
  .patch(updateComic)
  .delete(deleteComic);

export default router;
