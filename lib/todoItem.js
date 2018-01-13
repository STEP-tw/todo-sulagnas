class TodoItem {
  constructor(item) {
    this.item=item;
    this.status=false;
  }
  selectItem() {
    this.status=true;
  }
  unselectItem() {
    this.status=false;
  }
}

module.exports=TodoItem;
