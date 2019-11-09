import { observer } from "mobx-react";
import React from "react";
import TagItem from './TagItem';
import { Operation } from "store";
import RightOperatorItem from "./RightOperatorItem";
import LeftOperatorItem from "./LeftOperatorItem";
import { IGraphValue, IOperatorValue, ITagValue } from "models/operation";
import { operator, side } from "../../../../../constants/operationConstants";

interface IProps {
  operation: Operation,
  width: number,
}

@observer
export default class BoardCenter extends  React.Component<IProps> {

  render() {
    const { operation, width } = this.props;
    const { boardHeight, graphMap, activeGraphId } = this.props.operation;
    const graph: IGraphValue | null = activeGraphId ? graphMap[activeGraphId] : null;
    if (graph) {
      const { activeVId, vIds, tagMap } = graph;
      return (
        <div className="board-center" style={{ height: boardHeight - 28 }}>
          {vIds.map((vId: string, index: number) => {
            const tag: ITagValue | IOperatorValue = tagMap[vId];
            const prevVId = vIds[index - 1];
            const prevTag = prevVId ? tagMap[prevVId] : undefined;
            let isNon = false;
            if (prevTag) {
              if ((prevTag as IOperatorValue).operator && (prevTag as IOperatorValue).operator === operator.NON) {
                isNon = true;
              }
            }
            if (tag.hasOwnProperty("name")) {
              return <TagItem operation={operation} width={width} tag={tag as ITagValue} activeVId={activeVId} vId={vId} key={vId} isNon={isNon} prevVId={prevVId}/>
            }
            if ((tag as IOperatorValue).side === side.LEFT) {
              return <LeftOperatorItem operation={operation} width={width} key={vId} vId={vId} operator={tag as IOperatorValue} />
            }
            return <RightOperatorItem operation={operation} width={width} key={vId} vId={vId} operator={tag as IOperatorValue} />
          })}
        </div>
      )
    }
    return null;
  }
}
