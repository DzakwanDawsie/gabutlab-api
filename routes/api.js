'use strict';
const CustomerController = require(`../controllers/CustomerController`);
const TopicController = require(`../controllers/TopicController`);
const PostController = require(`../controllers/PostController`);
const PostCommentController = require(`../controllers/PostCommentController`);
const PostLikeController = require(`../controllers/PostLikeController`);
const BannerController = require(`../controllers/BannerController`);
const AuthController = require(`../controllers/AuthController`);
const BaseController = require(`../controllers/BaseController`);

const multer = require('multer');
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

module.exports = function(app) {
  app.post('/auth/login', AuthController.login);
  app.post('/auth/register', AuthController.register);

  app.get('/customers', CustomerController.index);
  app.post('/customers', upload.single('photo'), CustomerController.store);
  app.put('/customers/:id', upload.single('photo'), CustomerController.update);

  app.get('/topics', TopicController.index);
  app.get('/topics/hot', TopicController.hot);
  app.post('/topics', TopicController.store);
  app.put('/topics/:id', TopicController.update);
  app.delete('/topics/:id', TopicController.delete);

  app.get('/posts', PostController.index);
  app.get('/posts/:id', PostController.show);
  app.post('/posts', upload.single('photo'), PostController.store);
  app.put('/posts/:id', upload.single('photo'), PostController.update);
  app.delete('/posts/:id', PostController.delete);

  app.get('/posts/:postId/comments', PostCommentController.index);
  app.post('/posts/:postId/comments', PostCommentController.store);
  app.put('/posts/:postId/comments/:id', PostCommentController.update);

  app.post('/posts/:postId/likes', PostLikeController.store);
  
  app.get('/banners', BannerController.index);
  app.get('/banners/:id', BannerController.show);
  app.post('/banners', upload.single('photo'), BannerController.store);
  app.put('/banners/:id', upload.single('photo'), BannerController.update);
  app.delete('/banners/:id', BannerController.delete);

  app.all('/',BaseController.index);
  app.post('/upload', upload.single('file'), BaseController.upload);
  app.all('/*',BaseController.notFound);
};