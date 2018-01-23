let actualFs=require('fs');
const actualTimeStamp = require('./time.js').timeStamp;

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res,myFs,myTimeStamp)=>{
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
};

let redirectLoggedOutUserToLogin = function(req,res){
  if(!req.urlIsOneOf(['/loginPage.html','/index.html','/css/styleSheet.css','/']) && !req.user){
    res.redirect('/loginPage.html');
  }
}

exports.logRequest=logRequest;
exports.redirectLoggedOutUserToLogin=redirectLoggedOutUserToLogin;
