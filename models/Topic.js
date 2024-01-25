class Topic {
  constructor(id, name, updated_at) {
    this.id = id;
    this.name = name;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  Topic
};