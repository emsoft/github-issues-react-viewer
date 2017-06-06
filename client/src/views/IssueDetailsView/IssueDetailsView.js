import React from 'react';
import PropTypes from 'prop-types';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import global from '../../assets/app.global.css';
import styles from './issueDetailsView.css';
import IssueListState from '../../stores/IssueListState';
import Github from '../../services/Github';
import { IssueDetailsInfo, UserInfo } from '../../stores/models';
import Container from '../../components/Container/index';


@inject('issueListState')
@observer
class IssueDetailsView extends React.Component {

  @observable issueDetail;
  @observable error = null;

  static propTypes = {
    issueListState: PropTypes.instanceOf(IssueListState).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({ number: PropTypes.string.isRequired }).isRequired }).isRequired,
  };

  componentDidMount() {
    const { issueListState: { owner, repo }, match: { params: { number } } } = this.props;
    Github.issue({ owner, repo, number })
        .then(this.updateIssue)
        .catch(this.handleError);
  }

  @action
  updateIssue = ({ data }) => {
    this.error = null;
    this.issueDetail = new IssueDetailsInfo(
        data.number,
        data.title,
        moment(data.created_at).format('YYYY-MM-DD HH:mm'),
        new UserInfo(data.user.login, data.user.avatar_url, data.user.html_url),
        data.body,
    );
  };

  @action
  handleError = (err) => {
    this.error = err;
  };

  render() {
    if (this.error) {
      return (<Container>
        <div className={global['error']}>{this.error.toString()}</div>
      </Container>);
    }
    if (!this.issueDetail) {
      return (
          <Container>
            <div className={styles['box']}>
              <h1>Загрузка...</h1>
            </div>
          </Container>
      );
    }
    return (
        <Container>
          <div className={global['box']}>
            <div className={styles['header']}>
              <div className={styles['title']}>#{this.issueDetail.number}: {this.issueDetail.title}</div>
              <div className={styles['user']}>
                <a href={this.issueDetail.user.profileUrl}>
                  <img src={this.issueDetail.user.avatarUrl} alt={this.issueDetail.user.login} />
                </a>
              </div>
              <div className={global['clearfix']} />
              <span>Created at {this.issueDetail.createdAt} by </span>
              <a href={this.issueDetail.user.profileUrl}>{this.issueDetail.user.login}</a>
            </div>
            <div className={global['hr']} />
            <div className={styles['body']}>
              {this.issueDetail.body}
            </div>
          </div>
        </Container>
    );
  }
}


export default IssueDetailsView;
