const DefaultHandler=require('./defaultHandler.js');

class listTodosHandler extends DefaultHandler{
  constructor(fs) {
    super();
    this.fs=fs || require('fs');
  }
  execute(req,res) {
    let listTodosHtml=this.fs.readFileSync('./templates/listTodos.html','utf8');
    let todosAsHtml = req.user.toHtmlRow();
    res.setHeader('Content-Type','text/html');
    res.write(listTodosHtml.replace('allTodos',todosAsHtml));
    res.end();
  }
}
module.exports=listTodosHandler;
