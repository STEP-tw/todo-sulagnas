class TodoItem {
  constructor(id,item) {
    this.item=item;
    this.done=false;
    this.id=id;
  }
  getItem() {
    return this.item;
  }
  getId() {
    return this.id;
  }
  editTodoItem(editedTodoItem) {
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
}

module.exports=TodoItem;
