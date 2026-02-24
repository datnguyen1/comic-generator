import { Comic } from '../models/Comic.js';
import { AppError } from '../middleware/errorHandler.js';
import {
  splitStoryIntoPanels,
  generateAllPanelImages,
} from '../services/aiService.js';
import { savePanelImage } from '../utils/downloadImage.js';

/**
 * Create comic. AI flow: send { title, story, style, numPanels }.
 * Manual flow: send { title, description, panels } (optional, for later).
 */
export const createComic = async (req, res, next) => {
  try {
    const { title, story, style, numPanels } = req.body;

    if (!process.env.HUGGINGFACE_TOKEN) {
      throw new AppError('HUGGINGFACE_TOKEN is not configured', 500);
    }
    if (!title) {
      throw new AppError('Title is required', 400);
    }

    const styleKey = style || 'shounen';
    const n = Math.min(Math.max(Number(numPanels) || 4, 2), 8);

    if (!story || typeof story !== 'string' || story.trim().length === 0) {
      throw new AppError('Story is required for AI generation', 400);
    }

    // Create comic first to get ID for image paths
    const comic = await Comic.create({
      title: title.trim(),
      description: story.trim().slice(0, 500),
      style: styleKey,
      panels: [],
      author: null,
      isPublic: true,
    });

    const panelDescriptions = await splitStoryIntoPanels(story.trim(), n);
    const generated = await generateAllPanelImages(panelDescriptions, styleKey);

    const panels = [];
    for (let i = 0; i < generated.length; i++) {
      const g = generated[i];
      const imagePath = await savePanelImage(g.buffer, comic._id, i);
      panels.push({
        imagePath,
        caption: g.caption || '',
        prompt: g.prompt || '',
      });
    }

    comic.panels = panels;
    await comic.save();

    res.status(201).json({
      status: 'success',
      data: comic,
    });
  } catch (error) {
    next(error);
  }
};

export const getComics = async (req, res, next) => {
  try {
    const comics = await Comic.find({})
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      status: 'success',
      results: comics.length,
      data: comics,
    });
  } catch (error) {
    next(error);
  }
};

export const getComicById = async (req, res, next) => {
  try {
    const comic = await Comic.findById(req.params.id).select('-__v');

    if (!comic) {
      throw new AppError('Comic not found', 404);
    }

    res.json({
      status: 'success',
      data: comic,
    });
  } catch (error) {
    next(error);
  }
};

export const updateComic = async (req, res, next) => {
  try {
    const comic = await Comic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .select('-__v');

    if (!comic) {
      throw new AppError('Comic not found', 404);
    }

    res.json({
      status: 'success',
      data: comic,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComic = async (req, res, next) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);

    if (!comic) {
      throw new AppError('Comic not found', 404);
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
