import { Comic } from '../models/Comic.js';
import { AppError } from '../middleware/errorHandler.js';

export const createComic = async (req, res, next) => {
  try {
    const { title, description, panels, isPublic, tags } = req.body;

    const comic = await Comic.create({
      title,
      description,
      panels,
      author: req.user?.id,
      isPublic,
      tags
    });

    res.status(201).json({
      status: 'success',
      data: comic
    });
  } catch (error) {
    next(error);
  }
};

export const getComics = async (req, res, next) => {
  try {
    const comics = await Comic.find({ author: req.user?.id })
      .sort({ createdAt: -1 })
      .populate('author', 'username email');

    res.json({
      status: 'success',
      results: comics.length,
      data: comics
    });
  } catch (error) {
    next(error);
  }
};

export const getComicById = async (req, res, next) => {
  try {
    const comic = await Comic.findById(req.params.id).populate(
      'author',
      'username email'
    );

    if (!comic) {
      throw new AppError('Comic not found', 404);
    }

    res.json({
      status: 'success',
      data: comic
    });
  } catch (error) {
    next(error);
  }
};

export const updateComic = async (req, res, next) => {
  try {
    const comic = await Comic.findOneAndUpdate(
      { _id: req.params.id, author: req.user?.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!comic) {
      throw new AppError('Comic not found or unauthorized', 404);
    }

    res.json({
      status: 'success',
      data: comic
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComic = async (req, res, next) => {
  try {
    const comic = await Comic.findOneAndDelete({
      _id: req.params.id,
      author: req.user?.id
    });

    if (!comic) {
      throw new AppError('Comic not found or unauthorized', 404);
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
