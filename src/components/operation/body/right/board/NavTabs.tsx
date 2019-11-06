import { observer } from "mobx-react";
import React from "react";
import { Operation } from "store";
import NavTab from './NavTab';

interface IProps {
  operation: Operation,
  width: number,
}
const tabs = [
  { code: '1', text: '常口1' },
  { code: '2', text: '常口2' },
  { code: '3', text: '常口3' },
  { code: '4', text: '常口4' },
  { code: '5', text: '常口5' },
  { code: '6', text: '常口6' },
];
@observer
export default class NavTabs extends  React.Component<IProps> {
  render() {
    const { width, operation } = this.props;
    return (
      <div style={{ width }} className="nav-tabs">
        {tabs.map((tab: { code: string, text: string }) => {
          return <NavTab key={tab.code} operation={operation} tab={tab}/>
        })}
      </div>
    );
  }
}
