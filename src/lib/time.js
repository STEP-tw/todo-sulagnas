exports.timeStamp = (myDateConstructor)=>{
  let DateConstructor = myDateConstructor || Date;
  let t = new DateConstructor();
  return `${t.toDateString()} ${t.toLocaleTimeString()}`;
}
