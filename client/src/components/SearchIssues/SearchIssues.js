import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import styles from './searchIssues.css';
import { changeProp } from '../../stores/utils';
import IssueListState from '../../stores/IssueListState';


@inject('issueListState')
@observer
class SearchIssues extends React.Component {

  static propTypes = {
    issueListState: PropTypes.instanceOf(IssueListState).isRequired,
  };

  search = () => { this.props.issueListState.search(); };

  loadRepos = () => {
    const { ownerRepos } = this.props.issueListState;
    if (ownerRepos && ownerRepos.owner === this.props.issueListState.owner) {
      return;
    }
    this.props.issueListState.loadRepos();
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.loadRepos();
  };

  @action
  onInputChange = event => changeProp(event, this.props.issueListState);

  onRepoChange = (event) => {
    const store = this.props.issueListState;
    const { ownerRepos: { repos } } = store;
    this.onInputChange(event);
    if (repos && repos.find(r => r.name === store.repo)) {
      this.search();
    }
  };

  render() {
    const store = this.props.issueListState;
    const options = SearchIssues.getDataListOptions(store);
    return (
        <div className={styles['search-box']} disabled={store.loadingIssues}>
          <form onSubmit={this.onSubmit}>
            <input value={store.owner} onChange={this.onInputChange} name="owner" type="text"
                   placeholder="Пользователь" />
            <input value={store.repo} onChange={this.onRepoChange} onFocus={this.loadRepos}
                   readOnly={store.loadingRepos} placeholder={store.loadingRepos ? 'Загрузка...' : 'Репозиторий'}
                   autoComplete="on" list="ownerRepos" name="repo" type="text" />
            <datalist id="ownerRepos">{options}</datalist>
            <button onClick={this.search} type="submit">Search</button>
          </form>
        </div>
    );
  }

  static getDataListOptions({ ownerRepos }) {
    if (ownerRepos && ownerRepos.repos.length) {
      return ownerRepos.repos.map(r => <option key={r.id} value={r.name} />);
    }
    if (ownerRepos && ownerRepos.error) {
      return <option value={ownerRepos.error.toString()} />;
    }
    return <option value="Не найдено" />;
  }
}


export default SearchIssues;
