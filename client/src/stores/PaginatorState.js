import { action, computed, observable } from 'mobx';


class PaginatorState {

  @observable availablePageSizes = [10, 20, 30, 50, 100];
  @observable current = 0;
  @observable total = 0;
  @observable pageSize = this.availablePageSizes[0];
  links;
  currentUrl;

  @computed get canFirst() { return this.current > 1; }

  @computed get canPrev() { return this.current > 1; }

  @computed get canNext() { return this.current > 0 && this.current < this.total; }

  @computed get canLast() { return this.current > 0 && this.current < this.total; }

  @action
  next() {
    if (!this.canNext) { return false; }
    this.currentUrl = this.links.next.url;
    return true;
  }

  @action
  prev() {
    if (!this.canPrev) { return false; }
    this.currentUrl = this.links.prev.url;
    return true;
  }

  @action
  first() {
    if (!this.canFirst) { return false; }
    this.currentUrl = this.links.first.url;
    return true;
  }

  @action
  last() {
    if (!this.canLast) { return false; }
    this.currentUrl = this.links.last.url;
    return true;
  }
}


export default PaginatorState;
