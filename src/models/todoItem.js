class TodoItem {
  constructor(id,item) {
    this.item=item;
    this.done=false;
    this.id=id;
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
}

module.exports=TodoItem;
