'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const PostComment = require('../models/PostComment').PostComment;

exports.index = async (req, res) => {
  const post_id = req.params.postId;
  const comments = await database.findByColumns(PostComment, { post_id })

  response.success(res, { comments });
};

exports.store = async (req, res) => {
  const postId = req.params.postId;
  const body = req.body;
  
  const comment = new PostComment
  comment.customer_id = body.customer_id;
  comment.post_id = postId;
  comment.content = body.content;
  comment.parent_id = body.parent_id ?? 0;
  comment.status = body.status ?? 'active';

  await database.save(PostComment, comment);

  response.success(res);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  
  const comment = await database.findOneById(PostComment, id);
  comment.status = body.status;
  
  await database.save(comment);

  response.success(res);
};