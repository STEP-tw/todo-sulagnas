let fs=require('fs');
const timeStamp = require('./time.js').timeStamp;
const getRegistered_users=function () {
  let userDetails=fs.readFileSync('./data/userDetails.json','utf8');
  return JSON.parse(userDetails);
}

let registered_users=getRegistered_users();

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
};

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

exports.registered_users=registered_users;
exports.logRequest=logRequest;
exports.loadUser=loadUser;
