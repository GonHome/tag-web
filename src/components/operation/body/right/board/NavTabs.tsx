import { observer } from "mobx-react";
import React from "react";
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
    return (
      <div className="nav-tabs">
        {graphIds.map((id: string) => {
          return <NavTab key={id} operation={operation} id={id}/>
        })}
      </div>
    );
  }
}
