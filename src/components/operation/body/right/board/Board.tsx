import { observer } from "mobx-react";
import React from "react";
import { Operation, System } from "store";
import NavTabs from './NavTabs';

interface IProps {
  operation: Operation,
  system: System,
  width: number,
}

@observer
export default class Board extends  React.Component<IProps> {
  render() {
    const { operation, width } = this.props;
    const height = operation.boardHeight;
    return (
      <div style={{ width, height }} className="board">
        <NavTabs operation={operation} width={width} />
      </div>
    );
  }
}
