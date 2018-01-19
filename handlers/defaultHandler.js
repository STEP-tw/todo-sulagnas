class defaultHandler {
  constructor() {
  }
  execute(req,res){
  }
  redirectTo(res,location) {
    res.redirect(location);
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports=defaultHandler;
