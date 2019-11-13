import { Operation } from "../../../../../store";
import { observer } from "mobx-react";
import React from "react";

interface IProps {
  operation: Operation,
  vId: string,
}

@observer
export default class TagConfig extends  React.Component<IProps> {

  render() {
    return (
      <div>配置区</div>
    )
  }
}
