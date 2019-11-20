import { observer } from "mobx-react";
import React from "react";
import { Sql, System } from "store";
import SqlItem from './SqlItem';
import { SearchBox } from "office-ui-fabric-react";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class SqlList extends  React.Component<IProps> {

  render() {
    const { system, sql } = this.props;
    const { sqlList } = sql;
    const { mainHeight } = system;
    return (
      <div style={{ height: mainHeight - 52 }} className="sql-list">
        <SearchBox
          placeholder="搜索"
          underlined={true}
        />
        <div className="sqls">
          {sqlList.map((tag: string, index: number) => {
            return <SqlItem sql={ sql } tagName={tag} key={index} index={index}/>;
          })}
        </div>
      </div>
    )
  }
}
