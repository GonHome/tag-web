import { observer } from "mobx-react";
import React from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Operation } from "store";
import LeftDragItem from './LeftDragItem';

interface IProps {
  operation: Operation,
}

@observer
export default class LeftStaticSide extends  React.Component<IProps> {

  render() {
    const { operation } = this.props;
    return (
      <div className="left-body">
        <SearchBox
          placeholder="搜索"
          underlined={true}
        />
        <div className="left-drag-content">
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
          <LeftDragItem operation={operation}/>
        </div>
      </div>
    );
  }
}
