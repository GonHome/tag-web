import { action, observable } from 'mobx';
import { IBasicInfo, ISelectCol } from "../models/sql";

const { Parser } = require('node-sql-parser');
const parser = new Parser();

// SQL编辑
class Sql {
  @observable leftWidth: number;
  @observable rightWidth: number;
  @observable sqlList: string[];
  @observable basicInfo: IBasicInfo;
  @observable activeSqlId: string;
  @observable sqlValue: string;
  @observable selectList: ISelectCol[];
  @observable whereList: string[];

  constructor () {
    this.leftWidth = 280;
    this.rightWidth = 280;
    this.basicInfo = { name: '新建SQL' };
    this.sqlList = ['常口1','常口2','常口3','常口4','常口5','常口6','常口7','常口8','常口9','常口10','常口11','常口12','常口13',];
    this.activeSqlId = '';
    this.sqlValue = '';
    this.selectList = [];
    this.whereList = [];
  }

  @action changeBasicInfo = (basicInfo: IBasicInfo) => {
    this.basicInfo = basicInfo;
  };

  @action checkTag = (sqlId: string) => {
    this.activeSqlId = sqlId;
  };

  @action changeSqlValue = (sqlValue: string) => {
    let whereList: any[] = [];
    const getWhereCol = (where: any) => {
      const { left, right, type } = where;
      if (type === 'binary_expr') {
        if (left) {
          getWhereCol(left);
        }
        if (right) {
          getWhereCol(right);
        }
      } else if (type === 'column_ref'){
        whereList.push(where);
      }
    };
    try {
      const ast = parser.astify(sqlValue);
      if (ast.length > 0 && ast[0] && ast[0].type === 'select') {
        const { columns, where } = ast[0];
        if (columns instanceof Array) {
          this.selectList = columns.map((column: any) => {
            return { columnName: column.expr.column, columnAlias: column.as };
          });
        } else {
          this.selectList = [];
        }
        getWhereCol(where);
        this.whereList = whereList;
      } else {
        this.whereList = [];
        this.selectList = [];
      }
    }catch (e) {
      this.whereList = [];
      this.selectList = [];
    }
    this.sqlValue = sqlValue;
  };

}

export default Sql;