import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import global from '../../assets/app.global.css';
import styles from './issue.css';
import { IssueInfo } from '../../stores/models';


function Issue({ issue }) {
  const { number, title, createdAt, user: { login, avatarUrl, profileUrl } } = issue;
  return (
      <div className={global['row']}>
        <div className={styles['cell']}>
          <Link to={`/issue/${number}`}>{number}</Link>
        </div>
        <div className={styles['cell']}>{title}</div>
        <div className={styles['cell']}>{createdAt}</div>
        <div className={styles['cell']}>
          <a href={profileUrl}>
            <img src={avatarUrl} alt={login} />
            <br />
            {login}
          </a>
        </div>
      </div>
  );
}
Issue.propTypes = {
  issue: PropTypes.instanceOf(IssueInfo).isRequired,
};


export default observer(Issue);
