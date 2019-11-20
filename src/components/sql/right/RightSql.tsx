import { observer } from "mobx-react";
import React from "react";
import { TextField, Stack, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';
import { Sql, System } from "store";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class RightSql extends  React.Component<IProps> {

  render() {
    const { leftWidth, changeBasicInfo, basicInfo } = this.props.sql;
    const { name } = basicInfo;
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
        </Stack>
        <div className="button-group">
          <PrimaryButton text="保存" className="submit-button"/>
          <DefaultButton text="删除" className="delete-button"/>
        </div>
      </div>
    )
  }
}
