'use strict';

const bcrypt = require('bcrypt');
const response = require('../utils/response');
const database = require('../utils/database');
const Customer = require('../models/Customer').Customer;

exports.index = async (req, res) => {
  const customers = await database.find(Customer);

  response.success(res, { customers });
};

exports.store = async (req, res) => {
  const body = req.body;
  
  const customer = new Customer;
  customer.name = body.name;
  customer.email = body.email;
  customer.password = bcrypt.hashSync(body.password, 10);
  customer.status = body.status;
  
  await database.save(Customer, customer);

  response.success(res);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  
  const customer = await database.findOneById(Customer, id);

  if (body.name) {
    customer.name = body.name;
  }

  if (body.email) {
    customer.email = body.email;
  }

  if (body.status) {
    customer.status = body.status;
  }

  if (body.password) {
    customer.password = bcrypt.hashSync(body.password, 10);
  }

  if (file) customer.photo = file.filename;
  
  await database.save(Customer, customer);

  response.success(res);
};