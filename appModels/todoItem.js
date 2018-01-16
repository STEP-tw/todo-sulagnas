class TodoItem {
  constructor(id,item) {
    this.item=item;
    this.done=false;
    this.id=id;
  }
  doneItem() {
    this.done=true;
  }
  undoneItem() {
    this.done=false;
  }
}

module.exports=TodoItem;
