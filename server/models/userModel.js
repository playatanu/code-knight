import { Schema, models, model } from 'mongoose';

const userSchemma = new Schema(
  {
    name: { type: String, require: true },
    username: { type: String, unique: true, require: true },
    bio: { type: String, default: '' },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String, default: '' },
    photo: { type: String, default: '' },
    social: { type: String, default: '' },
    varified: { type: Boolean, default: false },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default models.User || model('User', userSchemma);
