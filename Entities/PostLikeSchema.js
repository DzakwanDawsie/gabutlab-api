const EntitySchema = require('typeorm').EntitySchema;
const PostLike = require('../models/PostLike').PostLike;

module.exports = new EntitySchema({
  tableName: 'post_likes',
  name: 'PostLike',
  target: PostLike,
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
    customer_id: {
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
    post: {
      target: "Post",
      type: "many-to-one",
      joinTable: true,
      joinColumn: {
        name: "post_id"
      },
      inverseSide: 'comments',
    },
    customer: {
      target: "Customer",
      type: "many-to-one",
      joinTable: true,
      joinColumn: {
        name: "customer_id"
      },
      inverseSide: 'comments',
    },
  }
})