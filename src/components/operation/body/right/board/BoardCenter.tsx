import { observer } from "mobx-react";
import React from "react";
import TagItem from './TagItem';
import { Operation } from "store";
import OperatorItem from "./OperatorItem";

interface IProps {
  operation: Operation,
  width: number,
}

@observer
export default class BoardCenter extends  React.Component<IProps> {
  render() {
    const { operation, width } = this.props;
    const { boardHeight } = this.props.operation;
    return (
      <div className="board-center" style={{ height: boardHeight - 28 }}>
        <TagItem operation={operation} width={width} />
        <OperatorItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
        <TagItem operation={operation} width={width} />
      </div>
    )
  }
}
