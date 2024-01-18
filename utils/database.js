const typeorm = require("typeorm");
const CustomerSchema = require('../Entities/CustomerSchema');
const PostSchema = require("../Entities/PostSchema");
const PostCommentSchema = require("../Entities/PostCommentSchema");
const BannerSchema = require("../Entities/BannerSchema");

const getConnection = async () => {
  return new typeorm.DataSource({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "naonao123!",
      database: "gabutlab",
      synchronize: true,
      logging: false,
      entities: [
          CustomerSchema,
          PostSchema,
          PostCommentSchema,
          BannerSchema,
      ],
  }).initialize();
}

const findOneById = async (model, id) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findOneBy({ id })
}

const findByOptions = async (model, options) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findOneBy(options)
}

const find = async (model) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.find({  });
}

const findById = async (model, id) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findBy({ id });
}

const save = async (model, object) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.save(object);
}

const deleteById = async (model, id) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.delete({ id });
}

module.exports = {
  getConnection,
  findOneById,
  findByOptions,
  find,
  findById,
  save,
  deleteById
}