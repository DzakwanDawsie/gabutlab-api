class Customer {
  constructor(id, name, email, photo, salt, password, status, updated_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.photo = photo;
    this.status = status;
    this.salt = salt;
    this.password = password;
    this.updated_at = updated_at;

    if (!this.created_at) {
      this.created_at = (new Date).toISOString();
    }
  }
}

module.exports = {
  Customer
};