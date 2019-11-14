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
    return (
      <div style={{ width, height: height - 30 }} className='tag-panel'>
        <div style={{ width: width - 29 }} className="tag-body">
          <TagConfig operation={operation} vId={vId} rightType={rightType} />
          <TagReview operation={operation} vId={vId} rightType={rightType} />
        </div>
        <RightSiderBar operation={operation} vId={vId} height={height - 30} rightType={rightType} />
      </div>
    )
  }
}
