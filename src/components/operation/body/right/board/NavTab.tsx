import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Icon } from 'office-ui-fabric-react';
import { Operation } from "../../../../../store";

interface IProps {
  operation: Operation,
  tab: { code: string, text: string },
}

@observer
export default class NavTab extends  React.Component<IProps> {
  render() {
    const { tab, operation } = this.props;
    const { activeTabCode, checkActiveTabCode } = operation;
    return (
      <div
        className={classNames('tab-wrap', { active: tab.code === activeTabCode } )}
        onClick={() => checkActiveTabCode(tab.code)}
        title={tab.text}
      >
        <div className="tab-left" />
        <div className="tab-content">
          <span className="tab-name">{tab.text}</span>
          <Icon iconName='ErrorBadge' title='关闭'/>
        </div>
        <div className="tab-right" />
      </div>
    );
  }
}
