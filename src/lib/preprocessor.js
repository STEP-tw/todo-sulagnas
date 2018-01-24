let actualFs=require('fs');
const actualTimeStamp = require('./time.js').timeStamp;

let toS = o=>JSON.stringify(o,null,2);

let doesIncludes = (list,element)=>list.includes(element);

let logRequest = (req,res,next,myFs,myTimeStamp)=>{
  console.log("logRequest is called");
  let fs = myFs || actualFs;
  let timeStamp = myTimeStamp || actualTimeStamp;
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFileSync('request.log',text);
  console.log(`${req.method} ${req.url}`);
  next();
};

let redirectLoggedOutUserToLogin = function(req,res,next){
  if(!doesIncludes(['/loginPage.html','/index.html','/css/styleSheet.css','/'],req.url) && !req.user){
    res.redirect('/loginPage.html');
  }
  next();
}

exports.logRequest=logRequest;
exports.redirectLoggedOutUserToLogin=redirectLoggedOutUserToLogin;
