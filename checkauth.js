// checkauth.js

const checkAuth = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.send('Giriş yetkiniz yok!');
    }
  };
  
  module.exports = checkAuth;
  