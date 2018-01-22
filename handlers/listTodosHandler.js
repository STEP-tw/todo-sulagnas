
class listTodosHandler {
  constructor() {}
  execute(req,res) {
    let todosAsHtml = req.user.toHtmlRow();
    res.setHeader('Content-Type','text/html');
    res.write(todosAsHtml);
    res.end();
  }
}
module.exports=listTodosHandler;
