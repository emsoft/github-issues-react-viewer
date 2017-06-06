import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import global from '../../assets/app.global.css';
import styles from './issueList.css';
import IssueListState from '../../stores/IssueListState';
import Issue from '../Issue';
import Paginator from '../Paginator';


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
            <div className={global['cell']}>Номер</div>
            <div className={global['cell']}>Название</div>
            <div className={global['cell']}>Дата создания</div>
            <div className={global['cell']}>Создал</div>
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
