import { operator } from "../constants/operationConstants";

export interface IGraphValue {
  name: string;
  activeVId: string | undefined;
  vIds: string[];
  tagMap: { [key: string]: ITagValue | operator }
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
