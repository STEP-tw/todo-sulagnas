const User=require('./user.js');

class TodoApp {
  constructor(path,fs) {
    this.filePath = path;
    this.fs = fs || require('fs')
    this.users = {};
  }
  getUsers(){
    let users = [];
    Object.keys(this.users).forEach((user)=>{
      users.push(this.users[user].getDetails());
    });
    return users;
  }
  save(){
    this.fs.writeFileSync(this.filePath,JSON.stringify(this.getUsers(),null,"\t"));
  }
  addUser(newUserName,todos) {
    let user = new User(newUserName);
    todos && user.load(todos);
    this.users[newUserName] = user;
    return user;
  }
  addTodo(userId,title,description) {
    let user=this.getUser(userId);
    user.addTodo(title,description);
    this.save();
  }
  getUser(id) {
    return this.users[id];
  }
  deleteTodo(userId,todoId) {
    let user=this.getUser(userId);
    user.deleteTodo(todoId);
  }
  loadUsers(){
    let users = JSON.parse(this.fs.readFileSync(this.filePath));
    users.map((user)=>{
      this.addUser(user.userName,user.todos);
    });
  }
}

module.exports=TodoApp;
