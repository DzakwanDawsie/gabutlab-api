'use strict';

const response = require('../utils/response');

exports.index = async (req, res) => {
  response.success(res, 'Success');
};

exports.notFound = async (req, res) => {
  response.failed(res);
};