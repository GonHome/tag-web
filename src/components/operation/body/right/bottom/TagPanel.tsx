import { observer } from "mobx-react";
import React from "react";
import { Row, Col, Grid } from 'react-flexbox-grid';
import TagConfig from './TagConfig';
import { Operation } from "../../../../../store";
import { ITagValue } from "../../../../../models/operation";
import RightSiderBar  from "./RightSiderBar";
import TagReview from "./TagReview";

interface IProps {
  operation: Operation,
  vId: string,
  width: number,
  height: number,
  tag: ITagValue,
}


@observer
export default class TagPanel extends  React.Component<IProps> {
  componentDidMount(): void {
    const { vId } = this.props;
    console.log(vId);
  }

  render() {
    const { width, height, operation, vId, tag } = this.props;
    const { config } = tag;
    const { rightType } = config;
    if (!rightType) {
      return (
        <div style={{ width, height: height - 30 }} className='tag-panel'>
          <div style={{ width: width - 29, display: 'inline-block' }}>
            <TagConfig operation={operation} vId={vId}/>
          </div>
          <RightSiderBar operation={operation} vId={vId} height={height - 30} rightType={rightType} />
        </div>
      )
    }
    return (
      <div style={{ width, height: height - 30 }} className='tag-panel'>
        <div style={{ width: width - 29, display: 'inline-block', height: '100%' }}>
          <Grid fluid>
            <Row>
              <Col md={6} xs={6}>
                <TagConfig operation={operation} vId={vId}/>
              </Col>
              <Col md={6} xs={6}>
                <TagReview operation={operation} vId={vId}/>
              </Col>
            </Row>
          </Grid>
        </div>
        <RightSiderBar operation={operation} vId={vId} height={height - 30} rightType={rightType} />
      </div>
    )
  }
}
