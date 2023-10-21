import mongoose from 'mongoose';

const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  post_image: { type: String },
  author: { type: String, required: true },
  category: { type: String, required: true }
});

const BlogPostModel = mongoose.model('post', BlogPostSchema);

export default BlogPostModel;
