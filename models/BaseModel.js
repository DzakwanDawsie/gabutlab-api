const database = require('../utils/database');

class BaseModel {
  static async findOneById(id) {
    const connection = await database.getConnection();
    const repository = await connection.getRepository(this);
  
    return repository.findOneBy({ id })
  }
}

module.exports = {
  BaseModel
};