'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const Post = require('../models/Post').Post;

exports.index = async (req, res) => {
  const posts = await database.find(Post);

  response.success(res, { posts });
};

exports.show = async (req, res) => {
  const id = req.params.id;
  const post = await database.findOneById(Post, id);

  if (!post) {
    response.failed(res, 'Failed to get data');
    return false;
  }

  response.success(res, { post });
};

exports.store = async (req, res) => {
  const body = req.body;
  const file = req.file;

  const post = new Post;
  post.user_admin_id = body.user_admin_id;
  post.title = body.title;
  post.content = body.content;
  post.photo = file.filename;
  post.status = body.status;
  
  await database.save(Post, post);

  response.success(res);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  
  const post = await database.findOneById(Post, id);
  post.user_admin_id = body.user_admin_id;
  post.title = body.title;
  post.content = body.content;
  post.status = body.status;

  if (file) post.photo = file.filename;
  
  await database.save(Post ,post);

  response.success(res);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await database.deleteById(Post, id);

  response.success(res);
};