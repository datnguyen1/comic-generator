import mongoose from 'mongoose';

const panelSchema = new mongoose.Schema(
  {
    imagePath: { type: String, required: true },
    caption: { type: String, default: '' },
    prompt: { type: String, default: '' },
  },
  { _id: false }
);

const comicSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    style: { type: String, default: 'shounen' },
    panels: { type: [panelSchema], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    isPublic: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Comic = mongoose.model('Comic', comicSchema);
