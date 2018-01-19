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
}

module.exports=TodoItem;
