import React from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { CommandBarButton, IIconProps } from 'office-ui-fabric-react';
import { panelKeys } from 'constants/headConstants';
import UserPanel from './UserPanel';
import NoticePanel from './NoticePanel';
import MenuPanel from './MenuPanel';
import { User, System } from 'store';

const menuIcon: IIconProps = { iconName: 'WaffleOffice365' };
const userIcon: IIconProps = { iconName: 'Contact' };
const ringIcon: IIconProps = { iconName: 'Ringer' };

interface IProps {
  user: User;
  system: System;
}

interface IState {
  activePanel: panelKeys | undefined;
}
@inject('system', 'user')
@observer
export default class Head extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { activePanel: undefined };
  }

  dismissPanel = () => {
    this.setState({ activePanel: undefined });
  };

  render() {
    const { user } = this.props;
    const { activePanel } = this.state;
    return (
      <div className="head">
        <div className="button-head-group">
          <CommandBarButton
            iconProps={menuIcon}
            className={classNames({ active: panelKeys.MENU === activePanel } )}
            title='菜单'
            onClick={() => this.setState({ activePanel: panelKeys.MENU })}
          />
          <span className='title'>标签系统</span>
          <div className="button-right-group">
            <CommandBarButton
              iconProps={ringIcon}
              className={classNames({ active: panelKeys.NOTICE === activePanel } )}
              title='预警信息'
              onClick={() => this.setState({ activePanel: panelKeys.NOTICE })}
            />
            <CommandBarButton
              iconProps={userIcon}
              className={classNames({ active: panelKeys.USER === activePanel } )}
              title='用户信息'
              onClick={() => this.setState({ activePanel: panelKeys.USER })}
            />
          </div>
        </div>
        <UserPanel activePanel={activePanel} dismissPanel={this.dismissPanel} user={user}/>
        <NoticePanel activePanel={activePanel} dismissPanel={this.dismissPanel} user={user}/>
        <MenuPanel activePanel={activePanel} dismissPanel={this.dismissPanel} user={user}/>
      </div>
    )
  }
}

