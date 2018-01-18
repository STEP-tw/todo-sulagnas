class defaultHandler {
  constructor() {
  }
  execute(req,res){
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports=defaultHandler;
