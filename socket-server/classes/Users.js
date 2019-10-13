class Users {
  constructor() {
    this.users = []
  }

  addUser(id, user) {
    this.users.push({id, user})
    return this.users
  }

  getUserInfo(id) {
    return this.users.find(user => user.id === id)
  }

  getUsersPerRoom() {
    // ...
  }

  getUsers () {
    return this.users
  }

  removeUser(id) {
    let removedUser = this.getUserInfo(id)
    this.users = this.users.filter(user => user.id !== id)
    return removedUser
  }
}

module.exports = {Users}
