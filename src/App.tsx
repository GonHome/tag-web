import React from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import {
  Switch ,
  Router,
  Route,
} from 'react-router';
import { initializeIcons } from '@uifabric/icons';
import Head from 'components/head';
import { rootStore } from './store';
import './index.scss';
import Login from 'components/login';
import InJect from './util/InJect';
import { System, User, App as AppStore } from './store';
import Home from 'components/home';
import OperationDom from 'components/operation';
const browserHistory = createBrowserHistory();
const routerStore =  new RouterStore();
// 同步路由与mobx的数据状态
const history = syncHistoryWithStore(browserHistory, routerStore);

interface IProps {
  system: System,
  user: User,
  app: AppStore,
}

@inject("system", "user", "app")
@observer
class Entry extends React.Component<IProps> {

  async componentWillMount(): Promise<void> {
    initializeIcons();
    this.props.user.checkLogin();
    window.onresize = () => this.props.system.resize();
  }

  render() {
    const { user, system } = this.props;
    const { height, width } = this.props.system;
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div style={{ height, width }}>
          <Head user={user} system={system} />
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/operation" component={OperationDom}/>
            </Switch>
          </Router>
        </div>
      );
    } else {
      return (
        <div style={{ height, width }}>
          <InJect Component={Login} />
        </div>
      );
    }
  }
}

@observer
class App extends  React.Component {
  render() {
    return (
      <Provider {...rootStore}>
        <InJect Component={Entry} />
      </Provider>
    )
  }
}

export default App;