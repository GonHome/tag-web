import { Operation } from "../../../../../store";
import { observer } from "mobx-react";
import React from "react";
import { rightTypes } from "../../../../../constants/operationConstants";

interface IProps {
  operation: Operation,
  vId: string,
  rightType: rightTypes | null,
}

@observer
export default class TagConfig extends  React.Component<IProps> {

  render() {
    const { rightType } = this.props;
    return (
      <div className="tag-config" style={{ width: rightType ? 'calc(50% - 1px)' : 'calc(100% - 1px)' }}>
        配置区
      </div>
    )
  }
}
