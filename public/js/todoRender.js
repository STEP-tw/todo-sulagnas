const generateTable=function () {
	let table=document.getElementById('showTodo');
  let keyList=['title','description','item'];
  for(let element=0;element<todoList.length;element++){
	let line=document.createElement('hr');
    for(let index=0;index<keyList.length;++index){
			let para=document.createElement('p');
			para.innerHTML=`${todoList[element][keyList[index]]}`;
      line.appendChild(para);
    }
    table.appendChild(line);
  }
};

window.onload=generateTable;
