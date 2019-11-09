import { operator, side } from "../constants/operationConstants";

export interface IGraphValue {
  name: string;
  activeVId: string | undefined;
  vIds: string[];
  tagMap: { [key: string]: ITagValue | IOperatorValue }
}
export interface IOperatorValue {
  operator: operator,
  side: side,
}
export interface ITagValue {
  config: any;
  name: string;
}

export interface IOperator {
  code: operator,
  name: string,
  iconName?: string,
  text?: string,
}
