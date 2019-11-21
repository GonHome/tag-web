import { IOperator } from 'models/operation';
import NonOperatorItem from 'components/operation/body/right/board/operator/left/NonOperatorItem';
import RightOperatorItem from 'components/operation/body/right/board/operator/right/RightOperatorItem';
import BracketLeftOperatorItem from 'components/operation/body/right/board/operator/left/BracketLeftOperatorItem';
import BracketRightOperatorItem from 'components/operation/body/right/board/operator/right/BracketRightOperatorItem';

export const leftSideTypes =  [
  { code: 'static', text: '静态' },
  { code: 'dynamic', text: '动态' },
  { code: 'share', text: '共享' },
  { code: 'other', text: '其他' },
];

export enum sideTypes {
  static = 'static',
  dynamic = 'dynamic',
  share = 'share',
  other = 'other',
}

export enum operator {
  MIX, JOIN, REDUCE, NON, LEFT, RIGHT,
}

export const leftOperators: IOperator[] = [
  { code: operator.LEFT, name: '左侧括号', text: '(' },
  { code: operator.NON, name: '非', text: '!' }
];

export const rightOperators: IOperator[] = [
  { code: operator.MIX, name: '交集', iconName: 'VennDiagram' },
  { code: operator.JOIN, name: '相加', iconName: 'Add' },
  { code: operator.REDUCE, name: '相减', iconName: 'CalculatorSubtract' },
];


export const operatorDomMap: any = {
  [operator.MIX]: RightOperatorItem,
  [operator.JOIN]: RightOperatorItem,
  [operator.REDUCE]: RightOperatorItem,
  [operator.NON]: NonOperatorItem,
  [operator.LEFT]: BracketLeftOperatorItem,
  [operator.RIGHT]: BracketRightOperatorItem,
};

export const dragType = 'dragType';
export const dragName = 'dragName';
export const dragRel = 'dragRel';
export const dragIcon = 'dragIcon';

export enum rightTypes {
  REVIEW = 'REVIEW', DETAILS = 'DETAILS',
}

export enum dialogTypes {
  ADDTAG = 'ADDTAG',
  SAVEAS = 'SAVEAS',
}
