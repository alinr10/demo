import mongoose from 'mongoose';

const { Schema } = mongoose;

const Categories = new Schema({
  name: { type: String, required: true }
});

const CategoryModel = mongoose.model('category', Categories);

export default CategoryModel;
