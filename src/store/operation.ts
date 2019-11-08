import { action, observable } from 'mobx';
import { IGraphValue } from 'models/operation';
import { operator, side } from "../constants/operationConstants";

// 工作台
class Operation {
  @observable toolbarHeight: number;
  @observable leftWidth: number;
  @observable leftSideType: string;
  @observable boardHeight: number;
  @observable activeGraphId: string | undefined;
  @observable graphIds: string[];
  @observable graphMap: { [key: string]: IGraphValue };

  constructor () {
    this.toolbarHeight = 30;
    this.leftWidth = 220;
    this.leftSideType = 'static';
    this.boardHeight = 200;
    this.activeGraphId = undefined;
    this.graphIds = ['n-1', 'n-2', 'n-3'];
    this.graphMap = {
      'n-1': { name: '标签1', activeVId: 'v-1', vIds: ['v-0', 'v-1', 'v-2', 'v-3', 'v-4'], tagMap: {
          'v-0': { operator: operator.NON, side: side.LEFT },
          'v-1': { name: '常口1', config: {} },
          'v-2': { name: '常口2', config: {} },
          'v-3': { name: '常口3', config: {} },
          'v-4': { operator: operator.MIX, side: side.RIGHT },
        }
      },
      'n-2': { name: '标签2', activeVId: 'v-1', vIds: ['v-1', 'v-2', 'v-3'], tagMap: {
          'v-1': { name: '暂口1', config: {} },
          'v-2': { name: '暂口2', config: {} },
          'v-3': { name: '暂口3', config: {} },
        }
      },
      'n-3': { name: '标签3', activeVId: 'v-1', vIds: ['v-1', 'v-2', 'v-3'], tagMap: {
          'v-1': { name: '逃犯1', config: {} },
          'v-2': { name: '逃犯2', config: {} },
          'v-3': { name: '逃犯3', config: {} },
        }
      },
    };
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

  @action changeActiveGraphId = (activeGraphId: string) => {
    this.activeGraphId = activeGraphId;
  };

  @action changeActiveVId = (activeVId: string) => {
    if (this.activeGraphId) {
      this.graphMap[this.activeGraphId].activeVId = activeVId;
    }
  };

  @action delGraphId = (graphId: string) => {
    if (this.activeGraphId === graphId) {
      const index = this.graphIds.indexOf(graphId);
      let newActiveGraphId = this.graphIds[index + 1];
      if (!newActiveGraphId) {
        newActiveGraphId = this.graphIds[index - 1];
      }
      this.activeGraphId = newActiveGraphId;
    }
    delete this.graphMap[graphId];
    this.graphIds = this.graphIds.filter((id: string) => id !== graphId);
  };

  @action changeRightOperator = (rightOperator: operator, vId: string) => {
    if (this.activeGraphId) {
      this.graphMap[this.activeGraphId].tagMap[vId] = { operator: rightOperator, side: side.RIGHT };
    }
  };

  @action delNonOperator = (vId: string) => {
    if (this.activeGraphId) {
      delete this.graphMap[this.activeGraphId].tagMap[vId];
      const vIds = this.graphMap[this.activeGraphId].vIds;
      this.graphMap[this.activeGraphId].vIds = vIds.filter((item: string) => {
        return item !== vId;
      });
    }
  };

}

export default Operation;
