import { observable, action } from 'mobx';

// 工作台
class Operation {
  @observable toolbarHeight: number;
  @observable leftWidth: number;
  @observable leftSideType: string;
  @observable boardHeight: number;
  @observable activeTabCode: string | undefined;

  constructor () {
    this.toolbarHeight = 30;
    this.leftWidth = 220;
    this.leftSideType = 'static';
    this.boardHeight = 200;
    this.activeTabCode = undefined;
  }

  @action setLeftSideType = (leftSideType: string) => {
    this.leftSideType = leftSideType;
  };

  @action moveWidth = (leftWidth: number) => {
    this.leftWidth = leftWidth;
  };

  @action moveBoardHeight = (boardHeight: number) => {
    this.boardHeight = boardHeight;
  };

  @action checkActiveTabCode = (activeTabCode: string) => {
    this.activeTabCode = activeTabCode;
  }

}

export default Operation;
