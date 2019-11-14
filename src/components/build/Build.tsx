import { inject, observer } from "mobx-react";
import React from "react";
import { Operation, System } from "../../store";

interface IProps {
  system: System,
  operation: Operation,
}


@inject('system', 'operation')
@observer
export default class Build extends  React.Component<IProps> {
  render() {
    return (
      <div>
        123123
      </div>
    )
  }
}
