class TodoItem {
  constructor(item) {
    this.item=item;
    this.done=false;
  }
  getItem() {
    return this.item;
  }
  edit(editedTodoItem) {
    this.item=editedTodoItem;
  }
  markAsDone() {
    this.done=true;
  }
  markAsUndone() {
    this.done=false;
  }
  isDone() {
    return this.done;
  }
  toHtml() {
    let deleteButton = `<button onclick=${deleteItem()}>delete<button>`;
    let editLink=`<a href=''>edit</a>`;
    return `<tr><td>${this.item}</td><td>${editLink}</td><td>${deleteButton}</td></tr>`
  }
}


module.exports=TodoItem;
