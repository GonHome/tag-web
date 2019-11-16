import { action, observable } from 'mobx';
import { IBasicInfo, IRowConfig } from "../models/build";
import { tagTypes } from "../constants/commonConstants";

// 标签模板
class Build {
  @observable leftWidth: number;
  @observable rightWidth: number;
  @observable basicInfo: IBasicInfo;
  @observable rowConfigs: IRowConfig[];

  constructor () {
    this.leftWidth = 280;
    this.rightWidth = 280;
    this.basicInfo = { name: '新建标签', type: tagTypes.people, sql: '' };
    this.rowConfigs = [
      {
        labelCol: 4,
        labelName: '测试',
        prefix: '',
        suffix: '',
        paramCol: 7,
        paramType: '',
        defaultValue: '',
      }
    ];
  }

  @action changeBasicInfo = (basicInfo: IBasicInfo) => {
    this.basicInfo = basicInfo;
  };

  @action changeLabelName = (index: number, labelName: string) => {
    this.rowConfigs[index].labelName = labelName;
  };

  @action changeLabelCol = (index: number, labelCol: number) => {
    this.rowConfigs[index].labelCol = labelCol;
    this.rowConfigs[index].paramCol = 11 - labelCol;
  };

  @action addRowConfig = () => {
    this.rowConfigs.push(
      {
        labelCol: 4,
        labelName: '测试',
        prefix: '',
        suffix: '',
        paramCol: 7,
        paramType: '',
        defaultValue: '',
      }
    );
  };

  @action delRowConfig = (index: number) => {
    this.rowConfigs.splice(index, 1);
  };

}

export default Build;
