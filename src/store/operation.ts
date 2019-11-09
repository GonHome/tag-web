import { action, observable } from 'mobx';
import { IGraphValue, ITagValue } from 'models/operation';
import { operator, side } from "../constants/operationConstants";
import { getMaxVId } from 'util/operate';

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
      'n-1': { name: '标签1', activeVId: 'v-1', vIds: ['v-0', 'v-1', 'v-2', 'v-3', 'v-4', 'v-5', 'v-6'], tagMap: {
          'v-0': operator.NON,
          'v-1': { name: '常口1', config: {} },
          'v-2': operator.MIX,
          'v-3': { name: '常口2', config: {} },
          'v-4': operator.MIX,
          'v-5': { name: '常口3', config: {} },
          'v-6': operator.MIX,
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
      this.graphMap[this.activeGraphId].tagMap[vId] = rightOperator;
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

  @action addNonOperator = (vId: string) => {
    if (this.activeGraphId) {
      const vIds = this.graphMap[this.activeGraphId].vIds;
      const index = vIds.indexOf(vId);
      const nextVId = `v-${getMaxVId(vIds)}`;
      this.graphMap[this.activeGraphId].vIds.splice(index, 0, nextVId);
      this.graphMap[this.activeGraphId].tagMap[nextVId] = operator.NON;
    }
  };

  @action delTag = (vId: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      const vIds = this.graphMap[activeGraphId].vIds;
      const tagMap = this.graphMap[activeGraphId].tagMap;
      const realVIds = vIds.filter((item: string) => {
        const tag = this.graphMap[activeGraphId].tagMap[item] as operator;
        return (typeof tag === 'number' && tag !== operator.LEFT && tag !== operator.RIGHT) || typeof tag !== 'number';
      });
      const index = realVIds.indexOf(vId);
      const prevVId = realVIds[index - 1];
      const nextVId = realVIds[index + 1];
      let isDelPrev = false;
      const prevTag = prevVId ? tagMap[prevVId] as  operator : null;
      if (typeof prevTag === 'number' && prevTag === operator.NON) {
        isDelPrev = true;
      }
      if (activeVId === vId) {
        const tagVIds = vIds.filter((item: string) => {
          const tag = this.graphMap[activeGraphId].tagMap[item] as ITagValue;
          return tag.name;
        });
        const tagIndex = tagVIds.indexOf(vId);
        let nextActiveVId: string | undefined = tagVIds[tagIndex + 1];
        if (!nextActiveVId) {
          nextActiveVId = tagVIds[tagIndex - 1];
        }
        this.graphMap[activeGraphId].activeVId = nextActiveVId;
      }
      this.graphMap[activeGraphId].vIds = vIds.filter((item: string) => {
        return item !== vId && item !== nextVId && (isDelPrev ? isDelPrev && item !== prevVId : true);
      });
      delete this.graphMap[activeGraphId].tagMap[vId];
      delete this.graphMap[activeGraphId].tagMap[nextVId];
      if (isDelPrev) {
        delete this.graphMap[activeGraphId].tagMap[prevVId];
      }
    }
  }
}

export default Operation;
