const EntitySchema = require('typeorm').EntitySchema;
const PostTopic = require('../models/PostTopic').PostTopic;

module.exports = new EntitySchema({
  tableName: 'post_topics',
  name: 'PostTopic',
  target: PostTopic,
  columns: {
    id: {
      primary: true,
      type: 'int',
      nullable: false,
      generated: 'increment',
    },
    post_id: {
      type: 'bigint',
      nullable: false,
    },
    topic_id: {
      type: 'bigint',
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
    detail: {
      target: "Topic",
      type: "many-to-one",
      joinTable: true,
      joinColumn: {
        name: 'topic_id'
      },
      inverseSide: 'post_topics'
    },
    post: {
      target: "Post",
      type: "many-to-one",
      joinTable: true,
      joinColumn: {
        name: "post_id"
      },
      inverseSide: 'topics',
    },
  }
})