import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import global from '../../assets/app.global.css';
import styles from './paginator.css';
import IssueListState from '../../stores/IssueListState';


@inject('issueListState')
@observer
class Paginator extends React.Component {

  static propTypes = {
    issueListState: PropTypes.instanceOf(IssueListState).isRequired,
  };

  @action
  onPageSizeChange = (e) => {
    const hasCurrent = this.props.issueListState.pagination.current;
    this.props.issueListState.pagination.pageSize = +e.target.value;
    this.props.issueListState.pagination.current = 0;
    this.props.issueListState.pagination.total = 0;
    if (hasCurrent) {
      this.props.issueListState.loadIssues();
    }
  };

  next = () => {
    if (this.props.issueListState.pagination.next()) {
      this.props.issueListState.loadIssues();
    }
  };

  prev = () => {
    if (this.props.issueListState.pagination.prev()) {
      this.props.issueListState.loadIssues();
    }
  };

  first = () => {
    if (this.props.issueListState.pagination.first()) {
      this.props.issueListState.loadIssues();
    }
  };

  last = () => {
    if (this.props.issueListState.pagination.last()) {
      this.props.issueListState.loadIssues();
    }
  };

  render() {
    const store = this.props.issueListState;
    const { pagination: pg } = store;
    return (
        <div className={styles['paginator']}>
          <div className={styles['group']}>
            Записей на странице
            <select value={pg.pageSize} onChange={this.onPageSizeChange}>
              {pg.availablePageSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className={styles['group']}>
            <button onClick={this.first} disabled={!pg.canFirst}>В начало</button>
          </div>
          <div className={styles['group']}>
            <button onClick={this.prev} disabled={!pg.canPrev}>Назад</button>
          </div>
          <div className={styles['group']}>
            <span>Страница {pg.current} из {pg.total}</span>
          </div>
          <div className={styles['group']}>
            <button onClick={this.next} disabled={!pg.canNext}>Далее</button>
          </div>
          <div className={styles['group']}>
            <button onClick={this.last} disabled={!pg.canLast}>В конец</button>
          </div>
          <div className={global['clearfix']} />
        </div>
    );
  }
}


export default Paginator;
