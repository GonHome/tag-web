import { observer } from "mobx-react";
import React from "react";
import { Callout, getId, Icon, DirectionalHint } from 'office-ui-fabric-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Operation } from "store";

interface IProps {
  operation: Operation,
  width: number,
}

interface IState {
  isCalloutVisible: boolean;
}
@observer
export default class OperatorItem extends  React.Component<IProps, IState> {

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
    const { isCalloutVisible  } = this.state;
    return (
      <div className="operator-item" onClick={() => this.setState({ isCalloutVisible: true })} >
        <div ref={this._menuButtonElement}>
          <Icon iconName='Add'/>
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
                  <Col md={6} xs={6}>
                    <div className="operator-selector active">
                      <Icon iconName='Add'/>
                    </div>
                    <div className="slider" />
                  </Col>
                  <Col md={6} xs={6}>
                    <div className="operator-selector">
                      <Icon iconName='CalculatorSubtract'/>
                    </div>
                    <div className="slider" />
                  </Col>
                </Row>
              </Grid>
            </div>
          </Callout>
        : null }
      </div>
    );
  }
}
