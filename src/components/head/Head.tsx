import React from 'react';
import { inject, observer } from 'mobx-react';
import { CommandBarButton, IIconProps, Grid } from 'office-ui-fabric-react';

const menuIcon: IIconProps = { iconName: 'WaffleOffice365' };
const userIcon: IIconProps = { iconName: 'Contact' };
const ringIcon: IIconProps = { iconName: 'Ringer' };

@inject('system')
@observer
export default class Head extends  React.Component {
  render() {
    return (
      <div className="head">
        <div className="button-head-group">
          <CommandBarButton iconProps={menuIcon} className='button-head-group' title='菜单' />
          <span className='title'>标签系统</span>
          <div className="button-right-group">
            <CommandBarButton iconProps={ringIcon} className='button-head-group' title='预警信息' />
            <CommandBarButton iconProps={userIcon} className='button-head-group' title='用户信息' />
          </div>
        </div>
      </div>
    )
  }
}

