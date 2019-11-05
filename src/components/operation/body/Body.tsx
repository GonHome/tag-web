import { observer } from "mobx-react";
import React from "react";
import { Operation, System } from "../../../store";
import LeftSider from './LeftSider';

interface IProps {
  operation: Operation,
  system: System,
}

@observer
export default class Body extends  React.Component<IProps> {
  render() {
    const { system, operation } = this.props;
    const height = system.mainHeight - operation.toolbarHeight;
    return (
      <div className="body" style={{ height }}>
        <LeftSider operation={operation} height={height} />
      </div>
    );
  }
}
