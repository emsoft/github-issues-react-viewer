import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import IssueListState from '../../stores/IssueListState';
import IssueListView from '../IssueListView';
import IssueDetailsView from '../IssueDetailsView';
import NotFound from '../NotFound';


class App extends React.Component {

  issueListState = new IssueListState({});

  render() {
    const supportsHistory = 'pushState' in window.history;
    return (
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Provider issueListState={this.issueListState}>
          <Switch>
            <Route exact path="/" component={IssueListView} />
            <Route exact path="/issue/:number" component={IssueDetailsView} />
            <Route component={NotFound} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}


export default App;
