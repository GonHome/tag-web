import { Sql, System } from "../../../store";
import { observer } from "mobx-react";
import React from "react";
import { Text } from "office-ui-fabric-react";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class WhereSql extends  React.Component<IProps> {
  render() {
    return (
      <div className="where-sql">
        <div className="panel-title">
          <Text variant="medium" className="font600">
            条件字段
          </Text>
        </div>
      </div>
    )
  }
}
