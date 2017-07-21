import { action, computed, observable } from 'mobx';
import * as moment from 'moment';
import Github from '../services/Github';
import PaginatorState from './PaginatorState';
import { IssueInfo, RepoInfo, UserInfo } from './models';


class IssueListState {

  @observable owner;
  @observable repo;
  @observable issues = [];
  @observable pagination = new PaginatorState();
  @observable loadingIssues = false;
  @observable error = null;
  @observable ownerRepos;
  @observable loadingRepos = false;
  sortField = null
  @observable sortDirection = 'desc'

  constructor({ owner = '', repo = '' }) {
    this.owner = owner;
    this.repo = repo;
  }

  @action
  updateRepos = ({ data }) => {
    this.ownerRepos = { owner: this.owner, repos: data.map(r => new RepoInfo(r.id, r.name)) };
    this.loadingRepos = false;
    this.error = null;
  };

  @action
  loadRepos() {
    if (!this.owner) {
      return Promise.resolve();
    }
    this.loadingRepos = true;
    return Github.repos({ owner: this.owner })
      .then(this.updateRepos)
      .catch(this.handleLoadReposError);
  }

  @action
  handleLoadReposError = (err) => {
    this.ownerRepos = { owner: this.owner, repos: [], error: err };
    this.handleError(err, true);
  };

  @action
  updateIssues = ({ data, pagination: pg }) => {
    this.issues = data.map(i =>
      new IssueInfo(i.number, i.title, moment(i.created_at).format('YYYY-MM-DD HH:mm'),
        new UserInfo(i.user.login, i.user.avatar_url, i.user.html_url))
    );
    this.pagination.links = pg;
    this.pagination.currentUrl = null;
    this.pagination.current = (pg && ((pg.next && +pg.next.page - 1) || (pg.prev && +pg.prev.page + 1))) || this.pagination.current;
    this.pagination.total = (pg && pg.last && +pg.last.page) || this.pagination.total;
    this.loadingIssues = false;
    this.error = null;
  };

  @action
  handleError = (err, quiet = false) => {
    if (!quiet) {
      this.error = err;
    }
    this.loadingIssues = false;
    this.loadingRepos = false;
  };

  @action
  loadIssues() {
    if (!this.owner || !this.repo) {
      return Promise.resolve();
    }
    this.loadingIssues = true;
    return Github.issues({ owner: this.owner, repo: this.repo, pagination: this.pagination, sort: this.sortField, direction: this.sortDirection })
      .then(this.updateIssues)
      .catch(this.handleError);
  }

  @action
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  getSortDirection(field) {
    if (this.sortField === field) {
      return this.sortDirection;
    }
    return '';
  }

  sort(field) {
    if (this.sortField === field) {
      this.toggleSortDirection();
    } else {
      this.sortField = field;
      if (!this.sortDirection) {
        this.sortDirection = 'desc';
      }
    }
    this.loadIssues();
  }

  @action
  search() {
    this.pagination.current = 0;
    this.pagination.total = 0;
    return this.loadIssues();
  }
}


export default IssueListState;
