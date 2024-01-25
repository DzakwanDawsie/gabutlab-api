const typeorm = require("typeorm");
const CustomerSchema = require('../Entities/CustomerSchema');
const PostSchema = require("../Entities/PostSchema");
const PostCommentSchema = require("../Entities/PostCommentSchema");
const BannerSchema = require("../Entities/BannerSchema");
const TopicSchema = require("../Entities/TopicSchema");
const PostTopicSchema = require("../Entities/PostTopicSchema");
const PostLikeSchema = require("../Entities/PostLikeSchema");

const getConnection = async () => {
  try {
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
            TopicSchema,
            PostSchema,
            PostTopicSchema,
            PostCommentSchema,
            PostLikeSchema,
            BannerSchema,
        ],
    }).initialize();
  } catch(e) {
    console.error(e);
  }
}

const findOneById = async (model, id) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findOneBy({ id }).finally(() => connection.close())
}

const findOneWithOptions = async (model, options) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findOne(options).finally(() => connection.close())
}

const findOneByColumns = async (model, columns) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findOneBy(columns).finally(() => connection.close())
}

const findByColumns = async (model, columns) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.find({
    where: columns
  }).finally(() => connection.close())
}

const find = async (model) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.find().finally(() => connection.close());
}

const findWithOptions = async (model, options) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.find(options).finally(() => connection.close())
}

const findById = async (model, id) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.findBy({ id }).finally(() => connection.close());
}

const save = async (model, object) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.save(object).finally(() => connection.close());
}

const deleteById = async (model, id) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.delete({ id }).finally(() => connection.close());
}

const deleteByColumns = async (model, columns) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.delete(columns).finally(() => connection.close());
}

const queryManager = async (model) => {
  const connection = await getConnection();
  const repository = connection.getRepository(model);

  return repository.manager;
}

const entityManager = async () => {
  const connection = await getConnection();
  
  return connection.createEntityManager();
}

module.exports = {
  getConnection,
  findOneById,
  findByColumns,
  findWithOptions,
  find,
  findById,
  save,
  deleteById,
  deleteByColumns,
  findOneWithOptions,
  findOneByColumns,
  queryManager,
  entityManager
}