let timeStamp = ()=>new Date().getTime();

let addSession = function(session,sessionManger){
  sessionManger.loggedInUsers[session.Id] = session;
  sessionManger.save()
}

class SessionManager {
  constructor(filePath,fs) {
    this.filePath = filePath;
    this.fs = fs || require('fs');
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
    let session = {Id:timeStamp(),user};
    addSession(session,this);
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

SessionManager.createFrom = (filePath,fs)=> {
  let sm = new SessionManager(filePath,fs);
  sm.init();
  return sm;
}

module.exports = SessionManager;
