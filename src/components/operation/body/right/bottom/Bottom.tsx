import { observer } from "mobx-react";
import React from "react";
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Operation, System } from "store";
interface IProps {
  operation: Operation,
  system: System,
  width: number,
}

@observer
export default class Bottom extends  React.Component<IProps> {
  render() {
    const { width, system, operation } = this.props;
    const height = system.mainHeight - operation.boardHeight - 30;
    return (
      <div style={{ width, height }} className="bottom">
        <Pivot>
          <PivotItem headerText="My Files">
            Pivot #1
          </PivotItem>
          <PivotItem headerText="Recent">
            Pivot #2
          </PivotItem>
          <PivotItem headerText="Shared with me">
            Pivot #3
          </PivotItem>
          <PivotItem headerText="Shared with me">
            Pivot #3
          </PivotItem>
          <PivotItem headerText="Shared with me">
            Pivot #3
          </PivotItem>
          <PivotItem headerText="Shared with me">
            Pivot #3
          </PivotItem>
          <PivotItem headerText="Shared with me">
            Pivot #3
          </PivotItem>
          <PivotItem headerText="Shared with me">
            Pivot #3
          </PivotItem>
        </Pivot>
      </div>
    )
  }
}
