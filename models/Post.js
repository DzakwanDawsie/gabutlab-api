class Post {
  constructor(id, user_admin_id, title, content, photo, status, updated_at) {
    this.id = id;
    this.user_admin_id = user_admin_id;
    this.title = title;
    this.content = content;
    this.status = status;
    this.photo = photo;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  Post
};