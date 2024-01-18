class Banner {
  constructor(id, title, photo, status, updated_at) {
    this.id = id;
    this.title = title;
    this.photo = photo;
    this.status = status;
    this.photo = photo;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  Banner
};