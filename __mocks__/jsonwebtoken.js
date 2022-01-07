module.exports = {
  token: null,
  id: '',
  secret: '',
  async sign (id, secret) {
    this.id = id
    this.secret = secret
    return this.token
  }
}
