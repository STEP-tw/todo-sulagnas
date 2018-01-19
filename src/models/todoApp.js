const User=require('./user.js');

class TodoApp {
  constructor() {
    this.users={};
    this.userCount=0;
  }
  addUser(newUserName,todos) {
    let user = new User(newUserName);
    todos && user.load(todos);
    this.users[newUserName] = user;
  }
  getUser(id) {
    return this.users[id];
  }
}

module.exports=TodoApp;
