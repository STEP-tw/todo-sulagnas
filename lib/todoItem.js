class todoItem {
  constructor(item) {
    this.item=item;
    this.status=false;
  }
  selectItem(status) {
    this.status=true;
  }
  unselectItem(status) {
    this.status=false;
  }
}
