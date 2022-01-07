
module.exports = {
  isValid: true,
  password: '',
  hashedPassword: '',
  async compare (password, hashedPassword) {
    this.password = password
    this.hashedPassword = hashedPassword
    return this.isValid
  }
}
