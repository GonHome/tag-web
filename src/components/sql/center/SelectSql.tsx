import { Sql, System } from "../../../store";
import { observer } from "mobx-react";
import { Text } from 'office-ui-fabric-react';
import React from "react";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class SelectSql extends  React.Component<IProps> {
  render() {
    return (
      <div className="select-sql">
        <div className="panel-title">
          <Text variant="medium" className="font600">
            输出字段
          </Text>
        </div>
      </div>
    )
  }
}
