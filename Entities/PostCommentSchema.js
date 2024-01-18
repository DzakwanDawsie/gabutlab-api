const EntitySchema = require('typeorm').EntitySchema;
const PostComment = require('../models/PostComment').PostComment;

module.exports = new EntitySchema({
  tableName: 'post_comments',
  name: 'PostComment',
  target: PostComment,
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
    parent_id: {
      type: 'bigint',
      nullable: false,
      default: 0
    },
    content: {
      type: 'text',
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
  }
})