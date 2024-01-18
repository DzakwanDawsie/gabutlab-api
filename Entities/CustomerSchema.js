const EntitySchema = require('typeorm').EntitySchema;
const Customer = require('../models/Customer').Customer;

module.exports = new EntitySchema({
  tableName: 'customers',
  name: 'Customer',
  target: Customer,
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
    email: {
      type: 'varchar',
      nullable: false,
    },
    photo: {
      type: 'varchar',
      nullable: true,
    },
    password: {
      type: 'varchar',
      nullable: false,
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