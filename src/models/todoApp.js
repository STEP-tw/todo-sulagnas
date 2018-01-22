const User=require('./user.js');

class TodoApp {
  constructor(fs) {
    this.fs = fs || require('fs')
    this.users = {};
  }
  addUser(newUserName,todos) {
    let user = new User(newUserName);
    todos && user.load(todos);
    this.users[newUserName] = user;
    return user;
  }
  getUser(id) {
    return this.users[id];
  }
  loadUsers(path){
    let users = JSON.parse(this.fs.readFileSync(path));
    users.map((user)=>{
      this.addUser(user.userName,user.todos);
    });
  }
}

module.exports=TodoApp;
