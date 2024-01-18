'use strict';
const CustomerController = require(`../controllers/CustomerController`);
const PostController = require(`../controllers/PostController`);
const PostCommentController = require(`../controllers/PostCommentController`);
const BannerController = require(`../controllers/BannerController`);
const BaseController = require(`../controllers/BaseController`);

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

module.exports = function(app) {
  app.get('/customers', CustomerController.index);
  app.post('/customers', CustomerController.store);
  app.put('/customers/:id', CustomerController.update);

  app.get('/posts', PostController.index);
  app.get('/posts/:id', PostController.show);
  app.post('/posts', upload.single('photo'), PostController.store);
  app.put('/posts/:id', upload.single('photo'), PostController.update);
  app.delete('/posts/:id', PostController.delete);

  app.get('/posts/:postId/comments', PostCommentController.index);
  app.put('/posts/:postId/comments/:id', PostCommentController.update);

  app.get('/banners', BannerController.index);
  app.get('/banners/:id', BannerController.show);
  app.post('/banners', upload.single('photo'), BannerController.store);
  app.put('/banners/:id', upload.single('photo'), BannerController.update);
  app.delete('/banners/:id', BannerController.delete);

  app.all('/',BaseController.index);
  app.all('/*',BaseController.notFound);
};