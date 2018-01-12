const generateTable=function () {
	let table=document.getElementById('showTodo');
  let todoListkeys=['title','description','item'];
  for(let element=0;element<todoList.length;element++){
	let line=document.createElement('hr');
  // let details=todoList[element];
  // let keyList=Object.keys(details);
    for(let index=0;index<3;++index){
			let para=document.createElement('p');
			para.innerHTML=todoList[element][todoListkeys[index]];
      line.appendChild(para);
    }
    table.appendChild(line);
  }
};

window.onload=generateTable;
