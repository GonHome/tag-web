import { observer } from "mobx-react";
import React from "react";
import { TextField, Stack, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react';
import { Sql, System } from "store";
import { ISelectCol } from "../../../models/sql";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class RightSql extends  React.Component<IProps> {

  _showOptions = () => {
    const { selectCols } = this.props.sql;
    return selectCols.map((col: ISelectCol) => {
      return { key: col.columnAlias || col.columnName, text: col.columnAlias || col.columnName };
    })
  };

  render() {
    const { leftWidth, changeBasicInfo, basicInfo } = this.props.sql;
    const { name, personCol } = basicInfo;
    return (
      <div className="right-sql" style={{ width: leftWidth - 40 }}>
        <Stack>
          <TextField
            label="SQL名"
            required
            errorMessage={ name ? '' : 'SQL名不可为空' }
            onChange={(e: any, newValue?: string) => changeBasicInfo({ ...basicInfo, name: newValue || '' })}
            value={name}
          />
          <Dropdown
            label="指定身份证"
            options={this._showOptions()}
            selectedKey={personCol}
            onChange={(event, item) => item ? changeBasicInfo({ name, personCol: item.key as string }) : null}
          />
        </Stack>
        <div className="button-group">
          <PrimaryButton text="保存" className="submit-button"/>
          <DefaultButton text="删除" className="delete-button"/>
        </div>
      </div>
    )
  }
}
