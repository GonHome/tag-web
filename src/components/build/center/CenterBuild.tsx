import { observer } from "mobx-react";
import React from "react";
import { Label, Text, PrimaryButton, IIconProps, TextField } from 'office-ui-fabric-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Build, System } from "store";
import { IRowConfig } from "../../../models/build";

interface IProps {
  system: System,
  build: Build,
}

const addIcon: IIconProps = { iconName: 'CircleAdditionSolid' };
const delIcon: IIconProps = { iconName: 'StatusErrorFull' };

@observer
export default class CenterBuild extends  React.Component<IProps> {

  _labelChange = (index: number, newValue?: string) => {
    const { changeLabelName } = this.props.build;
    changeLabelName(index, newValue || '');
  };

  render() {
    const { system, build } = this.props;
    const { leftWidth, rightWidth, rowConfigs, addRowConfig, delRowConfig } = build;
    const { width, mainHeight } = system;
    return (
      <div className="center-build" style={{ width: width - leftWidth - rightWidth - 2 }}>
        <div style={{ height: 60 }}>
          <Label>
            <Text variant="large" className="font600 letter">参数配置</Text>
          </Label>
          <Label className="remarks">
            <Text variant="medium">参数名</Text>
            <div className="circle-key"/>
            <Text variant="medium">参数值</Text>
            <div className="circle-value"/>
          </Label>
        </div>
        <div style={{ height: mainHeight - 60 }}>
          <Grid fluid>
            {rowConfigs.map((config: IRowConfig, index: number) => {
              return (
                <Row>
                  <Col md={config.labelCol} className="label" style={{ borderTop: index === 0 ? '1px solid' : '0' }}>
                    <TextField
                      required
                      value={config.labelName}
                      onChange={(e: any, newValue?: string ) => this._labelChange(index, newValue)}
                    />
                  </Col>
                  <Col md={config.paramCol} className="param" style={{ borderTop: index === 0 ? '1px solid' : '0' }}>
                    123
                  </Col>
                  <Col md={1} className="bar">
                    {
                      index === 0 ?
                        <PrimaryButton iconProps={addIcon} title="添加" onClick={addRowConfig} /> :
                        <PrimaryButton iconProps={delIcon} title="删除" onClick={() => delRowConfig(index)} />
                    }
                  </Col>
                </Row>
              )
            })}
          </Grid>
        </div>
      </div>
    )
  }
}
