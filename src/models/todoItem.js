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
    let editLink=`<a href=''>edit</a>`;
    let deleteItem = `<label>delete</label>`
    return `<tr><td>${this.item}</td><td>${editLink}</td><td>${deleteItem}</td></tr>`
  }
}


module.exports=TodoItem;
