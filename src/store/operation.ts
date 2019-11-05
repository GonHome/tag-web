import { observable, action } from 'mobx';
import { IUser } from "../models";

// 工作台
class Operation {
  @observable toolbarHeight: number;
  @observable leftWidth: number;
  @observable leftSideType: string;

  constructor () {
    this.toolbarHeight = 30;
    this.leftWidth = 220;
    this.leftSideType = 'static'
  }

  @action setLeftSideType = (leftSideType: string) => {
    this.leftSideType = leftSideType;
  }
}

export default Operation;
