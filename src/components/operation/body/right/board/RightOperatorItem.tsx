import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Callout, getId, Icon, DirectionalHint } from 'office-ui-fabric-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Operation } from "store";
import { IOperator, IOperatorValue } from 'models/operation';
import { rightOperators } from 'constants/operationConstants';
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
export default class RightOperatorItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isCalloutVisible: false };
  }
  private _menuButtonElement = React.createRef<HTMLDivElement>();
  private _titleId: string = getId('callout-label');

  _onDismiss = () => {
    this.setState({ isCalloutVisible: false });
  };

  render() {
    const { vId, operation, operator } = this.props;
    const missOperator = rightOperators.filter((item: IOperator) => {
      return item.code === operator.operator;
    })[0];
    const { changeRightOperator } = operation;
    const { isCalloutVisible  } = this.state;
    return (
      <div className="operator-item" onClick={() => this.setState({ isCalloutVisible: true })} >
        <div ref={this._menuButtonElement} className="operator-center">
          {missOperator ? <Icon iconName={missOperator.iconName} title={missOperator.name}/> : null}
        </div>
        {isCalloutVisible  ?
          <Callout
            role="alertdialog"
            ariaLabelledBy={this._titleId}
            className="ms-CalloutExample-callout"
            gapSpace={0}
            target={this._menuButtonElement}
            onDismiss={this._onDismiss}
            setInitialFocus={true}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <div className="popover-operator">
              <Grid fluid>
                <Row>
                  {rightOperators.map((item: IOperator ,index: number) => {
                    return (
                      <Col md={4} xs={6} key={item.code}>
                        <div
                          className={classNames("operator-selector", {active: item.code === operator.operator})}
                          title={item.name}
                          onClick={() => {changeRightOperator(item.code, vId);this._onDismiss()}}
                        >
                          {item.iconName ? <Icon iconName={item.iconName} /> : <span>{item.text}</span>}
                        </div>
                        {rightOperators.length === index + 1 ? null : <div className="slider" /> }
                      </Col>
                    );
                  })}
                </Row>
              </Grid>
            </div>
          </Callout>
        : null }
      </div>
    );
  }
}
