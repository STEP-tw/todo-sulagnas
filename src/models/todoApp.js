const User=require('./user.js');

class TodoApp {
  constructor() {
    this.users=[];
    this.userCount=0;
  }
  getCurrentUserId() {
    return this.userCount++;
  }
  addUser(newUserName) {
    let currentUserId=this.getCurrentUserId();
    let newUser=new User(currentUserId,newUserName);
    this.users.push(newUser);
  }
  getUser(id) {
    return this.users.find(user=>user.id==id);
  }
}

module.exports=TodoApp;
