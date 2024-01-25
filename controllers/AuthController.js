'use strict';

const bcrypt = require('bcrypt');
const response = require('../utils/response');
const database = require('../utils/database');
const Customer = require('../models/Customer').Customer;

exports.login = async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  if (!email || !password) {
    return response.failed(res, 'Email and password is required.');
  }

  const customer = await database.findOneByColumns(Customer, { email });

  if (!customer) {
    return response.failed(res, 'Email not found.');
  }

  if (!bcrypt.compareSync(password, customer.password)) {
    return response.failed(res, 'Email or password is incorrect.');
  }

  response.success(res, { customer });
};

exports.register = async (req, res) => {
  const body = req.body;
  
  const newCustomer = new Customer;
  newCustomer.name = body.name;
  newCustomer.email = body.email;
  newCustomer.password = bcrypt.hashSync(body.password, 10);
  
  const customer = await database.save(Customer, newCustomer);

  response.success(res, { customer });
};