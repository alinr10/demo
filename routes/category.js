import express from 'express';
const router = express.Router();
import Categories from '../models/Categories.js';
import Post from '../models/Post.js';
import checkAuth from '../checkauth.js';

router.post('/categories', checkAuth, async (req, res) => {
  try {
    await Categories.create(req.body);
    res.redirect('/category');
  } catch (error) {
    console.error(error);
    res.status(500).send('Sunucu hatası');
  }
});

router.get('/categories/edit/:id', checkAuth, (req, res) => {
  const editid = req.params.id;
  res.render('site/category-edit', { layout: null, editid });
});

router.post('/categories/edit/:id', checkAuth, async (req, res) => {
  const { name } = req.body;
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send('Kategori bulunamadı');
    }

    res.redirect('/category');
  } catch (error) {
    console.error(error);
    res.status(500).send('Sunucu hatası');
  }
});

router.get('/blog/:category', async (req, res) => {
  try {
    const distinctAuthors = await Post.distinct('author');
    const { author, startDate, endDate } = req.query;
    let authorPosts = [];

    if (author && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      authorPosts = await Post.find({
        author: author,
        date: { $gte: start, $lte: end }
      });
    } else if (author) {
      authorPosts = await Post.find({ author: author });
    }

    const { category } = req.params;
    const categories = await Categories.find({});
    const posts = await Post.find({ category }).sort({ date: 'desc' });

    res.render('site/category-page', { posts, categories, authorPosts, distinctAuthors });
  } catch (error) {
    console.error(error);
    res.status(500).send('Sunucu hatası');
  }
});

router.get('/categories/delete/:id', checkAuth, async (req, res) => {
  try {
    const deletedCategory = await Categories.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      console.log('Kategori bulunamadı');
    }

    res.redirect('/category');
  } catch (error) {
    console.error(error);
    res.status(500).send('Sunucu hatası');
  }
});

export default router;
