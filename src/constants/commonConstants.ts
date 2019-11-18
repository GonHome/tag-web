
/* global window */
import { IModelLink } from "../models";
import { DropdownMenuItemType, IDropdownOption } from "office-ui-fabric-react";

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

export enum inputTypes {
  label = 'label',
  input = 'input',
  select = 'select',
  inputNumber = 'inputNumber',
  date = 'date',
}

export enum textAligns {
  left = 'left',
  center = 'center',
  right = 'right',
}

export const typeOptions: IDropdownOption[] = [
  { key: 'labelHeader', text: '文本', itemType: DropdownMenuItemType.Header },
  { key: 'label', text: '描述' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'inputHeader', text: '输入组件', itemType: DropdownMenuItemType.Header },
  { key: 'input', text: '输入框' },
  { key: 'select', text: '下拉选择框'},
  { key: 'inputNumber', text: '数字输入框' },
  { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'dateHeader', text: '日期组件', itemType: DropdownMenuItemType.Header },
  { key: 'date', text: '日期' },
];

export const alignOptions: IDropdownOption[] = [
  { key: 'alignHeader', text: '定位', itemType: DropdownMenuItemType.Header },
  { key: textAligns.left, text: '居左' },
  { key: textAligns.center, text: '居中' },
  { key: textAligns.right, text: '居右' },
];
