import { action, computed, observable } from 'mobx';
import _ from 'lodash';
import { IBracket, IGraphValue, ITagValue } from 'models/operation';
import { operator } from "../constants/operationConstants";
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
      'n-1': {
        name: '标签1',
        activeVId: 'v-1',
        vIds: ['v-0', 'v-1', 'v-2', 'v-3', 'v-4', 'v-5', 'v-6', 'v-7'],
        tagMap: {
          'v-0': operator.LEFT,
          'v-1': { name: '常口1', config: {} },
          'v-2': operator.MIX,
          'v-3': { name: '常口2', config: {} },
          'v-4': operator.MIX,
          'v-5': { name: '常口3', config: {} },
          'v-6': operator.RIGHT,
          'v-7': operator.MIX,
        },
        brackets: [
          { start: 'v-0', end: 'v-6', isTemporary: false }
        ],
        hoverVId: undefined,
      },
      'n-2': { name: '标签2', activeVId: 'v-1', vIds: ['v-1', 'v-2', 'v-3'], tagMap: {
          'v-1': { name: '暂口1', config: {} },
          'v-2': { name: '暂口2', config: {} },
          'v-3': { name: '暂口3', config: {} },
        },
        brackets: [],
      },
      'n-3': { name: '标签3', activeVId: 'v-1', vIds: ['v-1', 'v-2', 'v-3'], tagMap: {
          'v-1': { name: '逃犯1', config: {} },
          'v-2': { name: '逃犯2', config: {} },
          'v-3': { name: '逃犯3', config: {} },
        },
        brackets: [],
      },
    };
  }

  @action setHoverVId = (hoverVId?: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId && this.isLeftBracket) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      const tagMap = this.graphMap[activeGraphId].tagMap;
      const brackets = this.graphMap[activeGraphId].brackets;
      if (activeVId && hoverVId) {
        if (this.isLeftBracket && this.isTemporaryByStart) {
          const bracket = this.getBracketByStart(activeVId);
          hoverVId = this.getRealHoverId(hoverVId) || hoverVId;
          const vIds = this.graphMap[activeGraphId].vIds;
          const startIndex = vIds.indexOf(activeVId);
          const endIndex = vIds.indexOf(hoverVId);
          if (bracket && bracket.isTemporary && endIndex > startIndex) {
            if (bracket.end) {
              const delIndex = vIds.indexOf(bracket.end);
              this.moveRightBracketTemporary(delIndex, bracket.end, hoverVId);
            } else {
              this.addRightBracket(hoverVId);
            }
            let isPushFirst = false;
            const outSideBrackets = brackets.filter((bracket: IBracket) => {
              if (bracket.end) {
                const rightIndex = vIds.indexOf(bracket.end);
                if (endIndex === rightIndex && !bracket.isTemporary) {
                  isPushFirst = true;
                }
                return endIndex <= rightIndex && !bracket.isTemporary;
              }
              return false;
            });
            if (outSideBrackets.length > 0) {
              let leftBracketVId = outSideBrackets[0].start || '';
              outSideBrackets.forEach((item: IBracket) => {
                if (item.start) {
                  if (vIds.indexOf(item.start) > vIds.indexOf(leftBracketVId)) {
                    leftBracketVId = item.start;
                  }
                }
              });
              this.moveLeftBracketTemporary(activeVId, leftBracketVId, isPushFirst);
            }
          }
          this.graphMap[activeGraphId].hoverVId = hoverVId;
        }
      }
    }
  };

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

  @action moveRightBracketTemporary = (delIndex: number, vId: string, prevVId?: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId && prevVId) {
      const vIds = _.cloneDeep(this.graphMap[activeGraphId].vIds);
      if (vIds.indexOf(prevVId) !== delIndex) {
        vIds.splice(delIndex, 1);
        const prevIndex = vIds.indexOf(prevVId);
        vIds.splice(prevIndex + 1, 0, vId);
        this.graphMap[activeGraphId].vIds = vIds;
      }
    }
  };

  @action delBracket = (vId: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const brackets = this.graphMap[activeGraphId].brackets.filter((item: IBracket) => {
        return item.start === vId || item.end === vId;
      });
      brackets.forEach((bracket: IBracket) => {
        if (bracket.start) {
          this.delNonOperator(bracket.start);
        }
        if (bracket.end) {
          this.delNonOperator(bracket.end);
        }
      });
      this.graphMap[activeGraphId].brackets = this.graphMap[activeGraphId].brackets.filter((item: IBracket) => {
        return item.start !== vId && item.end !== vId;
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

  @action addRightBracket = (vId: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      if (activeVId) {
        const vIds = this.graphMap[activeGraphId].vIds;
        const index = vIds.indexOf(vId);
        const nextVId = `v-${getMaxVId(vIds)}`;
        this.graphMap[activeGraphId].vIds.splice(index + 1, 0, nextVId);
        this.graphMap[activeGraphId].tagMap[nextVId] = operator.RIGHT;
        this.graphMap[activeGraphId].brackets.forEach((bracket: IBracket) => {
          if (bracket.start === activeVId) {
            bracket.end = nextVId;
          }
        });
      }
    }
  };

  @action passBracket = () => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      const brackets = this.graphMap[activeGraphId].brackets;
      brackets.forEach((bracket: IBracket) => {
        if (bracket.start === activeVId) {
          bracket.isTemporary = false;
        }
      });
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
  };



  @action addBracket = (vId: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const vIds = this.graphMap[activeGraphId].vIds;
      const nextVId = `v-${getMaxVId(vIds)}`;
      let outSideBracketVId = vId;
      const getOutSideBracketVId = (id: string) => {
        const activeGraphId = this.activeGraphId;
        if (activeGraphId) {
          const vIds = this.graphMap[activeGraphId].vIds;
          const tagMap = this.graphMap[activeGraphId].tagMap;
          const index = vIds.indexOf(id);
          const prevVId = vIds[index - 1];
          if (prevVId) {
            const tag: ITagValue | operator = tagMap[prevVId];
            if (typeof tag === 'number') {
              if (tag === operator.LEFT || tag === operator.NON) {
                getOutSideBracketVId(prevVId);
              }
            }
          } else {
            outSideBracketVId = id;
          }
        }
      };
      getOutSideBracketVId(vId);
      if (outSideBracketVId) {
        const index = vIds.indexOf(outSideBracketVId);
        this.graphMap[activeGraphId].vIds.splice(index, 0, nextVId);
        this.graphMap[activeGraphId].tagMap[nextVId] = operator.LEFT;
        this.graphMap[activeGraphId].activeVId = nextVId;
        this.graphMap[activeGraphId].brackets.push({ start: nextVId, end: undefined, isTemporary: true });
      }
    }
  };

  @computed get rightBracketVId(): string | null {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      if (activeVId) {
        const tagMap = this.graphMap[activeGraphId].tagMap;
        const activeTag = tagMap[activeVId] as operator;
        if (typeof activeTag === 'number' && activeTag === operator.LEFT) {
          const brackets = this.graphMap[activeGraphId].brackets.filter((bracket: IBracket) => {
            return bracket.start === activeVId;
          });
          if (brackets.length > 0) {
            return brackets[0].end || null;
          }
          return null;
        }
        return null;
      }
      return null;
    }
    return null;
  };

  @computed get isTemporaryByStart(): boolean {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      if (activeVId) {
        const tagMap = this.graphMap[activeGraphId].tagMap;
        const activeTag = tagMap[activeVId] as operator;
        if (typeof activeTag === 'number' && activeTag === operator.LEFT) {
          const brackets = this.graphMap[activeGraphId].brackets.filter((bracket: IBracket) => {
            return bracket.start === activeVId;
          });
          if (brackets.length > 0) {
            return brackets[0] ? brackets[0].isTemporary : false;
          }
          return false;
        }
        return false;
      }
      return false;
    }
    return false;
  };

  @computed get leftBracketVId(): string | null {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      if (activeVId) {
        const tagMap = this.graphMap[activeGraphId].tagMap;
        const activeTag = tagMap[activeVId] as operator;
        if (typeof activeTag === 'number' && activeTag === operator.RIGHT) {
          const brackets = this.graphMap[activeGraphId].brackets.filter((bracket: IBracket) => {
            return bracket.end === activeVId;
          });
          if (brackets.length > 0) {
            return brackets[0].start || null;
          }
          return null;
        }
        return null;
      }
      return null;
    }
    return null;
  };

  @computed get isLeftBracket(): boolean {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      if (activeVId) {
        const tagMap = this.graphMap[activeGraphId].tagMap;
        const activeTag = tagMap[activeVId] as operator;
        return typeof  activeTag === 'number' && activeTag === operator.LEFT;
      }
      return false
    }
    return false;
  }

  getBracketByStart = (vId: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const brackets = this.graphMap[activeGraphId].brackets.filter((bracket: IBracket) => {
        return bracket.start === vId;
      });
      return brackets[0] ? brackets[0] : null ;
    }
    return null;
  };

  getRealHoverId = (hoverVId: string) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const activeVId = this.graphMap[activeGraphId].activeVId;
      if (activeVId) {
        const vIds = this.graphMap[activeGraphId].vIds;
        const brackets = this.graphMap[activeGraphId].brackets;
        const activeIndex = vIds.indexOf(activeVId);
        const hoverIndex = vIds.indexOf(hoverVId);
        const tagMap = this.graphMap[activeGraphId].tagMap;
        let tag = tagMap[hoverVId] as ITagValue | operator;
        const getRightBracket = (rightBracketVId: string, prevBracketVId: string) => {
          const missBrackets = brackets.filter((bracket: IBracket) => {
            return bracket.end === rightBracketVId;
          });
          if (missBrackets.length > 0) {
            const missStart = missBrackets[0].start;
            if (missStart) {
              const missIndex = vIds.indexOf(missStart);
              if (activeIndex < missIndex) {
                hoverVId = rightBracketVId;
                const nextVId = vIds[vIds.indexOf(rightBracketVId) + 1];
                const nextTag = tagMap[nextVId] as operator;
                if (typeof nextTag === 'number' && nextTag === operator.RIGHT) {
                  getRightBracket(nextVId, rightBracketVId);
                }
              } else {
                hoverVId = prevBracketVId;
              }
            }
          }
        };
        if (typeof tag === 'number') {
          tag = tag as operator;
          switch (tag) {
            case operator.RIGHT:
              if (vIds[hoverIndex + 1]) {
                getRightBracket(vIds[hoverIndex + 1], hoverVId);
              }
              break;
            case operator.LEFT:
            case operator.NON:
            case operator.JOIN:
            case operator.MIX:
            case operator.REDUCE:
              const vIdsDesc = vIds.slice(0, hoverIndex).reverse();
              const tagVIds = vIdsDesc.filter((vId: string) => {
                const tag = tagMap[vId] as ITagValue | operator;
                return typeof tag !== 'number'
              });
              hoverVId = tagVIds[0];
              const nextVId = tagVIds[1];
              if (nextVId) {
                const nextTag = tagMap[nextVId] as operator;
                if (typeof nextTag === 'number' && nextTag === operator.RIGHT) {
                  getRightBracket(nextVId, hoverVId);
                }
              }
              break;
          }
        } else {
          const nextVId = vIds[hoverIndex + 1];
          if (nextVId) {
            const nextTag = tagMap[nextVId] as operator;
            if (typeof nextTag === 'number' && nextTag === operator.RIGHT) {
              getRightBracket(nextVId, hoverVId);
            }
          }
        }
        return hoverVId;
      }
    }
  };

  moveLeftBracketTemporary = (activeVId: string, leftBracketVId: string, isPushFirst: boolean) => {
    const activeGraphId = this.activeGraphId;
    if (activeGraphId) {
      const vIds = this.graphMap[activeGraphId].vIds;
      const newVIds: string[] = [];
      vIds.forEach((vId: string) => {
        if (vId !== activeVId) {
          if (isPushFirst) {
            if (vId === leftBracketVId) {
              newVIds.push(activeVId);
            }
            newVIds.push(vId);
          } else {
            newVIds.push(vId);
            if (vId === leftBracketVId) {
              newVIds.push(activeVId);
            }
          }
        }
      });
      this.graphMap[activeGraphId].vIds = newVIds;
    }
  };

}

export default Operation;
