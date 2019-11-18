import { tagTypes, inputTypes, textAligns } from "../constants/commonConstants";

export interface IBasicInfo {
  name: string,
  type: tagTypes,
  sql: string,
}

export interface IRowConfig {
  rowId: string,
  type: inputTypes,
  colNum: number,
  labelText: string,
  fontSize: number,
  color: string,
  options: string,
  textAlign: textAligns,
  defaultValue: string | number,
  maxValue: number | undefined,
  minValue: number | undefined,
}
