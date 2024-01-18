'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const PostComment = require('../models/PostComment').PostComment;

exports.index = async (req, res) => {
  const { postId: post_id } = req.params;
  const comments = database.findByOptions(PostComment, { post_id })

  response.success(res, { comments });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  
  const comment = await database.findOneById(PostComment, id);
  comment.status = body.status;
  
  await database.save(comment);

  response.success(res);
};