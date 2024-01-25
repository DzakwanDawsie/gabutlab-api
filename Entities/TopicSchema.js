const EntitySchema = require('typeorm').EntitySchema;
const Topic = require('../models/Topic').Topic;

module.exports = new EntitySchema({
  tableName: 'topics',
  name: 'Topic',
  target: Topic,
  columns: {
    id: {
      primary: true,
      type: 'int',
      nullable: false,
      generated: 'increment',
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    created_at: {
      type: 'timestamp',
      nullable: true,
    },
    updated_at: {
      type: 'timestamp',
      nullable: true,
    }
  },
  relations: {
    post_topics: {
      target: "PostTopic",
      type: "one-to-many",
      inverseSide: 'detail',
      joinTable: true,
    }
  }
})