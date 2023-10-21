import express from 'express';
const router = express.Router();
import Users from '../models/User.js';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (user && user.password === password) {
      req.session.userId = user._id;
      res.redirect('/admin');
    } else {
      res.redirect('/login');
      console.log('else girdi');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Sunucu hatası');
  }
});

export default router;
