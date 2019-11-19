import { operator, rightTypes } from "../constants/operationConstants";
import { inputTypes, textAligns } from "../constants/commonConstants";

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
  config: IConfig[] | null;
  name: string;
  rightType: null | rightTypes;
}

export interface IOperator {
  code: operator,
  name: string,
  iconName?: string,
  text?: string,
}

export interface IConfig {
  rowId: string,
  type: inputTypes,
  colNum: number,
  labelText: string,
  fontSize: number,
  color: string,
  options: string,
  textAlign: textAligns,
  defaultValue: string | number | undefined,
  value: string | number | undefined,
  maxValue: number | undefined | string ,
  minValue: number | undefined | string,
}
