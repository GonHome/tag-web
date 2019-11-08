import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Callout, DirectionalHint, Icon, getId } from "office-ui-fabric-react";
import { Col, Grid, Row } from "react-flexbox-grid";
import { Operation } from "store";
import { ITagValue, IOperator } from "../../../../../models/operation";
import { leftOperators, rightOperators } from "constants/operationConstants";
interface IProps {
  operation: Operation,
  width: number,
  tag: ITagValue,
  activeVId: string;
  vId: string;
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

  render() {
    const { tag, operation, activeVId, vId } = this.props;
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
                    if (rightOperators.length === index + 1) {
                      return (
                        <Col md={6} xs={6} key={item.code}>
                          <div className="function-selector" title={item.name}>
                            {item.iconName ? <Icon iconName={item.iconName} /> : <span>{item.text}</span>}
                          </div>
                        </Col>
                      )
                    }
                    return (
                      <Col md={6} xs={6} key={item.code}>
                        <div className="function-selector" title={item.name}>
                          {item.iconName ? <Icon iconName={item.iconName} /> : <span>{item.text}</span>}
                        </div>
                        <div className="slider" />
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
