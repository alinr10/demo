import mongoose from 'mongoose';

const { Schema } = mongoose;

const AiPostSchema = new Schema({
  content: { type: String, required: true }
});

const AiPostModel = mongoose.model('ai', AiPostSchema);

export default AiPostModel;
