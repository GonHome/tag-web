import { observer } from "mobx-react";
import { Col, Grid, Row } from "react-flexbox-grid";
import React from "react";
import { rightTypes } from "../../../../../constants/operationConstants";
import { IConfig } from "../../../../../models/operation";
import { Operation } from "../../../../../store";
import Config from "./config/Config";

interface IProps {
  operation: Operation,
  configs: IConfig[] | null,
  vId: string,
  rightType: rightTypes | null,
}

@observer
export default class TagConfig extends  React.Component<IProps> {

  render() {
    const { rightType, configs, operation } = this.props;
    if (configs) {
      return (
        <div className="tag-config" style={{ width: rightType ? 'calc(50% - 1px)' : 'calc(100% - 1px)' }}>
          <Grid fluid>
            <Row>
              {configs.map((config: IConfig) => {
                return (
                  <Col
                    md={config.colNum}
                    className="col"
                    key={config.rowId}
                  >
                    <Config  rowConfig={config} operation={operation} />
                  </Col>
                )
              })}
            </Row>
          </Grid>
        </div>
      )
    }
    return (
      <div className="tag-config" style={{ width: rightType ? 'calc(50% - 1px)' : 'calc(100% - 1px)' }} />
    )
  }
}
