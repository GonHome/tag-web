import { tagTypes } from "../constants/commonConstants";

export interface IBasicInfo {
  name: string,
  type: tagTypes,
  sql: string,
}

export interface IRowConfig {
  labelCol: number,
  labelName: string,
  prefix: string,
  suffix: string,
  paramCol: number,
  paramType: any,
  defaultValue: any,
}
