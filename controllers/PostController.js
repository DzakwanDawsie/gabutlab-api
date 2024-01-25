'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const { PostTopic } = require('../models/PostTopic');
const { PostComment } = require('../models/PostComment');
const { Like } = require('typeorm');
const Post = require('../models/Post').Post;

exports.index = async (req, res) => {
  const query = req.query;
  
  console.log(query);

  const where = {};
  if (query.topic) where.topics = { detail: { name: query.topic } };
  if (query.keyword) where.title = Like(`%${query.keyword}%`);

  const rawPosts = await database.findWithOptions(Post, {
    where,
    relations: ['topics.detail', 'likes'],
    order: {
      topics: {
        id: 'asc'
      }
    }
  });

  const posts = rawPosts.map(post => {
    post.likes_count = post.likes.length;

    delete post.likes;

    return post
  })

  response.success(res, { posts });
};

exports.show = async (req, res) => {
  const id = req.params.id;

  const post = await database.findOneWithOptions(Post, {
    where: { 
      id,
    },
    relations: ['topics.detail', 'comments.customer', 'likes'],
    order: {
      comments: {
        id: 'desc'
      }
    }
  });
  

  console.log(id);

  post.comments = post.comments.filter(comment => comment.parent_id == 0);

  post.comments = await Promise.all(post.comments.map(async (comment) => {
    if (!comment.parent_id) return comment;
    
    comment.comments = await database.findWithOptions(PostComment, {
      relations: ['customer'],
      where: { parent_id: comment.id }
    });
    
    return comment;
  }))

  post.likes_count = post.likes.length;

  if (!post) {
    response.failed(res, 'Failed to get data');
    return false;
  }

  response.success(res, { post });
};

exports.store = async (req, res) => {
  const body = req.body;
  const file = req.file;

  const newPost = new Post;
  newPost.user_admin_id = body.user_admin_id;
  newPost.title = body.title;
  newPost.content = body.content;
  newPost.photo = file.filename;
  newPost.status = body.status || 'active';
  
  const post = await database.save(Post, newPost);

  for (const topic_id of body.topic_ids) {
    const postTopic = new PostTopic;
    postTopic.post_id = post.id;
    postTopic.topic_id = topic_id;
    
    await database.save(PostTopic, postTopic);
  }

  response.success(res);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  
  const post = await database.findOneById(Post, id);

  if (!post) return response.failed(res, 'Post is not found.')

  post.user_admin_id = body.user_admin_id;
  post.title = body.title;
  post.content = body.content;
  post.status = body.status;

  if (file) post.photo = file.filename;
  
  await database.save(Post ,post);

  await database.deleteByColumns(PostTopic, { post_id: post.id });

  for (const topic_id of body.topic_ids) {
    const postTopic = new PostTopic;
    postTopic.post_id = post.id;
    postTopic.topic_id = topic_id;
    
    await database.save(PostTopic, postTopic);
  }

  response.success(res);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await database.deleteById(Post, id);
  await database.deleteByColumns(PostTopic, { post_id: id });

  response.success(res);
};