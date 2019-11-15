
/* global window */
import { IModelLink } from "../models";

export const INITIAL_ROUTE = {
  keys: {},
  options: {},
  path: window.location.hash, // 初始化为hash地址
  hash: '',
};

export const modelLinks: IModelLink[] = [
  {
    img: "/img/home.png", name: "标签市场", link: "/#"
  },
  {
    img: "/img/draw.png", name: "标签搭建", link: "/#/operation"
  },
  {
    img: "/img/task.png", name: "任务管理", link: "/#"
  },
  {
    img: "/img/system.png", name: "后台管理", link: "/#/back"
  },
];

export enum tagTypes {
  people = 'people',
  car = 'car',
  company = 'company',
  case = 'case',
  other = 'other',
}

export const tagTypeList: { code: tagTypes, text: string }[] = [
  { code: tagTypes.people, text: '人员' },
  { code: tagTypes.car, text: '车辆' },
  { code: tagTypes.company, text: '公司' },
  { code: tagTypes.case, text: '案件' },
  { code: tagTypes.other, text: '其他' },
];
