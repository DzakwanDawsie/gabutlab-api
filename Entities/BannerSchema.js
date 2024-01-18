const EntitySchema = require('typeorm').EntitySchema;
const Banner = require('../models/Banner').Banner;

module.exports = new EntitySchema({
  tableName: 'banners',
  name: 'Banner',
  target: Banner,
  columns: {
    id: {
      primary: true,
      type: 'int',
      nullable: false,
      generated: 'increment',
    },
    title: {
      type: 'varchar',
      nullable: false,
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
  }
})