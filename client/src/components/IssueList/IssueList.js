import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import global from '../../assets/app.global.css';
import styles from './issueList.css';
import IssueListState from '../../stores/IssueListState';
import Issue from '../Issue';
import Paginator from '../Paginator';


function HeaderCell({ issueListState: store, title, sortField }) {
  const onSort = (event) => {
    event.preventDefault();
    store.sort(sortField);
  };
  return (
    <div
      className={global['cell']}
      data-sortable={!!sortField}
      data-sort={store.getSortDirection(sortField)}
      onClick={onSort}
    >
      {title}
    </div>
  );
}

function IssueList({ issueListState: store }) {
  const rows = store.issues.length
    ? store.issues.map(i => <Issue key={i.number} issue={i} />)
    : <div className={styles['row-bottom']}>Нет записей</div>;

  const content = store.loadingIssues
    ? <div className={styles['row-bottom']}>Загрузка...</div>
    : rows;

  return (
    <div className={styles['box']} disabled={store.loadingIssues}>
      <Paginator />
      <div className={styles['hr']} />
      <div className={global['table']}>
        <div className={global['header']}>
          <HeaderCell issueListState={store} title="Номер" />
          <HeaderCell issueListState={store} title="Название" />
          <HeaderCell issueListState={store} title="Дата создания" sortField="created" />
          <HeaderCell issueListState={store} title="Создал" />
        </div>
        {content}
      </div>
      <div className={styles['hr']} />
      <Paginator />
    </div>
  );
}
IssueList.propTypes = {
  issueListState: PropTypes.instanceOf(IssueListState).isRequired,
};


export default inject('issueListState')(observer(IssueList));
