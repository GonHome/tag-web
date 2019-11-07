import { observer } from "mobx-react";
import React from "react";
import { Operation } from "store";

interface IProps {
  operation: Operation,
  width: number,
}

@observer
export default class TagItem extends  React.Component<IProps> {
  render() {
    return (
      <div className="tag-item">
        <div className="circle" />
        <div className="tag-name">常口</div>
      </div>
    );
  }
}
