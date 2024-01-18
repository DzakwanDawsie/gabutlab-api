'use strict';

const response = require('../utils/response');
const database = require('../utils/database');
const Banner = require('../models/Banner').Banner;

exports.index = async (req, res) => {
  const banners = await database.find(Banner);

  response.success(res, { banners });
};

exports.show = async (req, res) => {
  const id = req.params.id;
  const banner = await database.findOneById(Banner, id);

  if (!banner) {
    response.failed(res, 'Failed to get data');
    return false;
  }

  response.success(res, { banner });
};

exports.store = async (req, res) => {
  const body = req.body;
  const file = req.file;

  const banner = new Banner;
  banner.title = body.title;
  banner.photo = file.filename;
  banner.status = body.status;
  
  await database.save(Banner, banner);

  response.success(res);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.file;
  
  const banner = await database.findOneById(Banner, id);
  banner.title = body.title;
  banner.status = body.status;

  if (file) banner.photo = file.filename;
  
  await database.save(Banner ,banner);

  response.success(res);
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await database.deleteById(Banner, id);

  response.success(res);
};