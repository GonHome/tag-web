import { operator, rightTypes } from "../constants/operationConstants";

export interface IGraphValue {
  name: string;
  activeVId: string | undefined;
  vIds: string[];
  tagMap: { [key: string]: ITagValue | operator };
  brackets: IBracket[];
  hoverVId?: string;
}

export interface IBracket {
  start: string | undefined,
  end: string | undefined,
  isTemporary: boolean,
}
export interface ITagValue {
  config: { rightType: rightTypes | null };
  name: string;
}

export interface IOperator {
  code: operator,
  name: string,
  iconName?: string,
  text?: string,
}
