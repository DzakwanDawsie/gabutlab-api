'use strict';

const response = require('../utils/response');

exports.index = async (req, res) => {
  console.log(req);
  response.success(res);
};

exports.upload = async (req, res) => {
  const file = req.file;
  const filename = file.filename;
  
  response.success(res, { filename });
};

exports.notFound = async (req, res) => {
  response.failed(res);
};