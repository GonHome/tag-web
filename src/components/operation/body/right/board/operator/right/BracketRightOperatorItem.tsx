import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import classNames from 'classnames';
import { Operation } from "store";
import { IOperator } from 'models/operation';
import { leftOperators, operator } from 'constants/operationConstants';
interface IProps {
  operation: Operation,
  width: number,
  vId: string,
  operator: operator,
  activeVId: string,
}

@observer
export default class BracketRightOperatorItem extends  React.Component<IProps> {

  _delOperator = (e: any) => {
    const { operation, vId } = this.props;
    const { delNonOperator } = operation;
    delNonOperator(vId);
    e.stopPropagation();
  };

  render() {
    const { operation, vId, activeVId } = this.props;
    const { changeActiveVId, rightBracketVId }= operation;
    return (
      <div
        className={classNames('operator-item bracket', { active: vId === activeVId || (rightBracketVId && rightBracketVId === vId) } )}
        onClick={() => changeActiveVId(vId)}>
        <div className="operator-center">
          <span title='右侧括号'>)</span>
        </div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除" onClick={this._delOperator} />
        </div>
      </div>
    );
  }
}
