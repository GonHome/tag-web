import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Callout, DirectionalHint, getId, Icon } from "office-ui-fabric-react";
import { Col, Grid, Row } from "react-flexbox-grid";
import { Operation } from "store";
import { IOperator, ITagValue } from "../../../../../models/operation";
import { leftOperators, operator, rightOperators } from "constants/operationConstants";

interface IProps {
  operation: Operation,
  width: number,
  tag: ITagValue,
  activeVId: string;
  vId: string;
  isNon: boolean;
}

interface IState {
  isCalloutVisible: boolean;
}

@observer
export default class TagItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isCalloutVisible: false };
  }
  private _menuButtonElement = React.createRef<HTMLDivElement>();
  private _titleId: string = getId('callout-label');

  _onDismiss = () => {
    this.setState({ isCalloutVisible: false });
  };

  _operatorClick = (item: IOperator) => {
    const { isNon, operation } = this.props;
    if (item.code === operator.NON) {

    }
  };

  render() {
    const { tag, operation, activeVId, vId, isNon } = this.props;
    const { changeActiveVId } = operation;
    const { isCalloutVisible } = this.state;
    return (
      <div className={classNames("tag-item", { active: activeVId === vId } )} onClick={() => changeActiveVId(vId)}>
        <div
          className={classNames("circle", { show: isCalloutVisible } )}
          onClick={() => this.setState({ isCalloutVisible: true })}
          ref={this._menuButtonElement}
        />
        <div className="tag-name" title={tag.name}>{tag.name}</div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除"/>
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
            <div className="popover-operator" style={{ width: 90 }}>
              <Grid fluid>
                <Row>
                  {leftOperators.map((item: IOperator, index: number) => {
                    return (
                      <Col md={6} xs={6} key={item.code}>
                        <div
                          className={classNames("function-selector", { active: isNon && item.code === operator.NON } )}
                          title={item.name}
                          onClick={() => this._operatorClick(item)}
                        >
                          {item.iconName ? <Icon iconName={item.iconName} /> : <span>{item.text}</span>}
                        </div>
                        {rightOperators.length === index + 1 ? null : <div className="slider" />}
                      </Col>
                    )
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
