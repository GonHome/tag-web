import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import { Operation } from "store";
import { IOperator, IOperatorValue } from 'models/operation';
import { leftOperators, operator } from 'constants/operationConstants';
interface IProps {
  operation: Operation,
  width: number,
  vId: string,
  operator: IOperatorValue,
}

interface IState {
  isCalloutVisible: boolean;
}
@observer
export default class LeftOperatorItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isCalloutVisible: false };
  }

  showIcon = (missOperator: IOperator) => {
    if (missOperator.iconName) {
      return <Icon iconName={missOperator.iconName} title={missOperator.name}/>;
    }
    return <span title={missOperator.name}>{missOperator.text}</span>;
  };

  render() {
    const { operator, operation, vId } = this.props;
    const { delNonOperator }= operation;
    const missOperator: IOperator | undefined = leftOperators.filter((item: IOperator) => {
      return item.code === operator.operator;
    })[0];
    return (
      <div className="operator-item left" onClick={() => this.setState({ isCalloutVisible: true })} >
        <div className="operator-center">
          {missOperator ? this.showIcon(missOperator) : null}
        </div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除" onClick={() => delNonOperator(vId)} />
        </div>
      </div>
    );
  }
}
