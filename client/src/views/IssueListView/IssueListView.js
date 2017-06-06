import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import global from '../../assets/app.global.css';
import IssueList from '../../components/IssueList';
import IssueListState from '../../stores/IssueListState';
import SearchIssues from '../../components/SearchIssues/SearchIssues';


@inject('issueListState')
@observer
class IssueListView extends React.Component {

  static propTypes = {
    issueListState: PropTypes.instanceOf(IssueListState).isRequired,
  };

  render() {
    const store = this.props.issueListState;
    return (
        <div className={global['container']}>
          <SearchIssues />
          {store.error ? <div className={global['error']}>{store.error.toString()}</div> : null}
          <IssueList />
        </div>
    );
  }
}


export default IssueListView;
