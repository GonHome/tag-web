import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import { Operation } from "store";
import { IOperator } from 'models/operation';
import { leftOperators, operator } from 'constants/operationConstants';
interface IProps {
  operation: Operation,
  width: number,
  vId: string,
  operator: operator,
}

@observer
export default class BracketLeftOperatorItem extends  React.Component<IProps> {

  showIcon = (missOperator: IOperator) => {
    if (missOperator.iconName) {
      return <Icon iconName={missOperator.iconName} title={missOperator.name}/>;
    }
    return <span title={missOperator.name}>{missOperator.text}</span>;
  };

  _delNonOperator = (e: any) => {
    const { operation, vId } = this.props;
    const { delNonOperator } = operation;
    delNonOperator(vId);
    e.stopPropagation();
  };

  render() {
    const { operator, operation, vId } = this.props;
    const { changeActiveVId }= operation;
    const missOperator: IOperator | undefined = leftOperators.filter((item: IOperator) => {
      return item.code === operator;
    })[0];
    return (
      <div
        className="operator-item left"
        onClick={() => changeActiveVId(vId)} >
        <div className="operator-center">
          {missOperator ? this.showIcon(missOperator) : null}
        </div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除" onClick={this._delNonOperator} />
        </div>
      </div>
    );
  }
}
