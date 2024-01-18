class PostComment {
  constructor(id, post_id, customer_id, parent_id, content, status, updated_at) {
    this.id = id;
    this.post_id = this.post_id;
    this.customer_id = customer_id;
    this.parent_id = parent_id;
    this.content = content;
    this.status = status;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  PostComment
};