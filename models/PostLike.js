class PostLike {
  constructor(id, post_id, customer_id, updated_at) {
    this.id = id;
    this.post_id = this.post_id;
    this.customer_id = customer_id;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  PostLike
};