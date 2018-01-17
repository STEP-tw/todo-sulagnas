let User=require('../models/user.js');

let sulagna=new User(1,'sulagna');
sulagna.addTodo('sleep is important','it is good for health');
sulagna.addTodoItem(1,'sleep at 1 AM');
sulagna.addTodoItem(1,'wake up at 5 AM');
