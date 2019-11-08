import { observer } from "mobx-react";
import React from "react";
import TagItem from './TagItem';
import { Operation } from "store";
import OperatorItem from "./OperatorItem";
import { IGraphValue, ITagValue } from "models/operation";
import { operator } from "constants/operationConstants";

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
          {vIds.map((vId: string) => {
            const tag: ITagValue | operator = tagMap[vId];
            if (typeof tag === 'number') {
              return <OperatorItem operation={operation} width={width} key={vId} />
            }
            return <TagItem operation={operation} width={width} tag={tag} activeVId={activeVId} vId={vId} key={vId}/>
          })}

        </div>
      )
    }
    return null;
  }
}
