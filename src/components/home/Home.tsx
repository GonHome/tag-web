import React from 'react';
import { inject, observer } from 'mobx-react';
import { CommandBarButton, IIconProps, Icon, PrimaryButton } from 'office-ui-fabric-react';
import { Card } from '@uifabric/react-cards';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { System } from 'store';
import TagCard from './TagCard';

interface IProps {
  system: System;
}

interface IState {
  isShow: boolean;
}

@inject('system')
@observer
export default class Home extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isShow: true }
  }


  _changeIsShow = (isShow: boolean) => {
    this.setState({ isShow });
  };

  render() {
    const { system } = this.props;
    const { isShow } = this.state;
    const { mainHeight } = system;
    return (
      <div className="home" style={{ height: mainHeight }}>
        <TagCard isShow={isShow} system={system} _changeIsShow={this._changeIsShow}/>
      </div>
    )
  }
}

