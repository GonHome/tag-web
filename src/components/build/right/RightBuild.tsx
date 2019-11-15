import { observer } from "mobx-react";
import React from "react";
import { Build, System } from "store";

interface IProps {
  system: System,
  build: Build,
}


@observer
export default class RightBuild extends  React.Component<IProps> {
  render() {
    const { rightWidth } = this.props.build;
    return (
      <div className="right-build" style={{ width: rightWidth }}>
        12312
      </div>
    )
  }
}
