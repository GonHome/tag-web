import { inject, observer } from "mobx-react";
import React from "react";
import { System, Sql } from "../../store";
import LeftSql from './left/LeftSql';
import CenterSql from './center/CenterSql';
import RightSql from './right/RightSql';

interface IProps {
  system: System,
  sql: Sql,
}


@inject('system', 'sql')
@observer
export default class SqlDom extends  React.Component<IProps> {
  render() {
    const { system, sql } = this.props;
    const { mainHeight } = system;
    return (
      <div className="sql" style={{ height: mainHeight }}>
        <LeftSql system={system} sql={sql} />
        <CenterSql system={system} sql={sql} />
        <RightSql system={system} sql={sql} />
      </div>
    )
  }
}
