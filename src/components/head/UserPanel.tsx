import React from 'react';
import { observer } from 'mobx-react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { Card } from '@uifabric/react-cards';
import { IIconProps, Image, PrimaryButton } from 'office-ui-fabric-react';
import { panelKeys } from 'constants/headConstants';
import { User } from 'store';

interface IProps {
  activePanel: panelKeys | undefined;
  dismissPanel: () => void;
  user: User;
}

const outIcon: IIconProps = { iconName: 'SignOut' };

@observer
export default class UserPanel extends  React.Component<IProps> {

  render() {
    const { activePanel, dismissPanel, user } = this.props;
    const { userInfo } = user;
    const username = userInfo ? userInfo.username : '';
    const name = userInfo ? userInfo.name : '';
    console.log(userInfo);
    return (
      <Panel
        className="panel-under-head"
        isLightDismiss={true}
        headerText="用户信息"
        isOpen={panelKeys.USER === activePanel}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <Card horizontal>
          <Card.Item fill>
            <Image src="/img/user_head.png" alt="Placeholder image." className='left-img' />
          </Card.Item>
          <Card.Section>
            <div className="user-title white-break" title={name}>
              {name}
            </div>
            <div className="user-description white-break" title={username}>
              {username}
            </div>
            <PrimaryButton text='退出' iconProps={outIcon} />
          </Card.Section>
        </Card>
      </Panel>
    )
  }
}

