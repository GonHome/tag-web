import { observer } from "mobx-react";
import React from "react";
import { Icon, Image } from 'office-ui-fabric-react';
import { Operation } from "../../../store";
import { Card } from "@uifabric/react-cards";

interface IProps {
  operation: Operation,
  // height: number;
}

@observer
export default class LeftDragItem extends  React.Component<IProps> {
  render() {
    const { operation } = this.props;
    const nameWidth = operation.leftWidth - 80;
    return (
      <div draggable={true} className="left-drag-item">
        <Card horizontal>
          <Card.Item fill>
            <Icon iconName="Tag" />
          </Card.Item>
          <Card.Section>
            <div className="tag-name" style={{ width: nameWidth }} >
              常口标签
            </div>
          </Card.Section>
        </Card>
      </div>
    )
  }
}
