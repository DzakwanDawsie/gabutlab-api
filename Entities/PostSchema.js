const EntitySchema = require('typeorm').EntitySchema;
const Post = require('../models/Post').Post;

module.exports = new EntitySchema({
  tableName: 'posts',
  name: 'Post',
  target: Post,
  columns: {
    id: {
      primary: true,
      type: 'int',
      nullable: false,
      generated: 'increment',
    },
    user_admin_id: {
      type: 'bigint',
      nullable: false,
    },
    title: {
      type: 'varchar',
      nullable: false,
    },
    content: {
      type: 'text',
      nullable: true,
    },
    photo: {
      type: 'varchar',
      nullable: true,
    },
    status: {
      type: 'enum',
      enum: ['active', 'inactive'],
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
    comments: {
      target: "PostComment",
      type: "one-to-many",
      inverseSide: 'post',
      joinTable: true,
    },
    likes: {
      target: "PostLike",
      type: "one-to-many",
      inverseSide: 'post',
      joinTable: true,
    },
    topics: {
      target: "PostTopic",
      type: "one-to-many",
      inverseSide: 'post',
      joinTable: true,
    }
  }
})