import { observer } from "mobx-react";
import React from "react";
import { Icon } from "office-ui-fabric-react";
import { Operation } from "store";
import NavTab from './NavTab';

interface IProps {
  operation: Operation,
  width: number,
}

@observer
export default class NavTabs extends  React.Component<IProps> {
  render() {
    const { width, operation } = this.props;
    const { graphIds } = operation;
    console.log(width, graphIds);
    return (
      <div>
        <div className="nav-tabs">
          <Icon iconName="CaretLeft8" className="left-icon"/>
          <div className="nav-content">
            {graphIds.map((id: string) => {
              return <NavTab key={id} operation={operation} id={id}/>
            })}
          </div>
          <Icon iconName="CaretRight8" className="right-icon"/>
        </div>
      </div>
    );
  }
}
