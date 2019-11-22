import { observer } from "mobx-react";
import React from "react";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Operation, System } from "store";
import { IGraphValue, ITagValue } from "../../../../../models/operation";
import TagPanel from './TagPanel';

interface IProps {
  operation: Operation,
  system: System,
  width: number,
}

@observer
export default class Bottom extends  React.Component<IProps> {

  _linkClick = (item?: PivotItem) => {
    if (item) {
      const { changeActiveVId } = this.props.operation;
      const vId = item.props.itemKey;
      if (vId) {
        changeActiveVId(vId);
      }
    }
  };

  render() {
    const { width, system, operation } = this.props;
    const { graphMap, activeGraphId } = operation;
    const graph: IGraphValue | null = activeGraphId ? graphMap[activeGraphId] : null;
    const height = system.mainHeight - operation.boardHeight - 30;
    if (graph) {
      const { activeVId, vIds, tagMap } = graph;
      const tagVIds = vIds.filter((vId: string) => {
        return typeof tagMap[vId] === 'object';
      });
      return (
        <div style={{ width, height }} className="bottom">
          <Pivot selectedKey={activeVId} onLinkClick={this._linkClick}>
            {tagVIds.map((vId: string) => {
              const tag = tagMap[vId] as ITagValue;
              return (
                <PivotItem itemIcon={tag.icon} headerText={tag.name} itemKey={vId} key={`${activeGraphId}_${vId}`}>
                  <TagPanel operation={operation} vId={vId} width={width} height={height} tag={tag}/>
                </PivotItem>
              );
            })}
          </Pivot>
        </div>
      )
    }
    return null;
  }
}
