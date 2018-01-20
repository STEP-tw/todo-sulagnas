let fs=require('fs');
let head=fs.readFileSync('./headTodo.txt');
let tail=fs.readFileSync('./tailTodo.txt');

class ViewTodoHandler {
  constructor() {
  }
  execute(req,res){
    let todoId=req.body.todoId;
    let todo=req.user.getTodo(todoId);
    if(!todo){
      res.write('file not found');
      res.end();
    }
    res.write(`${head}${todo.toHtml()}${tail}`);
    res.end();
  }
};

module.exports=ViewTodoHandler;
