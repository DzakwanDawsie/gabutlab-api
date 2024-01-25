class PostTopic {
  constructor(id, post_id, topic_id, updated_at) {
    this.id = id;
    this.post_id = post_id;
    this.topic_id = topic_id;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  PostTopic
};