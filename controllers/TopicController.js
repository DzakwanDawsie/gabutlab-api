'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const Topic = require('../models/Topic').Topic;

exports.index = async (req, res) => {
  const topics = await database.find(Topic)

  response.success(res, { topics });
};

exports.hot = async (req, res) => {
  const rawTopics = await database.findWithOptions(Topic, {
    relations: ['post_topics']
  })

  const topics = rawTopics.map(topic => {
    topic.post_count = topic.post_topics.length;

    delete topic.post_topics;

    return topic;
  })

  response.success(res, { topics });
};

exports.store = async (req, res) => {
  const body = req.body;
  
  const topic = new Topic
  topic.name = body.name;
  
  await database.save(Topic, topic);

  response.success(res);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  
  const topic = await database.findOneById(Topic, id);
  topic.name = body.name;
  
  await database.save(Topic, topic);

  response.success(res);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await database.deleteById(id);

  response.success(res);
};