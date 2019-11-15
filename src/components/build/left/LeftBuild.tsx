import { observer } from "mobx-react";
import React from "react";
import { TextField, Stack } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Build, System } from "store";
import { tagTypes, tagTypeList } from 'constants/commonConstants';

interface IProps {
  system: System,
  build: Build,
}

@observer
export default class LeftBuild extends  React.Component<IProps> {

  _onTypeChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      const { changeBasicInfo, basicInfo } = this.props.build;
      changeBasicInfo({ ...basicInfo, type: option.key as tagTypes });
    }
  };

  render() {
    const { leftWidth, changeBasicInfo, basicInfo } = this.props.build;
    const { name, sql, type } = basicInfo;
    return (
      <div className="left-build" style={{ width: leftWidth - 40 }}>
        <Stack>
          <TextField
            label="标签名"
            required
            errorMessage={ name ? '' : '标签名不可为空' }
            onChange={(e: any, newValue?: string) => changeBasicInfo({ ...basicInfo, name: newValue || '' })}
            value={name}
          />
          <ChoiceGroup
            required
            label="类型"
            selectedKey={type}
            options={tagTypeList.map(({code, text}: { code: tagTypes, text: string }) => (
              {
                key: code,
                imageSrc: `/img/${code}.png`,
                selectedImageSrc: `/img/${code}.png`,
                imageSize: { width: 32, height: 32 },
                text: text,
              }
            ))}
            onChange={this._onTypeChange}
          />
          <TextField
            label="SQL"
            multiline
            rows={8}
            onChange={(e: any, newValue?: string) => changeBasicInfo({ ...basicInfo, sql: newValue || '' })}
            value={sql}
          />
        </Stack>
      </div>
    )
  }
}
