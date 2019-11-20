import { action, observable } from 'mobx';
import { IBasicInfo } from "../models/sql";

// SQL编辑
class Sql {
  @observable leftWidth: number;
  @observable rightWidth: number;
  @observable sqlList: string[];
  @observable basicInfo: IBasicInfo;
  @observable activeSqlId: string;
  @observable sqlValue: string;

  constructor () {
    this.leftWidth = 280;
    this.rightWidth = 280;
    this.basicInfo = { name: '新建SQL' };
    this.sqlList = ['常口1','常口2','常口3','常口4','常口5','常口6','常口7','常口8','常口9','常口10','常口11','常口12','常口13',];
    this.activeSqlId = '';
    this.sqlValue = '';
  }

  @action changeBasicInfo = (basicInfo: IBasicInfo) => {
    this.basicInfo = basicInfo;
  };

  @action checkTag = (sqlId: string) => {
    this.activeSqlId = sqlId;
  };

  @action changeSqlValue = (sqlValue: string) => {
    this.sqlValue = sqlValue;
  };

}

export default Sql;
