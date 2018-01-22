let timeStamp = ()=>new Date().getTime();

class SessionManager {
  constructor(filePath,fs,myTimeStamp) {
    this.filePath = filePath;
    this.fs = fs || require('fs');
    this.timeStamp = myTimeStamp || timeStamp;
  }
  init(){
    if(this.fs.existsSync(this.filePath)){
      this.loggedInUsers = JSON.parse(this.fs.readFileSync(this.filePath,'utf8'));
    }else{
      this.loggedInUsers = {};
    }
  }
  save(){
    this.fs.writeFileSync(this.filePath,JSON.stringify(this.loggedInUsers,null,'\t'),'utf8');
  }
  createSessionFor(user){
    let session = {Id:this.timeStamp(),user};
    this.loggedInUsers[session.Id] = session;
    this.save();
    return session;
  }
  loadSessionBy(id){
    return this.loggedInUsers[id];
  }
  removeSessionBy(id){
    delete this.loggedInUsers[id];
    this.save();
  }
}

SessionManager.createFrom = (filePath,fs,timeStamp)=> {
  let sm = new SessionManager(filePath,fs,timeStamp);
  sm.init();
  return sm;
}

module.exports = SessionManager;
