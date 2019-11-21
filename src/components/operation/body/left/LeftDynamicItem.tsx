import { observer } from "mobx-react";
import React from "react";
import { Icon, Text } from 'office-ui-fabric-react';
import { Operation } from "../../../../store";
import classNames from "classnames";

interface IProps {
  operation: Operation,
  item: any;
}

@observer
export default class LeftDynamicItem extends  React.Component<IProps> {
  render() {
    const { operation, item } = this.props;
    const { graphIds, checkGraphId } = operation;
    return (
      <div
        className={classNames("tag-item", {active: graphIds.indexOf(item) > -1})}
        onDoubleClick={() => checkGraphId(item)}
        title={item}
      >
        <Icon iconName="TagSolid" className="tag-icon" />
        <Text className="tag-name">{item}</Text>
        <Icon iconName="MoreVertical" className="more-icon" title='操作'/>
        <Icon iconName="PinnedSolid" />
      </div>
    )
  }
}
