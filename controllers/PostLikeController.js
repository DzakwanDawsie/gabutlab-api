'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const { PostLike } = require('../models/PostLike');

exports.store = async (req, res) => {
  const post_id = req.params.postId;
  const body = req.body;
  const customer_id = body.customer_id

  var like = await database.findOneByColumns(PostLike, {
    post_id,
    customer_id
  })

  if (!like) {
    like = new PostLike;
    like.customer_id = customer_id;
    like.post_id = post_id;

    await database.save(PostLike, like);
  } else {
    await database.deleteByColumns(PostLike, { post_id, customer_id });
  }

  response.success(res);
};