import { inject, observer } from "mobx-react";
import React from "react";
import { System } from "../../store";
import LeftTask from './left/LeftTask';

interface IProps {
  system: System,
}

@inject('system')
@observer
export default class TaskDom extends  React.Component<IProps> {
  render() {
    const { system } = this.props;
    const { mainHeight } = system;
    return (
      <div className="task" style={ { height: mainHeight } }>
        <LeftTask system={system} />
      </div>
    );
  }
}
